import fs from 'fs'
import path from 'path'
import dynamic from 'next/dynamic'
import Layout from '../components/layout';
import { useState } from 'react';

const Chart = dynamic(
    () => import('../components/chart'),
    { ssr: false }
)
function ImpactChart(props) {
    const values = props.values;
    const lines = values.lines.map(l => { return { coordinates: l.map((v, i) => { return { week: i + 1, value: v }; }) }; });

    const tooltipAnnotations = props.annotation ? values.lines.map((l, i) => {
        return {
            type: "frame-hover",
            x: props.annotation,
            y: values.lines.slice(i).map(pl => pl[props.annotation - 1]).reduce((a, b) => a + b, 0)
        };
    }) : [];
    const annotations = [{ type: "x", week: props.annotation, disable: ["connector", "note"] }].concat(tooltipAnnotations);

    const yAxis = props.showYAxis ?
        { orient: "left", tickValues: [0, 100], baseline: false, showOutboundTickLines: false, tickLineGenerator: e => null, tickFormat: function (e) { return e + "%" } } :
        { orient: "left", ticks: 0, baseline: false, showOutboundTickLines: false, tickLineGenerator: e => null, tickFormat: e => null };

    const xAxis = {
        orient: "bottom", ticks: values.weeks, tickFormat: (e => props.showXAxis ? `${e}.${e === 1 ? "vlna" : ""}` : null), tickLineGenerator: ({ xy }) => (
            <line
                key={`line-${xy.y1}-${xy.x1}`}
                x1={xy.x1}
                x2={xy.x2}
                y1={xy.y1}
                y2={xy.y2}
                style={{
                    strokeDasharray: "5 5",
                    stroke: "gray",
                    strokeOpacity: 0.25
                }}
            />
        )
    };
    const frameProps = {
        lines: lines,
        size: props.size,
        margin: { left: 80, bottom: props.showXAxis ? 50 : 10, right: 10, top: 40 },

        lineType: "stackedarea",

        xAccessor: "week",
        yAccessor: "value",
        yExtent: [props.yMin, props.yMax],
        lineDataAccessor: "coordinates",

        lineStyle: (d, i) => ({
            fill: values.colors[i],
            fillOpacity: 1
        }),
        title: (
            <text textAnchor="middle">
                {values.title}
            </text>
        ),
        axes: [yAxis, xAxis],
        hoverAnnotation: [
            { type: "x", disable: ["connector", "note"] }
        ],
        annotations: annotations,
        customHoverBehavior: x => props.onHover ? props.onHover(x) : null,
        tooltipContent: (d => {
            return (
                <div className="tooltip-content">
                    <p>Bla</p>
                </div>);
        })
    };
    return <Chart {...frameProps} />;
}

export default function Home(props) {
    const [annotation, setAnnotation] = useState();
    const [total, setTotal] = useState(false);
    const charts = props.groups.map((v, i) => {
        return (<ImpactChart yMin={0} yMax={100} showYAxis={i % 3 === 0} showXAxis={false} values={v} size={[300, 200]} annotation={annotation} onHover={x => {
            if (x) {
                setAnnotation(x.week);
            }
            else { setAnnotation(); }
        }} />);
    });
    const totalChart = (<ImpactChart yMin={0} yMax={100} showYAxis={true} showXAxis={true} values={props.total} size={[800, 600]} />);
    const content = total ?
        (<div >{totalChart}</div>) :
        (<div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", }}>{charts}</div>);
    return (
        <Layout>
            <h1>Jaký má epidemie ekonomický dopad na domácnosti?</h1>
            <p>Ekonomické dopady na domácnosti se vyvíjejí - podle toho, jak lidé ztratili práci, či jim byla redukována mzda.
            Existuje malá velmi riziková skupina zasažená poklesem příjmů a zároveň bez úspor, která může mít velké ekonomické prolémy brzy + skupina lehčeji zasažených lidí,
            která může měnit spotřební chování, či ji může krize dostihnout později.
                </p>
            <div style={{ display: "flex", flexDirection: "row" }}>
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <div>
                        <input type="radio" id="total" name="total" value="total" checked={total} onChange={e => setTotal(true)} />
                        <label for="total">celkem</label>
                        <input type="radio" id="groups" name="groups" value="groups" checked={!total} onChange={e => setTotal(false)} />
                        <label for="groups">podle skupin</label>
                    </div>
                    {content}
                </div>
                <ul style={{ listStyle: "none", flexBasis: "20%" }}>
                    <li>
                        <h2 style={{ color: "rgb(129, 143, 233)" }}>V poho skupina</h2>
                        <p>V poho skupina</p>
                    </li>
                    <li>
                        <h2 style={{ color: "rgb(238, 190, 94)" }}>Lehce ekonomicky zasažení</h2>
                        <p>Jejich příjem klesl alespoň o 10% a mají úspory alespoň na půl roku</p>
                    </li>
                    <li>
                        <h2 style={{ color: "rgb(233, 129, 129)" }}>Těžce ekonoomicky zasažení</h2>
                        <p>Jejich příjem klesl o více než 30% a mají úspory maximálně na 2 měsíce</p>
                    </li>
                </ul>
            </div>
        </Layout>
    )
}

export async function getStaticProps(context) {
    const filePath = path.join(process.cwd(), 'data.json');
    const fileContent = fs.readFileSync(filePath, 'utf8');
    return {
        props: JSON.parse(fileContent).impacts
    }
}
