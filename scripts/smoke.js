const http = require('http');
const paths = ['/', '/app/dashboard', '/app/marketplace'];

(async () => {
  for (const path of paths) {
    try {
      const res = await new Promise((resolve, reject) => {
        const req = http.request(
          { hostname: '127.0.0.1', port: 5173, path, method: 'GET', timeout: 5000 },
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
    } catch (e) {
      console.error('\nERR', path, e.message);
    }
  }
})();
