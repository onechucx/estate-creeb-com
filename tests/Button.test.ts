import { readFileSync } from 'fs';
import { join } from 'path';

describe('smoke script', () => {
  it('mentions the dashboard and marketplace paths', () => {
  // when tests run from the project 'react-src' folder, scripts live under ./scripts
  const p = join(process.cwd(), 'scripts', 'smoke.mjs');
    const content = readFileSync(p, 'utf8');
    expect(content).toMatch('/dashboard');
    expect(content).toMatch('/marketplace');
  });
});
