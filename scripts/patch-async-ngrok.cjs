const { readFileSync, writeFileSync, existsSync } = require('node:fs');
const { join } = require('node:path');

const root = join(__dirname, '..');
const asyncNgrokPath = join(
  root,
  'node_modules',
  'expo',
  'node_modules',
  '@expo',
  'cli',
  'build',
  'src',
  'start',
  'server',
  'AsyncNgrok.js',
);

const marker = '/* ngrok-v3-patch-v3 */';

const newStartAsync = `/** Start ngrok on the given port for the project. */ async startAsync({ timeout } = {}) {
        ${marker}
        const authtoken = process.env.EXPO_NGROK_AUTHTOKEN || process.env.NGROK_AUTHTOKEN;
        if (!authtoken) {
            throw new _errors.CommandError('NGROK_AUTHTOKEN', 'Добавьте EXPO_NGROK_AUTHTOKEN в .env');
        }
        try {
            if ((0, _adbReverse.hasAdbReverseAsync)()) {
                await (0, _adbReverse.startAdbReverseAsync)([this.port]);
            }
        } catch (e) {
            debug('Skipping adb reverse (not required for Expo Go tunnel):', e);
        }
        const ngrok = require(require.resolve('@ngrok/ngrok', { paths: [this.projectRoot] }));
        try {
            await ngrok.kill();
        } catch (e) {
            debug('Ngrok kill before start:', e);
        }
        this._ngrokListener = await ngrok.forward({ addr: this.port, authtoken, pooling_enabled: true });
        this.serverUrl = this._ngrokListener.url();
        debug('Tunnel URL:', this.serverUrl);
        _log.log('Tunnel ready.');
    }`;

const newStopAsync = `/** Stop the ngrok process if it's running. */ async stopAsync() {
        ${marker}
        debug('Stopping Tunnel');
        const ngrok = require(require.resolve('@ngrok/ngrok', { paths: [this.projectRoot] }));
        if (this._ngrokListener) {
            try {
                await this._ngrokListener.close();
            } catch (e) {
                debug('Ngrok close error:', e);
            }
            this._ngrokListener = null;
        }
        try {
            await ngrok.kill();
        } catch (e) {
            debug('Ngrok kill on stop:', e);
        }
        this.serverUrl = null;
    }`;

if (!existsSync(asyncNgrokPath)) {
  console.warn('[patch-async-ngrok] AsyncNgrok.js not found, skip');
  process.exit(0);
}

let source = readFileSync(asyncNgrokPath, 'utf8');
if (source.includes(marker)) {
  process.exit(0);
}
// v2 → v3: add ngrok.kill()
if (source.includes('/* ngrok-v3-patch-v2 */') && !source.includes(marker)) {
  source = source.replaceAll('/* ngrok-v3-patch-v2 */', marker);
  if (!source.includes('await ngrok.kill()')) {
    source = source.replace(
      'this._ngrokListener = await ngrok.forward({ addr: this.port, authtoken });',
      `try {
            await ngrok.kill();
        } catch (e) {
            debug('Ngrok kill before start:', e);
        }
        this._ngrokListener = await ngrok.forward({ addr: this.port, authtoken, pooling_enabled: true });`,
    );
    source = source.replace(
      `        this.serverUrl = null;
    }
    /** Exposed for testing. */ async _connectToNgrokAsync`,
      `        try {
            await ngrok.kill();
        } catch (e) {
            debug('Ngrok kill on stop:', e);
        }
        this.serverUrl = null;
    }
    /** Exposed for testing. */ async _connectToNgrokAsync`,
    );
  }
  writeFileSync(asyncNgrokPath, source, 'utf8');
  console.log('[patch-async-ngrok] updated v2 → v3');
  process.exit(0);
}

const startBegin = '/** Start ngrok on the given port for the project. */ async startAsync({ timeout } = {}) {';
const stopBegin = "/** Stop the ngrok process if it's running. */ async stopAsync() {";
const connectBegin = '/** Exposed for testing. */ async _connectToNgrokAsync';

const startIdx = source.indexOf(startBegin);
const stopIdx = source.indexOf(stopBegin);
const connectIdx = source.indexOf(connectBegin);

if (startIdx === -1 || stopIdx === -1 || connectIdx === -1) {
  throw new Error('AsyncNgrok.js structure changed, patch failed');
}

source = source.slice(0, startIdx) + newStartAsync + '\n    ' + source.slice(stopIdx);
const stopIdx2 = source.indexOf(stopBegin);
const connectIdx2 = source.indexOf(connectBegin);
source = source.slice(0, stopIdx2) + newStopAsync + '\n    ' + source.slice(connectIdx2);

writeFileSync(asyncNgrokPath, source, 'utf8');
console.log('[patch-async-ngrok] Expo tunnel → ngrok v3');
