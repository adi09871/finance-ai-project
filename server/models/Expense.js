const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: [true, "Please provide a description"],
      trim: true,
      minlength: [3, "Description must be at least 3 characters"],
      maxlength: [100, "Description cannot exceed 100 characters"]
    },
    amount: {
      type: Number,
      required: [true, "Please provide an amount"],
      min: [0.01, "Amount must be greater than 0"]
    },
    category: {
      type: String,
      required: [true, "Please select a category"],
      enum: ["Food", "Transportation", "Entertainment", "Utilities", "Health", "Shopping", "Other"],
      default: "Other"
    },
    date: {
      type: Date,
      default: Date.now
    },
    notes: {
      type: String,
      trim: true,
      maxlength: [250, "Notes cannot exceed 250 characters"]
    }
  },
  { timestamps: true }
);

// Index for faster queries
expenseSchema.index({ date: -1 });
expenseSchema.index({ category: 1 });

module.exports = mongoose.model("Expense", expenseSchema);