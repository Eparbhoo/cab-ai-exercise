const store = require('./_store');

module.exports = function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'POST') {
    const { sessionId, participantName, organization, personaId } = req.body;

    // Replace existing session or add new one
    const existingIndex = store.sessions.findIndex((s) => s.sessionId === sessionId);
    const session = {
      sessionId,
      participantName,
      organization: organization || '',
      personaId,
      createdAt: new Date().toISOString(),
    };

    if (existingIndex >= 0) {
      store.sessions[existingIndex] = session;
    } else {
      store.sessions.push(session);
    }

    return res.json({ success: true });
  }

  return res.status(405).json({ error: 'Method not allowed' });
};
