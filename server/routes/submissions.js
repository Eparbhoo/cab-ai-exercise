const express = require('express');
const router = express.Router();
const db = require('../db');

// SSE clients
let sseClients = [];

function notifyClients() {
  const data = JSON.stringify({ type: 'update', timestamp: new Date().toISOString() });
  sseClients = sseClients.filter((res) => {
    try {
      res.write(`data: ${data}\n\n`);
      return true;
    } catch {
      return false;
    }
  });
}

// SSE endpoint for real-time updates
router.get('/submissions/stream', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('Access-Control-Allow-Origin', '*');

  res.write(`data: ${JSON.stringify({ type: 'connected' })}\n\n`);
  sseClients.push(res);

  req.on('close', () => {
    sseClients = sseClients.filter((client) => client !== res);
  });
});

// GET all submissions
router.get('/submissions', (req, res) => {
  try {
    const submissions = db.prepare('SELECT * FROM submissions ORDER BY submittedAt ASC').all();
    res.json(submissions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST a new submission (single question)
router.post('/submissions', (req, res) => {
  try {
    const {
      participantName,
      organization,
      personaId,
      personaName,
      personaRole,
      questionText,
      questionNumber,
      sessionId,
    } = req.body;

    if (!participantName || !personaId || !questionText || !sessionId) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const stmt = db.prepare(`
      INSERT INTO submissions (participantName, organization, personaId, personaName, personaRole, questionText, questionNumber, sessionId, submittedAt)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const result = stmt.run(
      participantName,
      organization || '',
      personaId,
      personaName,
      personaRole,
      questionText,
      questionNumber || 1,
      sessionId,
      new Date().toISOString()
    );

    notifyClients();

    res.json({ id: result.lastInsertRowid, success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE all submissions (reset)
router.delete('/submissions', (req, res) => {
  try {
    db.prepare('DELETE FROM submissions').run();
    db.prepare('UPDATE persona_assignments SET assignCount = 0').run();
    db.prepare('DELETE FROM sessions').run();
    notifyClients();
    res.json({ success: true, message: 'All data cleared' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET next persona (weighted random assignment)
router.get('/persona/next', (req, res) => {
  try {
    // Get all persona assignment counts
    const assignments = db
      .prepare('SELECT personaId, assignCount FROM persona_assignments ORDER BY assignCount ASC')
      .all();

    // Find the minimum assignment count
    const minCount = assignments[0].assignCount;

    // Get all personas with the minimum count
    const candidates = assignments.filter((a) => a.assignCount === minCount);

    // Random selection among tied candidates
    const selected = candidates[Math.floor(Math.random() * candidates.length)];

    // Increment the assignment count
    db.prepare('UPDATE persona_assignments SET assignCount = assignCount + 1 WHERE personaId = ?').run(
      selected.personaId
    );

    res.json({ personaId: selected.personaId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST create session
router.post('/sessions', (req, res) => {
  try {
    const { sessionId, participantName, organization, personaId } = req.body;

    db.prepare(`
      INSERT OR REPLACE INTO sessions (sessionId, participantName, organization, personaId, createdAt)
      VALUES (?, ?, ?, ?, ?)
    `).run(sessionId, participantName, organization || '', personaId, new Date().toISOString());

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET stats for admin
router.get('/stats', (req, res) => {
  try {
    const totalQuestions = db.prepare('SELECT COUNT(*) as count FROM submissions').get().count;
    const uniqueParticipants = db
      .prepare('SELECT COUNT(DISTINCT sessionId) as count FROM submissions')
      .get().count;
    const assignments = db.prepare('SELECT * FROM persona_assignments ORDER BY personaId').all();

    res.json({
      totalQuestions,
      uniqueParticipants,
      personaAssignments: assignments,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
