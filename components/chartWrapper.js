import Chart from '../components/chart'
import { useState, useEffect } from 'react';
import Legend from '../components/legend';

function getSmallChartProps(dataProps, values, index, height, annotation, onHover) {
    return {
        key: `chart-${index}`,
        weeks: dataProps.weeks,
        firstWeek: dataProps.firstWeek,
        colors: dataProps.colors,
        titles: dataProps.titles,
        yMin: 0,
        yMax: dataProps.yMax ?? 100,
        showYAxis: true,
        values: values,
        size: [300, height],
        annotation: annotation,
        onHover: onHover,
        nonpercentage: !dataProps.percentage,
        title: values.title,
        ticks: dataProps.ticks,
        subtitle: values.subtitle
    };
}

function getBigChartProps(dataProps, height, annotation, onHover) {
    return {
        key: "chart-total",
        weeks: dataProps.weeks,
        firstWeek: dataProps.firstWeek,
        colors: dataProps.colors,
        titles: dataProps.titles,
        yMin: 0,
        yMax: dataProps.yMax ?? 100,
        showYAxis: true,
        values: dataProps.total,
        title: "",
        size: [800, height],
        annotation: annotation,
        onHover: onHover,
        nonpercentage: !dataProps.percentage,
        ticks: dataProps.ticks,
        yLabel: dataProps.yLabel
    };
}

export default function ChartWrapper({ dataProps, group, total, filter }) {
    const [annotation, setAnnotation] = useState();
    const [height, setHeight] = useState(600);
    const [highlightedLineIndex, sethighlightedLineIndex] = useState();
    const legend = {
        items: dataProps.titles.map((t, i) => { return { color: dataProps.legendColors[i], title: t, description: dataProps.legendItems[i] }; }).filter((t, i) => filter ? filter.includes(i) : true),
        title: dataProps.legendTitle,
        onHover: dataProps.asLineChart ? i => sethighlightedLineIndex(i) : _ => { },
        highlightedLineIndex: highlightedLineIndex,
        highlightingEnabled: dataProps.asLineChart,
        lineStyles: dataProps.lineStyles
    };

    const onHover = x => {
        if (x) {
            setAnnotation({ week: x.week, lineIndex: x.parentLine.key });
        }
        else { setAnnotation(); }
    };

    const chartType = dataProps.asLineChart ? "line" : "stackedarea";
    const charts = dataProps.groups[group].data.map((v, i) => {
        return (<div className="chart-content"><Chart key={`chart-${i + (highlightedLineIndex ? `-${highlightedLineIndex}` : "")}`} lineStyles={dataProps.lineStyles} dataProps={getSmallChartProps(dataProps, v, i, height, annotation, onHover)} chartType={chartType} filter={filter} highlightedLineIndex={highlightedLineIndex} /></div>);
    });
    const totalChart = (<div className="chart-content"><Chart key={`chart-${highlightedLineIndex ?? ""}`} lineStyles={dataProps.lineStyles} dataProps={getBigChartProps(dataProps, height, annotation, onHover)} chartType={chartType} filter={filter} highlightedLineIndex={highlightedLineIndex} /></div>);

    useEffect(() => {
        function handleResize() {
            var chart = document.getElementsByClassName('chart-content')[0];
            setHeight(chart.offsetWidth * 0.6);
        }

        handleResize();
        window.addEventListener('resize', handleResize)
    });
    const content = total ?
        (<>{totalChart}</>) :
        (<div className="multiple-charts-wrapper">{charts}</div>);

    return (<div className="chart-wrapper">
        <div className="chart" >{content}</div>
        <Legend {...legend} />
    </div>);
}
