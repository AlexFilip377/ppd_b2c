const { existsSync } = require('node:fs');
const { join } = require('node:path');
const { execSync } = require('node:child_process');

const root = join(__dirname, '..');

if (!existsSync(join(root, 'node_modules', 'expo', 'bin', 'cli'))) {
  console.warn('[patch-expo-cli] expo not found, skip');
  process.exit(0);
}

// Восстанавливаем стандартный CLI (без обходного expo-tunnel.mjs)
require('./restore-expo-cli.cjs');
// Патчим встроенный AsyncNgrok → ngrok v3
require('./patch-async-ngrok.cjs');
