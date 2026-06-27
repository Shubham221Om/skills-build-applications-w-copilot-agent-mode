import mongoose from 'mongoose';
import { User } from '../models/user';
import { Team } from '../models/team';
import { Activity } from '../models/activity';
import { LeaderboardEntry } from '../models/leaderboard';
import { Workout } from '../models/workout';
import { connectDatabase } from '../database';

// Seed the octofit_db database with test data.

async function seed() {
  await connectDatabase();
  console.log('Connected to MongoDB for seeding');

  await Promise.all([
    User.deleteMany({}),
    Team.deleteMany({}),
    Activity.deleteMany({}),
    LeaderboardEntry.deleteMany({}),
    Workout.deleteMany({}),
  ]);

  const users = await User.insertMany([
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

  const teams = await Team.insertMany([
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

  await Activity.insertMany([
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

  await LeaderboardEntry.insertMany([
    { userName: users[0].name, score: 982, streak: 7 },
    { userName: users[1].name, score: 958, streak: 4 },
    { userName: users[2].name, score: 915, streak: 3 },
  ]);

  await Workout.insertMany([
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
  await mongoose.disconnect();
}

seed().catch((error) => {
  console.error('Seeding failed', error);
  process.exit(1);
});
