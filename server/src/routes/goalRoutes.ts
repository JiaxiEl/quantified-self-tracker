import { Router } from 'express';
import { createGoal, getGoals, updateGoal, deleteGoal } from '../controllers/goalController';
import authMiddleware from '../middleware/authMiddleware';

const router = Router();

router.post('/create', authMiddleware, createGoal);
router.get('/', authMiddleware, getGoals);
router.put('/update', authMiddleware, updateGoal);
router.delete('/delete', authMiddleware, deleteGoal);

export default router;
