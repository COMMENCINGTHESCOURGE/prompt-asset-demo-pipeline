# prompt-asset-demo-pipeline

**Part of the MANIFOLD field computation system.**
**Copyright (c) 2026 Guinea Pig Trench LLC**

---

End-to-end demo pipeline: writer -> drawer -> sound -> combined output. Orchestrates the full prompt-asset toolchain in a single command.

## Quick Start

```bash
npm install
npm run build
node dist/cli.js run --out ./demo-output
```

## Pipeline Stages

| Step | Binary | Purpose |
|------|--------|---------|
| 1/3 | `prompt-asset-writer` | Generate prompt from template |
| 2/3 | `prompt-asset-draw` | Render reference board |
| 3/3 | `prompt-asset-sound` | Synthesize audio cue |

## Scripts

| Command | Action |
|---------|--------|
| `npm run build` | Compile TypeScript |
| `npm test` | Run vitest suite |
| `npm run demo` | Execute demo pipeline |

## Entity

| Field | Value |
|-------|-------|
| Copyright | Guinea Pig Trench LLC |
| R&D Entity | Guinea Pig Trench LLC (PA, #13674084) |
| Credit Facility | Truth Holds Enterprise (PA #7049023) |
