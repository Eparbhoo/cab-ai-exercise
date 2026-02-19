const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3847;

// Middleware
app.use(cors());
app.use(express.json());

// API routes
const submissionsRouter = require('./routes/submissions');
app.use('/api', submissionsRouter);

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`CAB AI Exercise server running on port ${PORT}`);
});
