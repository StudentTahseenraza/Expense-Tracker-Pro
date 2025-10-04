import express from 'express';
import { body } from 'express-validator';
import {
  getExpenses,
  createExpense,
  updateExpense,
  deleteExpense,
  getSummary
} from '../controllers/expenseController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Validation rules
const expenseValidation = [
  body('amount')
    .isFloat({ min: 0.01 })
    .withMessage('Amount must be greater than 0'),
  body('note')
    .trim()
    .isLength({ min: 1, max: 200 })
    .withMessage('Note must be between 1 and 200 characters'),
  body('category')
    .isIn(['Food', 'Travel', 'Rent', 'Bills', 'Shopping', 'Entertainment', 'Healthcare', 'Education', 'Other'])
    .withMessage('Invalid category')
];

// Protect all routes
router.use(protect);

router.route('/')
  .get(getExpenses)
  .post(expenseValidation, createExpense);

router.route('/summary')
  .get(getSummary);

router.route('/:id')
  .put(expenseValidation, updateExpense)
  .delete(deleteExpense);

export default router;