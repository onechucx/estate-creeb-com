import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';

const root = path.resolve('.svelte-kit/output/client');
const port = process.env.PORT ? Number(process.env.PORT) : 4173;

const mime = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.map': 'application/json',
};

async function fileExists(p) {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
}

const server = http.createServer(async (req, res) => {
  try {
    const urlPath = decodeURIComponent(new URL(req.url, `http://localhost`).pathname);
    let filePath = path.join(root, urlPath);

    // If path is directory, try index.html
    if (urlPath.endsWith('/')) {
      filePath = path.join(filePath, 'index.html');
    }

    if (!(await fileExists(filePath))) {
      // fallback to index.html for SPA routes
      filePath = path.join(root, 'index.html');
    }

    const ext = path.extname(filePath);
    const content = await fs.readFile(filePath);

    res.writeHead(200, { 'Content-Type': mime[ext] || 'application/octet-stream' });
    res.end(content);
  } catch (err) {
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end(String(err));
  }
});

server.listen(port, '127.0.0.1', () => {
  console.log(`Static server running at http://127.0.0.1:${port}/ serving ${root}`);
});
