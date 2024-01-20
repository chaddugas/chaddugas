// load-env.js
import { existsSync, readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const envFile = join(__dirname, '.env.local');

if (existsSync(envFile)) {
  const env = readFileSync(envFile, 'utf-8');
  const lines = env.split('\n');

  for (const line of lines) {
    const [key, value] = line.split('=');
    if (key && value) {
      process.env[key.trim()] = value.trim();
    }
  }
}
