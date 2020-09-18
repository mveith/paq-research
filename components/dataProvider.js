import fs from 'fs'
import path from 'path'

export default async function getSourceData() {
    var json;
    if (process.env.PAQ_DATA_PATH) {
        const res = await fetch(process.env.PAQ_DATA_PATH);
        json = await res.text();
    }
    else {
        const filePath = path.join(process.cwd(), 'sample/data.json');
        json = fs.readFileSync(filePath, 'utf8');
    }

    return JSON.parse(json);
}
