const { writeFileSync, existsSync } = require('node:fs');
const { join } = require('node:path');

const cliPath = join(__dirname, '..', 'node_modules', 'expo', 'bin', 'cli');
const original = `#!/usr/bin/env node

// Execute the CLI using node module resolution, instead of creating a new process.
// This avoids resolving issues with pnpm and yarn 2+ package managers.
require('@expo/cli');
`;

if (!existsSync(cliPath)) {
  process.exit(0);
}

writeFileSync(cliPath, original, 'utf8');
