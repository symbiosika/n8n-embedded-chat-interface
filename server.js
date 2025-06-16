import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const port = process.env.PORT || 4000;

// Enable CORS and iframe embedding
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('X-Frame-Options', 'ALLOWALL');
  next();
});

// Serve static files from output directory
app.use(express.static(path.join(__dirname, 'output')));

// Serve the main UMD file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'output', 'index.umd.cjs'));
});

// Serve demo page
app.get('/demo', (req, res) => {
  res.sendFile(path.join(__dirname, 'production-demo.html'));
});

// Serve local demo page
app.get('/local-demo', (req, res) => {
  res.sendFile(path.join(__dirname, 'demo.html'));
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'n8n-chat-interface' });
});

app.listen(port, '0.0.0.0', () => {
  console.log(`N8N Chat Interface server listening on port ${port}`);
  console.log(`Demo available at: http://localhost:${port}/demo`);
  console.log(`Widget script at: http://localhost:${port}/index.umd.cjs`);
});