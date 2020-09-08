import { useState } from 'react';
import Layout from './layout';
import ChartWrapper from './chartWrapper'
import ChartSettings from './chartSettings';

export default function DataPage({ navigation, dataProps, title, description, asLineChart, max, nonpercentage }) {
    const [total, setTotal] = useState(true);
    const [group, setGroup] = useState(0);

    const [openMenu, setOpenMenu] = useState(false);
    return (
        <Layout title={title} openMenu={openMenu} setOpenMenu={setOpenMenu}>
            <h1>{title}</h1>

            <p className="select-topic" ><a href="javascript:void(0);" className="arrow-button" onClick={e => setOpenMenu(!openMenu)}>Vybrat jiné téma</a></p>

            <p>{description}</p>

            <div style={{ display: "flex", flexDirection: "column" }}>
                <p>Podívej se na <a href="#stories" className="arrow-button">interpretace↓</a> a <a href="#methodology" className="arrow-button">metodické poznámky↓</a></p>

                <ChartSettings dataProps={dataProps} total={total} onTotalChange={setTotal} group={group} onGroupChange={setGroup} />

                <ChartWrapper dataProps={dataProps} asLineChart={asLineChart} max={max} nonpercentage={nonpercentage} group={group} total={total} />

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
            </div>
        </Layout >
    )
}