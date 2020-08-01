import Chart from 'chart.js'
import { useEffect } from "react"
import ChartDataLabels from 'chartjs-plugin-datalabels';

function ChartComponent(props) {
    const instanceId = `chartInstance_${props.chartId}`;
    useEffect(() => {
        if (Window[instanceId]) {
            Window[instanceId].destroy();
        }
        var config = {
            type: props.type,
            data: props.data,
            options: props.options
        };
        var ctx = document.getElementById(instanceId).getContext('2d');
        Window[instanceId] = new Chart(ctx, config);
    });

    return (
        <div style={{ height: props.height }}>
            <canvas id={instanceId}></canvas>
        </div>
    );
}

export default ChartComponent;