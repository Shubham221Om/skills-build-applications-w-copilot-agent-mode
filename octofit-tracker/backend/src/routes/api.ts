import { Router } from 'express';
import { User } from '../models/user';
import { Team } from '../models/team';
import { Activity } from '../models/activity';
import { LeaderboardEntry } from '../models/leaderboard';
import { Workout } from '../models/workout';

const router = Router();

function handleCollection<T>(model: any) {
  return {
    getAll: async (_req: any, res: any) => {
      try {
        const documents = await model.find({});
        res.json(documents);
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch records' });
      }
    },
    create: async (req: any, res: any) => {
      try {
        const document = await model.create(req.body);
        res.status(201).json(document);
      } catch (error) {
        res.status(400).json({ error: 'Failed to create record' });
      }
    },
  };
}

const usersHandlers = handleCollection(User);
const teamsHandlers = handleCollection(Team);
const activitiesHandlers = handleCollection(Activity);
const leaderboardHandlers = handleCollection(LeaderboardEntry);
const workoutsHandlers = handleCollection(Workout);

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

export default router;
