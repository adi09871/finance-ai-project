import React, { useState } from 'react';
import './QuickAddExpense.css';

function QuickAddExpense() {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Food');

  const handleAddExpense = () => {
    if (description && amount) {
      console.log({
        description,
        amount,
        category,
      });
      // Reset form
      setDescription('');
      setAmount('');
      setCategory('Food');
    }
  };

  return (
    <div className="quick-add-expense">
      <div className="form-header">
        <h3>Quick Add Expense</h3>
      </div>

      <div className="form-group">
        <label>Description</label>
        <input
          type="text"
          placeholder="Coffee at Starbucks"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="form-input"
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Amount</label>
          <div className="amount-input-wrapper">
            <span className="currency">$</span>
            <input
              type="number"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="form-input amount-input"
            />
          </div>
        </div>

        <div className="form-group">
          <label>Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="form-select"
          >
            <option value="Food">Food</option>
            <option value="Transportation">Transportation</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Groceries">Groceries</option>
            <option value="Utilities">Utilities</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Shopping">Shopping</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>

      <button className="add-expense-btn" onClick={handleAddExpense}>
        <span className="btn-icon">+</span>
        Add Expense
      </button>
    </div>
  );
}

export default QuickAddExpense;
