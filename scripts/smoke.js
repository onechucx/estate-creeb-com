const http = require('http');

const paths = ['/', '/dashboard', '/marketplace'];
const hosts = ['127.0.0.1', '::1', 'localhost'];

async function tryHosts(path) {
  for (const host of hosts) {
    try {
      const res = await new Promise((resolve, reject) => {
        const req = http.request(
          { hostname: host, port: process.env.PORT || 4173, path, method: 'GET', timeout: 5000 },
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

      console.log('\n===', path, 'status=', res.statusCode);
      console.log(res.body.slice(0, 800));
      return;
    } catch (e) {
      // try next
    }
  }
  throw new Error('all hosts failed');
}

(async () => {
  for (const path of paths) {
    try {
      await tryHosts(path);
    } catch (e) {
      console.error('\nERR', path, e.message);
    }
  }
})();
