const store = require('./_store');

module.exports = function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // GET /api/submissions
  if (req.method === 'GET') {
    return res.json(store.submissions);
  }

  // POST /api/submissions
  if (req.method === 'POST') {
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

    const submission = {
      id: store.nextId++,
      participantName,
      organization: organization || '',
      personaId,
      personaName,
      personaRole,
      questionText,
      questionNumber: questionNumber || 1,
      sessionId,
      submittedAt: new Date().toISOString(),
    };

    store.submissions.push(submission);
    return res.json({ id: submission.id, success: true });
  }

  // DELETE /api/submissions
  if (req.method === 'DELETE') {
    store.submissions = [];
    store.sessions = [];
    store.nextId = 1;
    store.personaAssignments = {
      1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0,
    };
    return res.json({ success: true, message: 'All data cleared' });
  }

  return res.status(405).json({ error: 'Method not allowed' });
};
