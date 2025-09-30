const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

const projectRoot = path.resolve(__dirname, '..');
const index = path.join(projectRoot, '.svelte-kit', 'output', 'server', 'index.js');
const outLog = path.join(projectRoot, 'server-debug-out.log');
const errLog = path.join(projectRoot, 'server-debug-err.log');

if (!fs.existsSync(index)) {
  console.error('Server build missing at', index);
  process.exit(2);
}

const out = fs.createWriteStream(outLog, { flags: 'w' });
const err = fs.createWriteStream(errLog, { flags: 'w' });

const proc = spawn(process.execPath, [index], {
  cwd: projectRoot,
  env: Object.assign({}, process.env, { PORT: process.env.PORT || '4173' }),
  stdio: ['ignore', 'pipe', 'pipe']
});

proc.stdout.pipe(out);
proc.stderr.pipe(err);

console.log('Spawned pid=', proc.pid);

proc.on('exit', (code, signal) => {
  console.log('Server exited with', code, 'signal', signal);
  out.end();
  err.end();
});

process.on('SIGINT', () => {
  proc.kill('SIGINT');
  process.exit(0);
});
