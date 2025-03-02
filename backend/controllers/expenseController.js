const Expense = require('../models/Expense');

// Create Expense
exports.createExpense = async (req, res) => {
  try {
    const expense = await Expense.create({
      ...req.body,
      user: req.user.id
    });
    
    res.status(201).json(expense);
    
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get All Expenses
exports.getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user.id });
    res.status(200).json(expenses);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update Expense
exports.updateExpense = async (req, res) => {
  try {
    const expense = await Expense.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!expense) return res.status(404).json({ error: 'Expense not found' });
    res.status(200).json(expense);
    
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete Expense
exports.deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id
    });
    
    if (!expense) return res.status(404).json({ error: 'Expense not found' });
    res.status(200).json({ message: 'Expense deleted' });
    
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};