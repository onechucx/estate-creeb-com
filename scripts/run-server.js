import http from 'http';
import { handler } from '../.svelte-kit/output/server/index.js';

const port = process.env.PORT || 4173;

const server = http.createServer((req, res) => handler(req, res));
server.listen(port, '127.0.0.1', () => {
  console.log(`Server listening on http://127.0.0.1:${port}`);
});

process.on('SIGINT', () => server.close(() => process.exit(0)));
