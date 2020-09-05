import Layout from './layout';
import Chart from '../components/chart'
import { useState, useEffect } from 'react';
import Legend from '../components/legend';

function getSmallChartProps(dataProps, values, index, height, annotation, onHover, max, nonpercentage) {
    return {
        key: `chart-${index}`,
        weeks: dataProps.weeks,
        firstWeek: dataProps.firstWeek,
        colors: dataProps.colors,
        titles: dataProps.titles,
        yMin: 0,
        yMax: max ?? 100,
        showYAxis: true,
        showXAxis: false,
        values: values,
        size: [300, height],
        annotation: annotation,
        onHover: onHover,
        nonpercentage: nonpercentage,
        title: values.title
    };
}

function getBigChartProps(dataProps, height, annotation, onHover, max, nonpercentage) {
    return {
        key: "chart-total",
        weeks: dataProps.weeks,
        firstWeek: dataProps.firstWeek,
        colors: dataProps.colors,
        titles: dataProps.titles,
        yMin: 0,
        yMax: max ?? 100,
        showYAxis: true,
        showXAxis: true,
        values: dataProps.total,
        title: "",
        size: [800, height],
        annotation: annotation,
        onHover: onHover,
        nonpercentage: nonpercentage
    };
}

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
    const [annotation, setAnnotation] = useState();
    const [total, setTotal] = useState(true);
    const [height, setHeight] = useState(600);
    const [group, setGroup] = useState(0);
    const legend = {
        items: dataProps.titles.map((t, i) => { return { color: dataProps.legendColors[i], title: t, description: dataProps.legendItems[i] }; }),
        title: dataProps.legendTitle
    };

    const onHover = x => {
        if (x) {
            setAnnotation({ week: x.week, lineIndex: x.parentLine.key });
        }
        else { setAnnotation(); }
    };

    const chartType = asLineChart ? "line" : "stackedarea";
    const charts = dataProps.groups[group].data.map((v, i) => {
        return (<div className="chart-content"><Chart dataProps={getSmallChartProps(dataProps, v, i, height, annotation, onHover, max, nonpercentage)} chartType={chartType} /></div>);
    });
    const totalChart = (<div className="chart-content"><Chart dataProps={getBigChartProps(dataProps, height, annotation, onHover, max, nonpercentage)} chartType={chartType} /></div>);

    useEffect(() => {
        function handleResize() {
            var chart = document.getElementsByClassName('chart-content')[0];
            setHeight(chart.offsetWidth * 0.75);
        }

        handleResize();
        window.addEventListener('resize', handleResize)
    });
    const content = total ?
        (<>{totalChart}</>) :
        (<div className="multiple-charts-wrapper">{charts}</div>);

    return (
        <Layout title={title}>
            <h1>{title}</h1>
            <p>
                {description}
            </p>
            <div style={{ display: "flex", flexDirection: "column" }}>
                <p>Podívej se na <a href="#stories" className="arrow-button">interpretace dat a grafů↓</a> a <a href="#methodology" className="arrow-button">metodické poznámky↓</a></p>
                <div style={{ borderBottom: "1px solid #dee2e6", marginTop: "2rem" }}>
                    <ul style={{ listStyle: "none", display: "flex", margin: 0, padding: 0 }}>
                        <li className={"tab" + (total ? " tab-active" : "")}>
                            <a href="#" style={{ padding: ".5rem 1rem" }} onClick={e => setTotal(true)}>Souhrnné zobrazení</a>
                        </li>
                        <li className={"tab" + (!total ? " tab-active" : "")}>
                            <a href="#" style={{ padding: ".5rem 1rem" }} onClick={e => setTotal(false)}>Zobrazení podle skupin</a>
                        </li>
                    </ul>
                </div>
                {!total && <div style={{ display: "flex", flexDirection: "row", margin: "20px 0", flexWrap: "wrap" }}>
                    {dataProps.groups.map((g, i) => <GroupButton currentGroup={group} group={g} index={i} onChange={_ => setGroup(i)} />)}
                </div>}
                <div className="chart-wrapper">
                    <div className="chart" >{content}</div>
                    <div className="legend">
                        <Legend {...legend} />
                    </div>
                </div>
                {/* {navigation} */}
                <div id="stories" class="blog">
                    <h2>Co můžeme z dat pozorovat?</h2>
                    {dataProps.stories.map((s, i) => (<div className="story" key={`story-${i}}`}>
                        <p className="story-title">{s.title}</p>
                        <p className="story-date">{s.date}</p>
                        <div className="block-paragraph" dangerouslySetInnerHTML={{ __html: s.text }}></div>
                        <hr style={{ margin: "2rem 40%", color: "#707070" }} />
                    </div>))}
                </div>
                <div id="methodology" class="blog">
                    <h2>Metodické poznámky</h2>
                    <div className="block-paragraph" dangerouslySetInnerHTML={{ __html: dataProps.methodology }}></div>
                </div>
                {navigation}
            </div>
        </Layout>
    )
}