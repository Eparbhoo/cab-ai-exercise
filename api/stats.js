const store = require('./_store');

module.exports = function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    const totalQuestions = store.submissions.length;
    const uniqueSessions = new Set(store.submissions.map((s) => s.sessionId));
    const uniqueParticipants = uniqueSessions.size;

    const personaAssignments = Object.entries(store.personaAssignments).map(
      ([personaId, assignCount]) => ({
        personaId: parseInt(personaId, 10),
        assignCount,
      })
    );

    return res.json({
      totalQuestions,
      uniqueParticipants,
      personaAssignments,
    });
  }

  return res.status(405).json({ error: 'Method not allowed' });
};
