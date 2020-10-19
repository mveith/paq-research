import React from 'react';
import { scaleLinear } from '@visx/scale';

import { AreaStack } from '@visx/shape';

function Example({
    width,
    height,
    dataProps,
    margin = { top: 0, right: 0, bottom: 0, left: 0 }
}) {
    // bounds
    const yMax = height - margin.top - margin.bottom;
    const xMax = width - margin.left - margin.right;

    // scales
    const xScale = scaleLinear({
        range: [0, xMax],
        domain: [0, 12]
    });
    const yScale = scaleLinear({
        range: [yMax, 0],
    });

    const dataLines = dataProps.values.lines.reverse();
    const dataColors = dataProps.colors.reverse();
    const data = dataProps.ticks.map((t, i) => {
        const dataPoint = { index: i, label: t };
        for (let lineIndex = 0; lineIndex < dataLines.length; lineIndex++) {
            const dataLine = dataLines[lineIndex];
            dataPoint[`dataLine${lineIndex}`] = dataLine[i];
        }
        return dataPoint;
    });

    return width < 10 ? null : (
        <svg width={width} height={height}>
            <AreaStack
                top={margin.top}
                left={margin.left}
                keys={dataLines.map((l, i) => `dataLine${i}`)}
                data={data}
                x={d => xScale(d.data.index)}
                y0={d => yScale(d[0] / 100)}
                y1={d => yScale(d[1] / 100)}
                color={(key, index) => dataColors[index]}
            >
            </AreaStack>
        </svg>
    );
}
function ChartVisx({ dataProps, chartType, filter, highlightedLineIndex, lineStyles }) {
    return (
        <div>
            <h3 style={{ textAlign: "center", marginLeft: "50px", marginRight: "10px", textTransform: 'uppercase', height: dataProps.title ? "2rem" : 0, overflow: "hidden" }}>
                {dataProps.title}
            </h3>
            <h4 style={{ textAlign: "center", margin: "0", marginLeft: "50px", marginRight: "10px", fontSize: "0.85rem", fontWeight: "normal", }}>
                {dataProps.subtitle}
            </h4>
            <div> <Example width={917} height={550} dataProps={dataProps} /></div>
        </div>
    );
}
export default ChartVisx;