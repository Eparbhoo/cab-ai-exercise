// SSE is not well-supported on Vercel serverless.
// The admin dashboard will fall back to polling.
module.exports = function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  // Send connected event then close
  res.write(`data: ${JSON.stringify({ type: 'connected' })}\n\n`);
  res.end();
};
