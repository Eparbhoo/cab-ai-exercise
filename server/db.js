const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(__dirname, 'data.db');
const db = new Database(dbPath);

// Enable WAL mode for better concurrent access
db.pragma('journal_mode = WAL');

// Create tables
db.exec(`
  CREATE TABLE IF NOT EXISTS submissions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    participantName TEXT NOT NULL,
    organization TEXT DEFAULT '',
    personaId INTEGER NOT NULL,
    personaName TEXT NOT NULL,
    personaRole TEXT NOT NULL,
    questionText TEXT NOT NULL,
    questionNumber INTEGER NOT NULL,
    sessionId TEXT NOT NULL,
    submittedAt TEXT NOT NULL DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS persona_assignments (
    personaId INTEGER PRIMARY KEY,
    assignCount INTEGER NOT NULL DEFAULT 0
  );

  CREATE TABLE IF NOT EXISTS sessions (
    sessionId TEXT PRIMARY KEY,
    participantName TEXT NOT NULL,
    organization TEXT DEFAULT '',
    personaId INTEGER NOT NULL,
    createdAt TEXT NOT NULL DEFAULT (datetime('now'))
  );
`);

// Initialize persona assignment counters (7 personas)
const insertAssignment = db.prepare(
  'INSERT OR IGNORE INTO persona_assignments (personaId, assignCount) VALUES (?, 0)'
);
for (let i = 1; i <= 7; i++) {
  insertAssignment.run(i);
}

module.exports = db;
