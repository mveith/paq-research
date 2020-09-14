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
        values: values,
        size: [300, height],
        annotation: annotation,
        onHover: onHover,
        nonpercentage: nonpercentage,
        title: values.title,
        ticks: dataProps.ticks,
        subtitle: values.subtitle
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
        values: dataProps.total,
        title: "",
        size: [800, height],
        annotation: annotation,
        onHover: onHover,
        nonpercentage: nonpercentage,
        ticks: dataProps.ticks,
        yLabel: dataProps.yLabel
    };
}

export default function ChartWrapper({ dataProps, asLineChart, max, nonpercentage, group, total }) {
    const [annotation, setAnnotation] = useState();
    const [height, setHeight] = useState(600);
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
        <div className="legend">
            <Legend {...legend} />
        </div>
    </div>);
}
