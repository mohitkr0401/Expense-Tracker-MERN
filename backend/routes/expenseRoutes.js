const express = require('express');
const router = express.Router();
const { validateExpenseQuery } = require('../middleware/queryValidator');

const { protect } = require('../middleware/authMiddleware');
const {
    createExpense,
    getExpenses,
    updateExpense,
    deleteExpense
} = require('../controllers/expenseController');

router.route('/')
    .post(protect, createExpense)
    .get(protect, getExpenses);

router.route('/:id')
    .put(protect, updateExpense)
    .delete(protect, deleteExpense);


router.route('/')
    .get(protect, validateExpenseQuery, getExpenses);

module.exports = router;