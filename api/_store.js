// In-memory store for Vercel serverless functions
// Persists as long as the serverless instance is warm
// For a 4-person conference exercise, this is sufficient

if (!global.__cabStore) {
  global.__cabStore = {
    submissions: [],
    sessions: [],
    nextId: 1,
    personaAssignments: {
      1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0,
    },
  };
}

module.exports = global.__cabStore;
