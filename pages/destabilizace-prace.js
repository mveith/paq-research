import fs from 'fs'
import path from 'path'
import dynamic from 'next/dynamic'
import Layout from '../components/layout';
import { useState } from 'react';
import Link from 'next/link';

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

function ThemeNavigation() {
    return (
        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
            <div>
                <Link href="/">
                    <a>
                        <span>🠐</span><br />
                        <span>Předchozí téma</span><br />
                        <span>Pocity ohledně koronaviru</span>
                    </a>
                </Link>
            </div>
            <div>
                <Link href="/dopad">
                    <a>
                        <span>🠒</span><br />
                        <span>Další téma</span><br />
                        <span>Ekonomické dopady na domácnosti</span>
                    </a>
                </Link>
            </div>
        </div>);
}

function ImpactChart(props) {
    const values = props.values;
    const lines = values.lines.map((l, li) => { return { coordinates: l.map((v, i) => { return { week: i + 1, value: values.lines.slice(li).map(pl => pl[i]).reduce((a, b) => a + b, 0) }; }) }; });

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

export default function Destabilization(props) {
    const [annotation, setAnnotation] = useState();
    const [total, setTotal] = useState(true);
    const charts = props.groups.map((v, i) => {
        return (<ImpactChart key={`impact-chart-${i}`} weeks={props.weeks} colors={props.colors} titles={props.titles} yMin={0} yMax={100} showYAxis={i % 3 === 0} showXAxis={false} values={v} size={[300, 200]} annotation={annotation} onHover={x => {
            if (x) {
                setAnnotation({ week: x.week, lineIndex: x.parentLine.key });
            }
            else { setAnnotation(); }
        }} />);
    });
    const totalChart = (<ImpactChart key="impact-chart-total" weeks={props.weeks} colors={props.colors} titles={props.titles} yMin={0} yMax={100} showYAxis={true} showXAxis={true} values={props.total} size={[800, 600]} annotation={annotation} onHover={x => {
        if (x) {
            setAnnotation({ week: x.week, lineIndex: x.parentLine.key });
        }
        else { setAnnotation(); }
    }} />);
    const content = total ?
        (<div >{totalChart}</div>) :
        (<div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", }}>{charts}</div>);
    return (
        <Layout>
            <h1>Jaký epidemie ovlivňuj destabilizaci práce?</h1>
            <p>
                Nárůst nezaměstnanosti byl relativně malý, ale ztrátu práce či její výraznou redukci zažilo vice lidí, než ukazují oficiální statistiky (OSVČ a DPP se často nehlásí na ÚP) a další drží Antivirus B v placené neaktivitě. Kromě toho jsou lidé, kterým byl nějak změněn úvazek či se výrazně obávají ztráty práce a jsou na pracovním trhu ohrožení.
            </p>
            <div style={{ display: "flex", flexDirection: "column" }}>
                <div>Podívej se na <a href="#stories" style={{ fontWeight: "600", textDecoration: "underline" }}>interpretace dat a grafů↓</a> a <a href="#methodology" style={{ fontWeight: "600", textDecoration: "underline" }}>metodické poznámky↓</a></div>
                <div>
                    <input type="radio" id="total" name="total" value="total" checked={total} onChange={e => setTotal(true)} />
                    <label htmlFor="total">celkem</label>
                    <input type="radio" id="groups" name="groups" value="groups" checked={!total} onChange={e => setTotal(false)} />
                    <label htmlFor="groups">podle skupin</label>
                </div>
                <div className="chart-wrapper">
                    <div className="chart">{content}</div>
                    <div className="legend">
                        <ul style={{ listStyle: "none", flexBasis: "20%" }}>
                            <li>
                                <h2 style={{ color: "#b3b3b3" }}>Zbytek</h2>
                                <p></p>
                            </li>
                            <li>
                                <h2 style={{ color: "rgb(238, 190, 94)" }}>desPra4_omezeni_domacnost</h2>
                                <p></p>
                            </li>
                            <li>
                                <h2 style={{ color: "green" }}>desPra3_podzamestnani_nestabilni</h2>
                                <p></p>
                            </li>
                            <li>
                                <h2 style={{ color: "blue" }}>desPra2_prekarizace</h2>
                                <p></p>
                            </li>
                            <li>
                                <h2 style={{ color: "rgb(233, 129, 129)" }}>desPra1_celkova_ztrata_prace</h2>
                                <p></p>
                            </li>
                        </ul>
                    </div>
                </div>
                <ThemeNavigation />
                <div id="stories">
                    <h2>Interpretace a další story</h2>
                    {props.stories.map((s, i) => (<div class="story" key={`story-${i}}`}>
                        <p style={{ fontSize: 16, color: "#B3B3B3" }}>{s.date}</p>
                        <p style={{ fontSize: 20, fontWeight: "medium", color: "#545454" }}>{s.title}</p>
                        <p style={{ fontSize: 16, fontWeight: "medium", color: "#545454" }} dangerouslySetInnerHTML={{ __html: s.text }}></p>
                    </div>))}
                </div>
                <div id="methodology">
                    <h2>Metodické poznámky</h2>
                    <p style={{ fontSize: 16, fontWeight: "medium", color: "#545454" }} dangerouslySetInnerHTML={{ __html: props.methodology }}></p>
                </div>
                <ThemeNavigation />
            </div>
        </Layout>
    )
}

export async function getStaticProps(context) {
    const filePath = path.join(process.cwd(), 'data.json');
    const fileContent = fs.readFileSync(filePath, 'utf8');
    return {
        props: JSON.parse(fileContent).destabilization
    }
}
