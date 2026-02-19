const store = require('../_store');

module.exports = function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    const assignments = Object.entries(store.personaAssignments)
      .map(([personaId, assignCount]) => ({
        personaId: parseInt(personaId, 10),
        assignCount,
      }))
      .sort((a, b) => a.assignCount - b.assignCount);

    const minCount = assignments[0].assignCount;
    const candidates = assignments.filter((a) => a.assignCount === minCount);
    const selected = candidates[Math.floor(Math.random() * candidates.length)];

    store.personaAssignments[selected.personaId]++;

    return res.json({ personaId: selected.personaId });
  }

  return res.status(405).json({ error: 'Method not allowed' });
};
