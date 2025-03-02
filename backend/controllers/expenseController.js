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

exports.getExpenses = async (req, res) => {
    try {
      // Destructure query parameters
      const { category, minAmount, maxAmount, startDate, endDate, page = 1, limit = 10, sort } = req.query;
  
      // Build filter object
      const filter = { user: req.user.id };
      if (category) filter.category = category;
      if (minAmount || maxAmount) {
        filter.amount = {};
        if (minAmount) filter.amount.$gte = Number(minAmount);
        if (maxAmount) filter.amount.$lte = Number(maxAmount);
      }
      if (startDate || endDate) {
        filter.date = {};
        if (startDate) filter.date.$gte = new Date(startDate);
        if (endDate) filter.date.$lte = new Date(endDate);
      }
  
      // Build query
      const query = Expense.find(filter);
      
      // Sorting
      if (sort) {
        const sortBy = sort.split(',').join(' ');
        query.sort(sortBy);
      } else {
        query.sort('-date'); // Default: newest first
      }
  
      // Pagination
      const pageNumber = Number(page);
      const limitNumber = Number(limit);
      const skip = (pageNumber - 1) * limitNumber;
      
      const total = await Expense.countDocuments(filter);
      const expenses = await query.skip(skip).limit(limitNumber);
  
      res.status(200).json({
        success: true,
        count: expenses.length,
        total,
        page: pageNumber,
        pages: Math.ceil(total / limitNumber),
        data: expenses
      });
  
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  };