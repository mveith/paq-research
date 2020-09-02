import Layout from './layout';
import AreaChart from './areaChart';
import LineChart from './lineChart';
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
        nonpercentage: nonpercentage
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
        size: [800, height],
        annotation: annotation,
        onHover: onHover,
        nonpercentage: nonpercentage
    };
}

function Chart({ chartProps, asLineChart }) {
    if (asLineChart) {
        return <LineChart {...chartProps} />;
    }
    return <AreaChart {...chartProps} />;
}

export default function DataPage({ navigation, dataProps, title, description, asLineChart, max, nonpercentage }) {
    const [annotation, setAnnotation] = useState();
    const [total, setTotal] = useState(true);
    const [height, setHeight] = useState(600);
    const legend = {
        items: dataProps.titles.map((t, i) => { return { color: dataProps.legendColors[i], title: t, description: dataProps.legendItems[i] }; })
    };

    const onHover = x => {
        if (x) {
            setAnnotation({ week: x.week, lineIndex: x.parentLine.key });
        }
        else { setAnnotation(); }
    };

    const charts = dataProps.groups.map((v, i) => {
        return (<div className="chart-content"><Chart chartProps={getSmallChartProps(dataProps, v, i, height, annotation, onHover, max, nonpercentage)} asLineChart={asLineChart} /></div>);
    });
    const totalChart = (<div className="chart-content"><Chart chartProps={getBigChartProps(dataProps, height, annotation, onHover, max, nonpercentage)} asLineChart={asLineChart} /></div>);

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
        <Layout>
            <h1>{title}</h1>
            <p>
                {description}
            </p>
            <div style={{ display: "flex", flexDirection: "column" }}>
                <p>Podívej se na <a href="#stories" class="arrow-button">interpretace dat a grafů↓</a> a <a href="#methodology" class="arrow-button">metodické poznámky↓</a></p>
                <div>
                    <input type="radio" id="total" name="total" value="total" checked={total} onChange={e => setTotal(true)} />
                    <label htmlFor="total">celkem</label>
                    <input type="radio" id="groups" name="groups" value="groups" checked={!total} onChange={e => setTotal(false)} />
                    <label htmlFor="groups">podle skupin</label>
                </div>
                <div className="chart-wrapper">
                    <div className="chart" >{content}</div>
                    <div className="legend">
                        <Legend {...legend} />
                    </div>
                </div>
                {navigation}
                <div id="stories">
                    <h2>Interpretace a další story</h2>
                    {dataProps.stories.map((s, i) => (<div class="story" key={`story-${i}}`}>
                        <p className="story-title">{s.title}</p>
                        <p className="story-date">{s.date}</p>
                        <p className="block-paragraph" dangerouslySetInnerHTML={{ __html: s.text }}></p>
                        <hr style={{ margin: "2rem 40%", color: "#707070" }} />
                    </div>))}
                </div>
                <div id="methodology">
                    <h2>Metodické poznámky</h2>
                    <p className="block-paragraph" dangerouslySetInnerHTML={{ __html: dataProps.methodology }}></p>
                </div>
                {navigation}
            </div>
        </Layout>
    )
}