const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { addExpense, getExpenses, deleteExpense } = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


// Add Expense API
app.post("/add-expense", async (req, res) => {
  try {
    const { description, amount, category, notes } = req.body;

    if (!description || !amount || !category) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newExpense = addExpense(description, parseFloat(amount), category, notes);

    res.status(201).json({
      message: "Expense added successfully",
      data: newExpense
    });

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get All Expenses API
app.get("/get-expenses", async (req, res) => {
  try {
    const expenses = getExpenses();
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete Expense API
app.delete("/delete-expense/:id", async (req, res) => {
  try {
    const { id } = req.params;
    deleteExpense(id);

    res.status(200).json({
      message: "Expense deleted successfully"
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Analytics: Category Breakdown
app.get("/analytics/category-breakdown", (req, res) => {
  try {
    const expenses = getExpenses();
    
    const categoryBreakdown = {};
    expenses.forEach(expense => {
      categoryBreakdown[expense.category] = (categoryBreakdown[expense.category] || 0) + expense.amount;
    });

    const data = Object.entries(categoryBreakdown).map(([category, amount]) => ({
      category,
      amount: parseFloat(amount.toFixed(2))
    }));

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Analytics: Spending Trend (last 7 days)
app.get("/analytics/spending-trend", (req, res) => {
  try {
    const expenses = getExpenses();
    const today = new Date();
    const last7Days = {};

    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateKey = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      last7Days[dateKey] = 0;
    }

    expenses.forEach(expense => {
      const expenseDate = new Date(expense.date);
      const dateKey = expenseDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      if (dateKey in last7Days) {
        last7Days[dateKey] += expense.amount;
      }
    });

    const data = Object.entries(last7Days).map(([date, amount]) => ({
      date,
      amount: parseFloat(amount.toFixed(2))
    }));

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Analytics: Summary Stats
app.get("/analytics/summary", (req, res) => {
  try {
    const expenses = getExpenses();
    
    const totalSpent = expenses.reduce((sum, exp) => sum + exp.amount, 0);
    const categories = [...new Set(expenses.map(exp => exp.category))];
    const topCategory = Object.entries(
      expenses.reduce((acc, exp) => {
        acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
        return acc;
      }, {})
    ).sort((a, b) => b[1] - a[1])[0];

    const thisMonth = expenses.filter(exp => {
      const expenseDate = new Date(exp.date);
      const today = new Date();
      return expenseDate.getMonth() === today.getMonth() && 
             expenseDate.getFullYear() === today.getFullYear();
    });

    const monthlyAverage = thisMonth.length > 0 
      ? (thisMonth.reduce((sum, exp) => sum + exp.amount, 0) / thisMonth.length).toFixed(2)
      : 0;

    const monthlySpend = thisMonth.length > 0 
      ? thisMonth.reduce((sum, exp) => sum + exp.amount, 0).toFixed(2)
      : 0;

    res.status(200).json({
      totalSpent: parseFloat(totalSpent.toFixed(2)),
      categoryCount: categories.length,
      topCategory: topCategory?.[0] || 'N/A',
      monthlySpend: parseFloat(monthlySpend),
      averageTransaction: parseFloat(monthlyAverage),
      transactionCount: expenses.length
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});