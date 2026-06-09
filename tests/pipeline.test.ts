import { describe, it, expect } from 'vitest';

describe('pipeline', () => {
  it('exports a runnable CLI binary reference', () => {
    const pkg = require('../package.json');
    expect(pkg.bin).toBeDefined();
    expect(pkg.bin['prompt-asset-demo']).toBe('./src/cli.ts');
  });

  it('has required scripts', () => {
    const pkg = require('../package.json');
    expect(pkg.scripts.build).toBe('tsc');
    expect(pkg.scripts.test).toContain('vitest');
  });
});
