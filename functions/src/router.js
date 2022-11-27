import { fileURLToPath, pathToFileURL } from 'node:url';
import * as path from 'node:path';
import { readdir } from 'node:fs/promises';

const router = new Map();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const baseDir = path.join(__dirname, 'routes');

async function loadRoutesDir(dirName, base) {
    const relativePath = path.join(base, dirName);
    const workDir = path.join(baseDir, relativePath);
    const dir = await readdir(workDir, { withFileTypes: true });
    dir.map(async (dirent) => {
        if (dirent.isDirectory()) {
            return loadRoutesDir(dirent.name, path.join(base, dirName));
        } 
        if (
            dirent.isFile() &&
            path.extname(dirent.name) === '.js' &&
            path.basename(dirent.name, '.js') === 'index'
        ) {
            const modulePath = pathToFileURL(path.join(workDir, dirent.name));
            const module = await import(modulePath);
            router.set(path.join('/server', relativePath.replaceAll(path.sep, '/')), { ...module });
        }
        return 1;
    })
    return 0;
}

await loadRoutesDir('', path.sep);

export default router;
