import getSourceData from '../components/dataProvider'
import getMenu from '../components/menuBuilder'
import ThemeNavigation from '../components/themeNavigation';
import Head from 'next/head';
import { useState } from 'react';
import Layout from '../components/layout';
import ChartWrapper from '../components/chartWrapper'
import ChartSettings from '../components/chartSettings';

export default function Page({ data, texts, menu, chartKey, navigation }) {
    const [total, setTotal] = useState(true);
    const [group, setGroup] = useState(0);
    const [filter, setFilter] = useState(data.filters ? 0 : undefined);

    const title = texts.pageData.title;
    const [openMenu, setOpenMenu] = useState(false);
    const onTotalChange = v => {
        setTotal(v);
    };

    const onGroupChange = v => {
        setGroup(v);
    };
    return (
        <Layout title={title} openMenu={openMenu} setOpenMenu={setOpenMenu} menuItemsData={menu}>
            <Head>
                <meta key="share-image" property="og:image" content={`https://zivotbehempandemie.cz/${texts.pageData.shareImage}.png`} />
                <meta property="og:description" content={title} />
            </Head>
            <h1>{title}</h1>

            <p className="select-topic" ><a href="javascript:void(0);" className="arrow-button" onClick={e => setOpenMenu(!openMenu)}>Vybrat jiné téma</a></p>

            <p dangerouslySetInnerHTML={{ __html: texts.pageData.description }}></p>

            <div style={{ display: "flex", flexDirection: "column" }}>
                <p>Podívejte se na <a href="#stories" className="arrow-button">interpretace↓</a> a <a href="#methodology" className="arrow-button">metodické poznámky↓</a></p>

                <ChartSettings dataProps={data} total={total} onTotalChange={onTotalChange} group={group} onGroupChange={onGroupChange} title={title} currentFilter={filter} onFilterChange={setFilter} />

                <ChartWrapper key={`${chartKey + (filter ? `-${filter}` : "")}`} dataProps={data} group={group} total={total} filter={data.filters && filter !== undefined ? data.filters[filter].indexes : undefined} />

            </div>

            <div id="stories" className="blog">
                <h2>Co můžeme v datech pozorovat?</h2>
                {texts.stories.map((s, i) => (<div className="story" key={`story-${i}}`}>
                    <p className="story-title">{s.title}</p>
                    <div className="block-paragraph" dangerouslySetInnerHTML={{ __html: s.text }}></div>
                    <hr style={{ margin: "2rem 40%", color: "#707070" }} />
                </div>))}
            </div>

            <div id="methodology" className="blog">
                <h2>Metodické poznámky</h2>
                <div className="block-paragraph" dangerouslySetInnerHTML={{ __html: texts.methodology }}></div>
            </div>
            <ThemeNavigation previousHref={navigation.previousHref} previousTitle={navigation.previousTitle} nextHref={navigation.nextHref} nextTitle={navigation.nextTitle} />
        </Layout >
    );
}

export async function getStaticProps(context) {
    const data = await getSourceData(`${context.params.key}.json`);
    const texts = await getSourceData(`${context.params.key}-texts.json`);
    const structure = await getSourceData("structure.json");
    const icons = await getSourceData("icons.json");
    const currentIndex = structure.pages.map(p => p.key).indexOf(context.params.key);
    const previous = currentIndex > 0 ? structure.pages[currentIndex - 1] : structure.pages[structure.pages.length - 1];
    const next = currentIndex < structure.pages.length - 1 ? structure.pages[currentIndex + 1] : structure.pages[0];

    for (let i = 0; i < data.groups.length; i++) {
        const group = data.groups[i];
        const icon = icons.icons.filter(icon => icon.label === group.title)[0];
        group.image = icon ? icon.image : icons.defaultImage;
    }

    return {
        props: {
            data: data,
            texts: texts,
            menu: await getMenu(structure),
            chartKey: `${context.params.key}-chart`,
            key: `${context.params.key}-chart`,
            navigation: {
                previousHref: `/${previous.key}`,
                previousTitle: previous.title,
                nextHref: `/${next.key}`,
                nextTitle: next.title,
            }
        }
    };
}

export async function getStaticPaths() {
    const data = await getSourceData("structure.json");
    return {
        paths: data.pages.map(p => { return { params: { key: p.key } }; }),
        fallback: false
    };
}
