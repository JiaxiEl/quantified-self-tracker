import express from 'express';
import { createGoal, getGoals, updateGoal, deleteGoal } from '../controllers/goalController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.route('/')
    .post(protect, createGoal)      // Create a new goal
    .get(protect, getGoals);        // Get all goals for the logged-in user

router.route('/:id')
    .put(protect, updateGoal)       // Update an existing goal
    .delete(protect, deleteGoal);   // Delete a goal

export default router;
