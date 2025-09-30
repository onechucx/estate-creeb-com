import http from 'node:http';
const paths = ['/', '/app/dashboard', '/app/marketplace'];
const PORT = process.env.PORT ? Number(process.env.PORT) : 5173;

async function fetchPath(path) {
  return new Promise((resolve, reject) => {
    const req = http.request(
      { hostname: '127.0.0.1', port: PORT, path, method: 'GET', timeout: 5000 },
      (r) => {
        let b = '';
        r.on('data', (c) => (b += c));
        r.on('end', () => resolve({ statusCode: r.statusCode, headers: r.headers, body: b }));
      }
    );
    req.on('error', (e) => reject(e));
    req.on('timeout', () => reject(new Error('timeout')));
    req.end();
  });
}

(async () => {
  for (const path of paths) {
    try {
      const res = await fetchPath(path);
      console.log('\n===', path, 'status=', res.statusCode);
      console.log(res.body.slice(0, 800));
    } catch (e) {
      console.error('\nERR', path, e.message);
    }
  }
})();
