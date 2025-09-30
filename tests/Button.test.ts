import { readFileSync } from 'fs';
import { join } from 'path';

describe('smoke script', () => {
  it('mentions the dashboard and marketplace paths', () => {
    const p = join(process.cwd(), 'react-src', 'scripts', 'smoke.mjs');
    const content = readFileSync(p, 'utf8');
    expect(content).toMatch('/dashboard');
    expect(content).toMatch('/marketplace');
  });
});
