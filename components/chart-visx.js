import React, { useCallback } from 'react';
import { scaleLinear } from '@visx/scale';

import { AreaStack, Line } from '@visx/shape';
import {
    Tooltip,
    TooltipWithBounds,
    useTooltip,
    defaultStyles,
} from '@visx/tooltip';
import { localPoint } from '@visx/event';
import { max, extent, bisector } from 'd3-array';


export const accentColorDark = '#75daad';
function TooltipItem({ color, value, index }) {
    return (<div key={`tooltip_line_${index}`} style={{ position: "relative", display: "block", textAlign: "left" }}>
        <p
            key={`tooltip_color_${index}`}
            style={{ width: "10px", height: "10px", backgroundColor: color, display: "inline-block", position: "absolute", top: "8px", left: "0", margin: "0" }}
        />
        <p key={`tooltip_p_val_${index}`} style={{ display: "inline-block", fontWeight: "bold", margin: "0 5px 0 15px", fontSize: "0.8rem" }}>
            {value}
        </p>
    </div>);
}

function Example({
    width,
    height,
    dataProps,
    dataLines,
    dataColors,
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

    const data = dataProps.ticks.map((t, i) => {
        const dataPoint = { index: i, label: t };
        dataPoint.values = dataLines.map(d => d[i]);
        dataPoint.aggValues = dataLines.map((d, di) => d[i] + dataLines.slice(0, di).map(q => q[i]).reduce((a, b) => a + b, 0));
        for (let lineIndex = 0; lineIndex < dataLines.length; lineIndex++) {
            const dataLine = dataLines[lineIndex];
            dataPoint[`dataLine${lineIndex}`] = dataLine[i];
            dataPoint[`aggDataLine${lineIndex}`] = dataLines.slice(0, lineIndex + 1).map(pl => pl[i]).reduce((a, b) => a + b, 0);
        }
        return dataPoint;
    });

    const {
        showTooltip,
        tooltipData,
        tooltipTop,
        tooltipLeft,
    } = useTooltip({
        margin: { top: 0, right: 0, bottom: 0, left: 0 },
        tooltipTop: 0,
        tooltipLeft: 0,
    });

    const handleTooltip = useCallback(
        (event) => {
            const { x, y } = localPoint(event) || { x: 0, y: 0 };
            const xData = xScale.invert(x);
            const yData = yScale.invert(y);
            const bisect = bisector(x => x.index).left;
            const bisectY = bisector(x => x).left;
            const index = bisect(data, xData, 1);
            const orderedValues = data[index].aggValues.map(v => v / 100);
            const indexY = bisectY(orderedValues, yData, 1);
            orderedValues.sort();
            let tooltip = {
                tooltipData: data[index],
                tooltipLeft: xScale(index),
                tooltipTop: yScale(orderedValues[indexY - 1]),
            };
            showTooltip(tooltip);
        },
        [showTooltip],
    );
    const keys = dataLines.map((l, i) => `dataLine${i}`);
    const aggKeys = dataLines.map((l, i) => `aggDataLine${i}`);
    return width < 10 ? null : (
        <div style={{ position: "relative", width: "inherit", height: "inherit" }}>
            <svg width={width} height={height}
                onTouchStart={handleTooltip}
                onTouchMove={handleTooltip}
                onMouseMove={handleTooltip}>
                <AreaStack
                    top={margin.top}
                    left={margin.left}
                    keys={keys}
                    data={data}
                    x={d => xScale(d.data.index)}
                    y0={d => yScale(d[0] / 100)}
                    y1={d => yScale(d[1] / 100)}
                    color={(key, index) => dataColors[index]}
                >
                </AreaStack>

                {tooltipData && (
                    <g>
                        <Line
                            from={{ x: tooltipLeft, y: margin.top }}
                            to={{ x: tooltipLeft, y: yMax + margin.top }}
                            stroke={accentColorDark}
                            strokeWidth={2}
                            pointerEvents="none"
                            strokeDasharray="5,2"
                        />
                        {aggKeys.map((k, i) => {
                            return <><circle
                                cx={tooltipLeft}
                                cy={yScale(tooltipData[k] / 100) + 1}
                                r={4}
                                fill="black"
                                fillOpacity={0.1}
                                stroke="black"
                                strokeOpacity={0.1}
                                strokeWidth={2}
                                pointerEvents="none"
                            />
                                <circle
                                    cx={tooltipLeft}
                                    cy={yScale(tooltipData[k] / 100)}
                                    r={4}
                                    fill={accentColorDark}
                                    stroke="white"
                                    strokeWidth={2}
                                    pointerEvents="none"
                                /></>;
                        })}
                    </g>
                )}
            </svg>
            {tooltipData && (
                <div>
                    <TooltipWithBounds
                        key={Math.random()}
                        top={tooltipTop}
                        left={tooltipLeft}
                        style={defaultStyles}
                    >
                        <div key={"header_multi"} style={{ fontWeight: "bold", borderBottom: "thin solid black", marginBottom: "10px", textAlign: "center" }}>
                            {tooltipData.label}
                        </div>

                        {keys.map((k,i) => <TooltipItem value={`${tooltipData[k]} %`} index={i}  color={dataColors[i]} />).reverse()}
                    </TooltipWithBounds>
                </div>
            )}
        </div>
    );
}
function ChartVisx({ dataProps, chartType, filter, highlightedLineIndex, lineStyles }) {
    const dataLines = Array.from(dataProps.values.lines);
    const dataColors = Array.from(dataProps.colors);
    dataLines.reverse();
    dataColors.reverse();
    return (
        <div>
            <h3 style={{ textAlign: "center", marginLeft: "50px", marginRight: "10px", textTransform: 'uppercase', height: dataProps.title ? "2rem" : 0, overflow: "hidden" }}>
                {dataProps.title}
            </h3>
            <h4 style={{ textAlign: "center", margin: "0", marginLeft: "50px", marginRight: "10px", fontSize: "0.85rem", fontWeight: "normal", }}>
                {dataProps.subtitle}
            </h4>
            <div> <Example width={917} height={550} dataProps={dataProps} dataLines={dataLines} dataColors={dataColors} /></div>
        </div>
    );
}
export default ChartVisx;