import { Router } from 'express';
import { createHabit, getHabits, updateHabit, deleteHabit } from '../controllers/habitController';
import authMiddleware from '../middleware/authMiddleware';

const router = Router();

router.post('/create', authMiddleware, createHabit);
router.get('/', authMiddleware, getHabits);
router.put('/update', authMiddleware, updateHabit);
router.delete('/delete', authMiddleware, deleteHabit);

export default router;
