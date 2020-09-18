export default async function getSourceData() {
    const res = await fetch(process.env.PAQ_DATA_PATH);
    const json = await res.text();
    return JSON.parse(json);
}
