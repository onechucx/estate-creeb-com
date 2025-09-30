const http = require('http');
const paths = ['/', '/dashboard', '/marketplace', '/login', '/app/profile', '/app/inbox', '/app/my-listings', '/nonexistent'];
const PORT = process.env.PORT ? Number(process.env.PORT) : 4173;
(async () => {
  for (const path of paths) {
    let got = false;
    for (const host of ['127.0.0.1', '::1', 'localhost']) {
      try {
        const res = await new Promise((resolve, reject) => {
          const r = http.request({ hostname: host, port: PORT, path, method: 'GET', timeout: 5000 }, (r) => {
            let b = '';
            r.on('data', (c) => b += c);
            r.on('end', () => resolve({ statusCode: r.statusCode, headers: r.headers, body: b }));
          });
          r.on('error', (e) => reject(e));
          r.on('timeout', () => reject(new Error('timeout')));
          r.end();
        });
        console.log(`PATH ${path} HOST ${host} STATUS ${res.statusCode}`);
        console.log(res.body.slice(0, 200));
        got = true;
        break;
      } catch (e) {
        // try next host
      }
    }
    if (!got) {
      console.log(`PATH ${path} ALL_HOSTS_FAILED`);
    }
  }
})();
