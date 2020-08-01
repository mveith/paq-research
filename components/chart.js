import Chart from 'chart.js'
import { useEffect } from "react"

function ChartComponent(props) {
    useEffect(() => {
        if (Window.chartInstance) {
            Window.chartInstance.destroy();
        }
        var config = {
            type: props.type,
            data: props.data,
            options: props.options
        };
        var ctx = document.getElementById('canvas').getContext('2d');
        Window.chartInstance = new Chart(ctx, config);
    });

    return <canvas id="canvas" width={props.width} height={props.height}></canvas>;
}

export default ChartComponent;