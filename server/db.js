const Database = require('better-sqlite3');
const path = require('path');

// Create database file in server directory
const dbPath = path.join(__dirname, 'expenses.db');
const db = new Database(dbPath);

// Enable foreign keys
db.pragma('foreign_keys = ON');

// Create expenses table if it doesn't exist
db.exec(`
  CREATE TABLE IF NOT EXISTS expenses (
    id TEXT PRIMARY KEY,
    description TEXT NOT NULL,
    amount REAL NOT NULL,
    category TEXT NOT NULL,
    notes TEXT,
    date DATETIME DEFAULT CURRENT_TIMESTAMP,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
  );
  CREATE INDEX IF NOT EXISTS idx_date ON expenses(date DESC);
  CREATE INDEX IF NOT EXISTS idx_category ON expenses(category);
`);

console.log('✅ SQLite Database Connected');

// Helper functions
const generateId = () => require('crypto').randomUUID();

const addExpense = (description, amount, category, notes = null) => {
  const id = generateId();
  const stmt = db.prepare(`
    INSERT INTO expenses (id, description, amount, category, notes)
    VALUES (?, ?, ?, ?, ?)
  `);
  
  stmt.run(id, description, amount, category, notes);
  return getExpenseById(id);
};

const getExpenses = () => {
  const stmt = db.prepare('SELECT * FROM expenses ORDER BY date DESC');
  return stmt.all();
};

const getExpenseById = (id) => {
  const stmt = db.prepare('SELECT * FROM expenses WHERE id = ?');
  return stmt.get(id);
};

const deleteExpense = (id) => {
  const stmt = db.prepare('DELETE FROM expenses WHERE id = ?');
  return stmt.run(id);
};

module.exports = {
  db,
  addExpense,
  getExpenses,
  getExpenseById,
  deleteExpense
};
