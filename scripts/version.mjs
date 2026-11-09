// The Python package and the web component share one version number.
//
//   node scripts/version.mjs check [tag]   verify both versions (and the tag) match
//   node scripts/version.mjs set <version> update both versions
import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';

const PYPROJECT = 'pyproject.toml';
const PACKAGE_JSON = 'web-component/package.json';
const PY_VERSION = /^version\s*=\s*"([^"]+)"/m;

const pythonVersion = () => readFileSync(PYPROJECT, 'utf8').match(PY_VERSION)[1];
const npmVersion = () => JSON.parse(readFileSync(PACKAGE_JSON, 'utf8')).version;

const [command, arg] = process.argv.slice(2);

if (command === 'check') {
  const versions = { [PYPROJECT]: pythonVersion(), [PACKAGE_JSON]: npmVersion() };
  if (arg) versions['release tag'] = arg.replace(/^v/, '');
  console.table(versions);
  if (new Set(Object.values(versions)).size !== 1) {
    console.error('Versions do not match.');
    process.exit(1);
  }
} else if (command === 'set' && arg) {
  const version = arg.replace(/^v/, '');
  writeFileSync(
    PYPROJECT,
    readFileSync(PYPROJECT, 'utf8').replace(PY_VERSION, `version = "${version}"`),
  );
  // Also updates package-lock.json.
  execFileSync(
    'npm',
    ['version', version, '-w', 'gene-viewer', '--no-git-tag-version', '--allow-same-version'],
    { stdio: 'inherit' },
  );
  console.log(`Set version ${version}`);
} else {
  console.error('Usage: node scripts/version.mjs check [tag] | set <version>');
  process.exit(1);
}
