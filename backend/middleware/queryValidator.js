exports.validateExpenseQuery = (req, res, next) => {
    // Validate numerical values
    const { minAmount, maxAmount, page, limit } = req.query;
    
    if (minAmount && isNaN(minAmount)) {
      return res.status(400).json({ error: 'minAmount must be a number' });
    }
    if (maxAmount && isNaN(maxAmount)) {
      return res.status(400).json({ error: 'maxAmount must be a number' });
    }
    if (page && isNaN(page)) {
      return res.status(400).json({ error: 'page must be a number' });
    }
    if (limit && isNaN(limit)) {
      return res.status(400).json({ error: 'limit must be a number' });
    }
  
    next();
  };