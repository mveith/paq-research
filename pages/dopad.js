import fs from 'fs'
import path from 'path'
import Layout from '../components/layout';
import AreaChart from '../components/areaChart';
import { useState } from 'react';
import Link from 'next/link';

function ThemeNavigation() {
    return (
        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
            <div>
                <Link href="/destabilizace-prace">
                    <a>
                        <span>🠐</span><br />
                        <span>Předchozí téma</span><br />
                        <span>Destabilizace práce</span>
                    </a>
                </Link>
            </div>
            <div>
                <Link href="/">
                    <a>
                        <span>🠒</span><br />
                        <span>Další téma</span><br />
                        <span>Dopady a strategie domácnosti</span>
                    </a>
                </Link>
            </div>
        </div>);
}

export default function Impact(props) {
    const [annotation, setAnnotation] = useState();
    const [total, setTotal] = useState(true);
    const charts = props.groups.map((v, i) => {
        return (<AreaChart key={`impact-chart-${i}`} weeks={props.weeks} colors={props.colors} titles={props.titles} yMin={0} yMax={100} showYAxis={i % 3 === 0} showXAxis={false} values={v} size={[300, 200]} annotation={annotation} onHover={x => {
            if (x) {
                setAnnotation({ week: x.week, lineIndex: x.parentLine.key });
            }
            else { setAnnotation(); }
        }} />);
    });
    const totalChart = (<AreaChart key="impact-chart-total" weeks={props.weeks} colors={props.colors} titles={props.titles} yMin={0} yMax={100} showYAxis={true} showXAxis={true} values={props.total} size={[800, 600]} annotation={annotation} onHover={x => {
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
            <h1>Jaký má epidemie ekonomický dopad na domácnosti?</h1>
            <p>
                Ekonomické dopady na domácnosti se vyvíjejí - podle toho, jak lidé ztratili práci, či jim byla redukována mzda.
                Existuje malá velmi riziková skupina zasažená poklesem příjmů a zároveň bez úspor, která může mít velké ekonomické problémy brzy + skupina lehčeji zasažených lidí,
                která může měnit spotřební chování, či ji může krize dostihnout později.
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
                                <h2 style={{ color: "#b3b3b3" }}>V poho skupina</h2>
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
        props: JSON.parse(fileContent).impacts
    }
}
