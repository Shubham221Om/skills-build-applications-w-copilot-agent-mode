"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const user_1 = require("../models/user");
const team_1 = require("../models/team");
const activity_1 = require("../models/activity");
const leaderboard_1 = require("../models/leaderboard");
const workout_1 = require("../models/workout");
// Seed the octofit_db database with test data.
const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/octofit_db';
async function seed() {
    await mongoose_1.default.connect(mongoUri);
    console.log('Connected to MongoDB for seeding');
    await Promise.all([
        user_1.User.deleteMany({}),
        team_1.Team.deleteMany({}),
        activity_1.Activity.deleteMany({}),
        leaderboard_1.LeaderboardEntry.deleteMany({}),
        workout_1.Workout.deleteMany({}),
    ]);
    const users = await user_1.User.insertMany([
        {
            name: 'Asha Patel',
            email: 'asha.patel@example.com',
            fitnessGoal: 'Improve endurance',
            experienceLevel: 'Intermediate',
        },
        {
            name: 'Mina Chen',
            email: 'mina.chen@example.com',
            fitnessGoal: 'Build strength',
            experienceLevel: 'Advanced',
        },
        {
            name: 'Noah Brooks',
            email: 'noah.brooks@example.com',
            fitnessGoal: 'Increase flexibility',
            experienceLevel: 'Beginner',
        },
    ]);
    const teams = await team_1.Team.insertMany([
        {
            name: 'Trailblazers',
            sport: 'Running',
            members: users.slice(0, 2).map((user) => user.name),
        },
        {
            name: 'Peak Performers',
            sport: 'Cycling',
            members: [users[2].name],
        },
    ]);
    await activity_1.Activity.insertMany([
        {
            title: 'Morning Run',
            type: 'Cardio',
            durationMinutes: 35,
            caloriesBurned: 420,
            userName: users[0].name,
        },
        {
            title: 'Strength Circuit',
            type: 'Strength',
            durationMinutes: 50,
            caloriesBurned: 510,
            userName: users[1].name,
        },
        {
            title: 'Yoga Flow',
            type: 'Mobility',
            durationMinutes: 25,
            caloriesBurned: 180,
            userName: users[2].name,
        },
    ]);
    await leaderboard_1.LeaderboardEntry.insertMany([
        { userName: users[0].name, score: 982, streak: 7 },
        { userName: users[1].name, score: 958, streak: 4 },
        { userName: users[2].name, score: 915, streak: 3 },
    ]);
    await workout_1.Workout.insertMany([
        {
            title: 'Interval Training',
            difficulty: 'Intermediate',
            focusArea: 'Cardio',
            durationMinutes: 30,
        },
        {
            title: 'Core Blast',
            difficulty: 'Beginner',
            focusArea: 'Core',
            durationMinutes: 20,
        },
        {
            title: 'Mobility Flow',
            difficulty: 'Advanced',
            focusArea: 'Flexibility',
            durationMinutes: 25,
        },
    ]);
    console.log(`Seeded ${users.length} users, ${teams.length} teams, and related activity data.`);
    await mongoose_1.default.disconnect();
}
seed().catch((error) => {
    console.error('Seeding failed', error);
    process.exit(1);
});
