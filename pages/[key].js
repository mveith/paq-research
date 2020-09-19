import getSourceData from '../components/dataProvider'
import ThemeNavigation from '../components/themeNavigation';
import Head from 'next/head';
import { useState, useEffect } from 'react';
import Layout from '../components/layout';
import ChartWrapper from '../components/chartWrapper'
import ChartSettings from '../components/chartSettings';

export default function Page(props) {
    const dataProps = props.dataProps;
    const asLineChart = props.dataProps.asLineChart;
    const max = props.dataProps.yMax;
    const nonpercentage = !props.dataProps.percentage;


    const [total, setTotal] = useState(true);
    const [group, setGroup] = useState(0);

    const title = props.texts.pageData.title;
    useEffect(() => {
        const storedTotal = localStorage.getItem("total");
        if (storedTotal) {
            setTotal(storedTotal === "true");
        }
    }, []);

    const [openMenu, setOpenMenu] = useState(false);
    const onTotalChange = v => {
        setTotal(v);
        localStorage.setItem("total", v);
    };

    const onGroupChange = v => {
        setGroup(v);
    };
    return (
        <Layout title={title} openMenu={openMenu} setOpenMenu={setOpenMenu} menuItemsData={props.menuProps}>
            <Head>
                <meta key="share-image" property="og:image" content={`https://zivotbehempandemie.cz/${props.texts.pageData.shareImage}.png`} />
                <meta property="og:description" content={title} />
            </Head>
            <h1>{title}</h1>

            <p className="select-topic" ><a href="javascript:void(0);" className="arrow-button" onClick={e => setOpenMenu(!openMenu)}>Vybrat jiné téma</a></p>

            <p dangerouslySetInnerHTML={{ __html: props.texts.pageData.description }}></p>

            <div style={{ display: "flex", flexDirection: "column" }}>
                <p>Podívejte se na <a href="#stories" className="arrow-button">interpretace↓</a> a <a href="#methodology" className="arrow-button">metodické poznámky↓</a></p>

                <ChartSettings dataProps={dataProps} total={total} onTotalChange={onTotalChange} group={group} onGroupChange={onGroupChange} />

                <ChartWrapper key={props.key} dataProps={dataProps} asLineChart={asLineChart} max={max} nonpercentage={nonpercentage} group={group} total={total} />

            </div>

            <div id="stories" className="blog">
                <h2>Co můžeme v datech pozorovat?</h2>
                {props.texts.stories.map((s, i) => (<div className="story" key={`story-${i}}`}>
                    <p className="story-title">{s.title}</p>
                    <div className="block-paragraph" dangerouslySetInnerHTML={{ __html: s.text }}></div>
                    <hr style={{ margin: "2rem 40%", color: "#707070" }} />
                </div>))}
            </div>

            <div id="methodology" className="blog">
                <h2>Metodické poznámky</h2>
                <div className="block-paragraph" dangerouslySetInnerHTML={{ __html: props.texts.methodology }}></div>
            </div>
            <ThemeNavigation previousHref={props.previousHref} previousTitle={props.previousTitle} nextHref={props.nextHref} nextTitle={props.nextTitle} />
        </Layout >
    );
}

export async function getStaticProps(context) {
    const data = await getSourceData(`${context.params.key}.json`);
    const texts = await getSourceData(`${context.params.key}-texts.json`);
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
            texts: texts,
            previousHref: `/${previous.key}`,
            previousTitle: previous.title,
            nextHref: `/${next.key}`,
            nextTitle: next.title,
            menuProps: menu,
            key: `${context.params.key}-chart`
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
