import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const WEBSITE_DIR = path.join(__dirname, 'website');

// Middleware to handle clean URLs
app.use((req, res, next) => {
  // Remove trailing slashes
  if (req.path !== '/' && req.path.endsWith('/')) {
    return res.redirect(301, req.path.slice(0, -1));
  }

  // Handle root path
  if (req.path === '/') {
    return res.sendFile(path.join(WEBSITE_DIR, 'index.html'));
  }

  // Try to serve the file with .html extension
  const htmlPath = path.join(WEBSITE_DIR, `${req.path}.html`);
  
  // Check if .html file exists
  if (fs.existsSync(htmlPath)) {
    return res.sendFile(htmlPath);
  }

  // Try to serve static files as is (for CSS, JS, images, etc.)
  const staticPath = path.join(WEBSITE_DIR, req.path);
  if (fs.existsSync(staticPath) && fs.statSync(staticPath).isFile()) {
    return res.sendFile(staticPath);
  }

  // If nothing matched, continue to next middleware
  next();
});

// Serve static files from website directory
app.use(express.static(WEBSITE_DIR));

// 404 handler
app.use((req, res) => {
  res.status(404).send('404 - Page not found');
});

app.listen(PORT, () => {
  console.log(`
🚀 Development server running with clean URLs!
🌐 Open http://localhost:${PORT} in your browser

Clean URLs are enabled:
  ✓ /work-with-me (instead of /work-with-me.html)
  ✓ /sleep-guidance-call
  ✓ /3-call-sleep-support
  ✓ /comprehensive-sleep-support
  
Press Ctrl+C to stop the server
  `);
});