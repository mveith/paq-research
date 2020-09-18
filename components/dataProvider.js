import fs from 'fs'
import path from 'path'

export default async function getSourceData(fileName) {
    var json;
    if (process.env.PAQ_DATA_PATH_TO_FILE) {
        const res = await fetch(path.join(process.env.PAQ_DATA_PATH_TO_FILE, fileName));
        json = await res.text();
    }
    else {
        const filePath = path.join(process.cwd(), 'sample', fileName);
        json = fs.readFileSync(filePath, 'utf8');
    }

    return JSON.parse(json);
}
