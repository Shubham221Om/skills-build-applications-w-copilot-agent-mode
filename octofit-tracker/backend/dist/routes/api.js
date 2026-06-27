"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = require("../models/user");
const team_1 = require("../models/team");
const activity_1 = require("../models/activity");
const leaderboard_1 = require("../models/leaderboard");
const workout_1 = require("../models/workout");
const router = (0, express_1.Router)();
function handleCollection(model) {
    return {
        getAll: async (_req, res) => {
            try {
                const documents = await model.find({});
                res.json(documents);
            }
            catch (error) {
                res.status(500).json({ error: 'Failed to fetch records' });
            }
        },
        create: async (req, res) => {
            try {
                const document = await model.create(req.body);
                res.status(201).json(document);
            }
            catch (error) {
                res.status(400).json({ error: 'Failed to create record' });
            }
        },
    };
}
const usersHandlers = handleCollection(user_1.User);
const teamsHandlers = handleCollection(team_1.Team);
const activitiesHandlers = handleCollection(activity_1.Activity);
const leaderboardHandlers = handleCollection(leaderboard_1.LeaderboardEntry);
const workoutsHandlers = handleCollection(workout_1.Workout);
router.get('/users/', usersHandlers.getAll);
router.post('/users/', usersHandlers.create);
router.get('/teams/', teamsHandlers.getAll);
router.post('/teams/', teamsHandlers.create);
router.get('/activities/', activitiesHandlers.getAll);
router.post('/activities/', activitiesHandlers.create);
router.get('/leaderboard/', leaderboardHandlers.getAll);
router.post('/leaderboard/', leaderboardHandlers.create);
router.get('/workouts/', workoutsHandlers.getAll);
router.post('/workouts/', workoutsHandlers.create);
exports.default = router;
