import dynamic from 'next/dynamic'

const Chart = dynamic(
    () => import('../components/chart'),
    { ssr: false }
)

function generateAnnotations(props) {
    if (props.annotation) {
        const values = props.values;
        const tooltipAnnotations = values.lines.map((l, i) => {
            return {
                type: "frame-hover",
                x: props.annotation.week,
                y: values.lines.slice(i).map(pl => pl[props.annotation.week - 1]).reduce((a, b) => a + b, 0),
                value: l[props.annotation.week - 1]
            };
        });
        return [{ type: "x", week: props.annotation.week, disable: ["connector", "note"] }].concat(tooltipAnnotations);

    }
    else return [];
}

function AreaChart(props) {
    const values = props.values;
    const lines = values.lines.map((l, li) => { return { coordinates: l.map((v, i) => { return { week: i + props.firstWeek, value: values.lines.slice(li).map(pl => pl[i]).reduce((a, b) => a + b, 0) }; }) }; });

    const annotations = generateAnnotations(props);

    const yAxis = props.showYAxis ?
        { orient: "left", tickValues: [0, 100], baseline: false, showOutboundTickLines: false, tickLineGenerator: e => null, tickFormat: function (e) { return e + "%" } } :
        { orient: "left", ticks: 0, baseline: false, showOutboundTickLines: false, tickLineGenerator: e => null, tickFormat: e => null };

    const xAxis = {
        orient: "bottom", showOutboundTickLines: true, ticks: props.weeks, tickFormat: (e => props.showXAxis ? `${e}.${e === 1 ? "vlna" : ""}` : null), tickLineGenerator: ({ xy }) => (
            <line
                key={`line-${xy.y1}-${xy.x1}`}
                x1={xy.x1}
                x2={xy.x2}
                y1={xy.y1}
                y2={xy.y2}
                style={{
                    strokeDasharray: "3 3",
                    stroke: "white",
                    strokeOpacity: 0.4
                }}
            />
        )
    };

    const frameProps = {
        lines: lines,
        size: props.size,
        margin: { left: 80, bottom: props.showXAxis ? 50 : 10, right: 10, top: 40 },

        lineType: "area",
        responsiveWidth: true,
        xAccessor: "week",
        yAccessor: "value",
        yExtent: [props.yMin, props.yMax],
        lineDataAccessor: "coordinates",

        lineStyle: (d, i) => ({
            fill: props.colors[i],
            fillOpacity: 1
        }),
        pointStyle: { fill: "none", stroke: "gray", strokeWidth: "1px" },
        title: (
            <text textAnchor="middle">
                {values.title}
            </text>
        ),
        axes: [yAxis, xAxis],
        hoverAnnotation: [
            { type: "x", disable: ["connector", "note"] },
        ],
        annotations: annotations,
        customHoverBehavior: x => props.onHover ? props.onHover(x) : null,
        tooltipContent: d => { return <div style={{ margin: "5px" }}>{d.value} %</div> }
    };
    return <Chart {...frameProps} />;
}

export default AreaChart;