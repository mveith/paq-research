import Layout from './layout';
import ChartWrapper from '../components/chartWrapper'
import { useState } from 'react';

function GroupButton({ currentGroup, group, index, onChange }) {
    const id = `group-${index}`;
    return (<>
        <label htmlFor={id} style={{ cursor: "pointer" }} >
            <input type="radio" id={id} name={id} value={id} checked={currentGroup === index} onChange={onChange} style={{ appearance: "none", MozAppearance: "none", WebkitAppearance: "none" }} />
            <span style={{ display: "inline-flex", flexDirection: "column", opacity: currentGroup === index ? "1" : 0.4, width: "135px", margin: "0rem .3rem", textAlign: "center", fontSize: ".9rem" }} className="noselect">
                <img src={group.image} width="60" style={{ margin: "0 auto", opacity: .4 }} />
                {group.title}
            </span>
        </label>
    </>);

}

export default function DataPage({ navigation, dataProps, title, description, asLineChart, max, nonpercentage }) {
    const [total, setTotal] = useState(true);
    const [group, setGroup] = useState(0);

    const [openMenu, setOpenMenu] = useState(false);
    return (
        <Layout title={title} openMenu={openMenu} setOpenMenu={setOpenMenu}>
            <h1>{title}</h1>
            <p className="select-topic" ><a href="javascript:void(0);" className="arrow-button" onClick={e => setOpenMenu(!openMenu)}>Vybrat jiné téma</a></p>
            <p>
                {description}
            </p>
            <div style={{ display: "flex", flexDirection: "column" }}>
                <p>Podívej se na <a href="#stories" className="arrow-button">interpretace↓</a> a <a href="#methodology" className="arrow-button">metodické poznámky↓</a></p>
                <div style={{ borderBottom: "1px solid #273E47", marginTop: "2rem" }}>
                    <ul style={{ listStyle: "none", display: "flex", margin: 0, padding: 0 }}>
                        <li className={"tab" + (total ? " tab-active" : "")}>
                            <a href="javascript:void(0);" onClick={e => setTotal(true)}>Souhrnné zobrazení</a>
                        </li>
                        <li className={"tab" + (!total ? " tab-active" : "")}>
                            <a href="javascript:void(0);" onClick={e => setTotal(false)}>Jak si vedou různé skupiny obyvatel?</a>
                        </li>
                    </ul>
                </div>
                {!total && <div style={{ display: "flex", flexDirection: "row", margin: "20px 0", flexWrap: "wrap" }}>
                    {dataProps.groups.map((g, i) => <GroupButton currentGroup={group} group={g} index={i} onChange={_ => setGroup(i)} />)}
                </div>}
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