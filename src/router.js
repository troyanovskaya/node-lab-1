import { fileURLToPath, pathToFileURL } from 'node:url';
import * as path from 'node:path';
const router = new Map();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import { readdir} from 'node:fs/promises';

const baseDir = path.join(__dirname, 'routes');

async function loadRoutesDir(dirName, base){
    const relativePath = path.join(base, dirName);
    const workDir = path.join(baseDir, relativePath);
    const dir = await readdir(workDir, {withFileTypes:true});

    for (const dirent of dir){
        if(dirent.isDirectory()){
            return loadRoutesDir(dirent.name, path.join(base, dirName))
        } else if(dirent.isFile() && path.extname(dirent.name) === '.js' && path.basename(dirent.name, '.js') === 'index'){
            const modulePath = pathToFileURL(path.join(workDir, dirent.name));
            let module = await import(modulePath);
            router.set(relativePath.replaceAll(path.set, '/'), {...module})

        }

    }

}

await loadRoutesDir('', path.sep);
console.log(router);
