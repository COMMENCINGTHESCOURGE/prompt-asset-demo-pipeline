import { Command } from 'commander';
import { spawn } from 'child_process';
import fs from 'fs-extra';
import path from 'path';

const program = new Command();

program
  .name('prompt-asset-demo')
  .description('Run full writer->drawer->sound demo')
  .version('0.1.0');

program
  .command('run')
  .description('Execute demo pipeline with sample data')
  .option('--out <dir>', 'Output directory', './demo-output')
  .action(async (opts: { out: string }) => {
    const outDir = path.resolve(opts.out);
    await fs.ensureDir(outDir);
    
    // 1. Writer: generate prompt
    console.log('[1/3] Writer: generating prompt...');
    await runNode('prompt-asset-writer', ['generate', '-t', 'demo.hbs', '-o', path.join(outDir, 'prompt.md'), '-d', '{"title":"Demo Asset"}']);
    
    // 2. Drawer: render reference board
    console.log('[2/3] Drawer: rendering board...');
    await runNode('prompt-asset-draw', ['render', '--asset', 'demo', '--out', path.join(outDir, 'board.png')]);
    
    // 3. Sound: synthesize audio cue
    console.log('[3/3] Sound: synthesizing...');
    await runNode('prompt-asset-sound', ['synth', '--out', path.join(outDir, 'cue.wav'), '--freq', '440', '--duration', '1']);
    
    console.log(`Demo complete. Output in ${outDir}`);
  });

async function runNode(cmd: string, args: string[]) {
  return new Promise<void>((resolve, reject) => {
    const p = spawn(cmd, args, { stdio: 'inherit' });
    p.on('exit', code => code === 0 ? resolve() : reject(new Error(`${cmd} exited ${code}`)));
  });
}

program.parse();
