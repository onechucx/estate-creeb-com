import http from 'node:http';
// The (app) route group in SvelteKit maps to the root path; adjust runtime paths accordingly
const paths = ['/', '/dashboard', '/marketplace'];
const PORT = process.env.PORT ? Number(process.env.PORT) : 5173;

async function fetchPath(path) {
  // Try common loopback hostnames (IPv4, IPv6, and localhost) to handle bind differences
  const hosts = ['127.0.0.1', '::1', 'localhost'];

  for (const host of hosts) {
    try {
      const res = await new Promise((resolve, reject) => {
        const req = http.request(
          { hostname: host, port: PORT, path, method: 'GET', timeout: 5000 },
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
      // If we got a response, return it
      return res;
    } catch (err) {
      // Try next host
      // console.error(`host ${host} failed:`, err.message);
    }
  }

  throw new Error('all hosts failed');
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
