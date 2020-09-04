import dynamic from 'next/dynamic'

const ResponsiveXYFrame = dynamic(
    () => import('semiotic/lib/ResponsiveXYFrame'),
    { ssr: false }
)

function TickLine({ xy }) {
    return (<line
        key={`line-${xy.y1}-${xy.x1}`}
        x1={xy.x1}
        x2={xy.x2}
        y1={xy.y1}
        y2={xy.y2}
        style={{
            strokeDasharray: "3 3",
            stroke: "#CDCDCD",
            strokeOpacity: 0.4
        }}
    />)
}

function getYAxis(props) {
    const step = (props.yMax - props.yMin) / 5;
    const yAxisTicks = Array.from(new Array(5 + 1), (x, i) => props.yMin + (i * step));
    if (!props.showYAxis) {
        return { orient: "left", ticks: 0, baseline: false, showOutboundTickLines: false, tickLineGenerator: e => null, tickFormat: e => null };
    }

    const getTickValue = e => {
        if (e === props.yMin || e === props.yMax) {
            return e + (props.nonpercentage ? "" : "%");
        }
        return null;
    };
    return {
        orient: "left",
        tickValues: yAxisTicks,
        baseline: false,
        showOutboundTickLines: false,
        tickLineGenerator: ({ xy }) => (<TickLine xy={xy} />),
        tickFormat: getTickValue
    };
}

function getXAxis(props) {
    const getTickValue = e => props.showXAxis ? `${e}.${e === props.firstWeek ? "vlna" : ""}` : null;
    return {
        orient: "bottom",
        showOutboundTickLines: true,
        ticks: props.weeks,
        tickFormat: getTickValue,
        tickLineGenerator: ({ xy }) => (<TickLine xy={xy} />)
    };
}

function generateAnnotations(props, stacked) {
    if (props.annotation) {
        const values = props.values;
        const tooltipAnnotations = values.lines.map((l, i) => {
            return {
                type: "frame-hover",
                x: props.annotation.week,
                y: stacked ? values.lines.slice(i).map(pl => pl[props.annotation.week - props.firstWeek]).reduce((a, b) => a + b, 0) : l[props.annotation.week - props.firstWeek],
                value: l[props.annotation.week - props.firstWeek]
            };
        });
        return [{ type: "x", week: props.annotation.week, disable: ["connector", "note"] }].concat(tooltipAnnotations);

    }
    else return [];
}

function Chart({ dataProps, chartType }) {
    const values = dataProps.values;
    const stacked = chartType === "stackedarea";
    const lines =
        stacked
            ? values.lines.map((l, li) => { return { coordinates: l.map((v, i) => { return { week: i + dataProps.firstWeek, value: values.lines.slice(li).map(pl => pl[i]).reduce((a, b) => a + b, 0) }; }) }; })
            : values.lines.map((l, li) => { return { coordinates: l.map((v, i) => { return { week: i + dataProps.firstWeek, value: l[i] }; }) }; });

    const annotations = generateAnnotations(dataProps, stacked);

    const lineType = chartType === "stackedarea" ? "area" : undefined;
    const lineStyle = (d, i) => {
        return chartType === "stackedarea" ? {
            fill: dataProps.colors[i],
            fillOpacity: 1
        } : {
                stroke: dataProps.colors[i],
                strokeWidth: 2,
                fill: "none"
            };
    };

    const frameProps = {
        lines: lines,
        size: dataProps.size,
        margin: { left: 50, bottom: dataProps.showXAxis ? 50 : 10, right: 10, top: 10 },

        lineType: lineType,
        responsiveWidth: true,
        xAccessor: "week",
        yAccessor: "value",
        yExtent: [dataProps.yMin, dataProps.yMax],
        lineDataAccessor: "coordinates",

        lineStyle: lineStyle,
        pointStyle: { fill: "none", stroke: "gray", strokeWidth: "1px" },
        axes: [getYAxis(dataProps), getXAxis(dataProps)],
        hoverAnnotation: [
            { type: "x", disable: ["connector", "note"] },
        ],
        annotations: annotations,
        customHoverBehavior: x => dataProps.onHover ? dataProps.onHover(x) : null,
        tooltipContent: d => { return <div style={{ margin: "5px" }}>{d.value}{dataProps.nonpercentage ? "" : " %"}</div> }
    };
    return (
        <div>
            <p style={{ textAlign: "center", marginLeft: "50px", marginRight: "10px", fontSize: "1rem", lineHeight: "1rem", height: dataProps.title ? "2rem" : 0 }}>
                {dataProps.title}
            </p>
            <div><ResponsiveXYFrame {...frameProps} /></div>
        </div>
    );
}
export default Chart;