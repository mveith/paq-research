import Head from 'next/head';
import { useState, useEffect } from 'react';
import Layout from './layout';
import ChartWrapper from './chartWrapper'
import ChartSettings from './chartSettings';

export default function DataPage({ navigation, dataProps, asLineChart, max, nonpercentage, menuProps }) {
    const [total, setTotal] = useState(true);
    const [group, setGroup] = useState(0);

    const title = dataProps.pageData.title;
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
        <Layout title={title} openMenu={openMenu} setOpenMenu={setOpenMenu} menuItemsData={menuProps}>
            <Head>
                <meta key="share-image" property="og:image" content={`https://zivotbehempandemie.cz/${dataProps.pageData.shareImage}.png`} />
                <meta property="og:description" content={title} />
            </Head>
            <h1>{title}</h1>

            <p className="select-topic" ><a href="javascript:void(0);" className="arrow-button" onClick={e => setOpenMenu(!openMenu)}>Vybrat jiné téma</a></p>

            <p dangerouslySetInnerHTML={{ __html: dataProps.pageData.description }}></p>

            <div style={{ display: "flex", flexDirection: "column" }}>
                <p>Podívejte se na <a href="#stories" className="arrow-button">interpretace↓</a> a <a href="#methodology" className="arrow-button">metodické poznámky↓</a></p>

                <ChartSettings dataProps={dataProps} total={total} onTotalChange={onTotalChange} group={group} onGroupChange={onGroupChange} />

                <ChartWrapper dataProps={dataProps} asLineChart={asLineChart} max={max} nonpercentage={nonpercentage} group={group} total={total} />

            </div>

            <div id="stories" className="blog">
                <h2>Co můžeme v datech pozorovat?</h2>
                {dataProps.stories.map((s, i) => (<div className="story" key={`story-${i}}`}>
                    <p className="story-title">{s.title}</p>
                    <div className="block-paragraph" dangerouslySetInnerHTML={{ __html: s.text }}></div>
                    <hr style={{ margin: "2rem 40%", color: "#707070" }} />
                </div>))}
            </div>

            <div id="methodology" className="blog">
                <h2>Metodické poznámky</h2>
                <div className="block-paragraph" dangerouslySetInnerHTML={{ __html: dataProps.methodology }}></div>
            </div>
            {navigation}
        </Layout >
    )
}