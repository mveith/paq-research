import getSourceData from '../components/dataProvider'
import DataPage from '../components/dataPage';
import ThemeNavigation from '../components/themeNavigation';

export default function Page(props) {
    return <DataPage
        navigation={<ThemeNavigation previousHref={props.previousHref} previousTitle={props.previousTitle} nextHref={props.nextHref} nextTitle={props.nextTitle} />}
        dataProps={props.dataProps}
        menuProps={props.menuProps}
    />;
}

export async function getStaticProps(context) {
    const data = await getSourceData(`${context.params.key}.json`);
    const structure = await getSourceData("structure.json");
    const currentIndex = structure.pages.map(p => p.key).indexOf(context.params.key);
    const previous = currentIndex > 0 ? structure.pages[currentIndex - 1] : structure.pages[structure.pages.length - 1];
    const next = currentIndex < structure.pages.length - 1 ? structure.pages[currentIndex + 1] : structure.pages[0];

    const groupedMap = structure.pages.reduce(
        (entryMap, e) => entryMap.set(e.group, [...entryMap.get(e.group) || [], e]),
        new Map()
    );
    const menu = Array.from(groupedMap.keys()).map(k => {
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

    return {
        props: {
            dataProps: data,
            previousHref: `/${previous.key}`,
            previousTitle: previous.title,
            nextHref: `/${next.key}`,
            nextTitle: next.title,
            menuProps: menu
        }
    }
}

export async function getStaticPaths() {
    const data = await getSourceData("structure.json");
    return {
        paths: data.pages.map(p => { return { params: { key: p.key } }; }),
        fallback: false
    };
}
