// Copies the web component bundle into the Python package, so that
// `GeneViewer.plot()` can embed it without network access.
import { copyFileSync, mkdirSync } from 'node:fs';

const source = 'web-component/dist/gene-viewer.bundle.js';
const targetDir = 'src/gene_viewer/static';

mkdirSync(targetDir, { recursive: true });
copyFileSync(source, `${targetDir}/gene-viewer.bundle.js`);
console.log(`Copied ${source} to ${targetDir}/`);
