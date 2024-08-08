import { Router } from 'express';
import { createTask, getTasks, updateTask, deleteTask } from '../controllers/taskController';
import authMiddleware from '../middleware/authMiddleware';

const router = Router();

router.post('/create', authMiddleware, createTask);
router.get('/', authMiddleware, getTasks);
router.put('/update', authMiddleware, updateTask);
router.delete('/delete', authMiddleware, deleteTask);

export default router;
