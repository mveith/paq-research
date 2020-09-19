import getSourceData from '../components/dataProvider'

export default async function getMenu(structure) {
    structure = structure ?? await getSourceData("structure.json");

    const groupedMap = structure.pages.reduce(
        (entryMap, e) => entryMap.set(e.group, [...entryMap.get(e.group) || [], e]),
        new Map()
    );
    return Array.from(groupedMap.keys()).map(k => {
        return {
            title: k,
            items: groupedMap.get(k).map(i => {
                return {
                    title: i.title,
                    key: i.key
                };
            })
        };
    });
}
