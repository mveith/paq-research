import Layout from './layout';
import AreaChart from './areaChart';
import { useState } from 'react';

export default function DataPage({ navigation, dataProps, title, description, legend }) {
    const [annotation, setAnnotation] = useState();
    const [total, setTotal] = useState(true);
    const charts = dataProps.groups.map((v, i) => {
        return (<AreaChart key={`chart-${i}`} weeks={dataProps.weeks} colors={dataProps.colors} titles={dataProps.titles} yMin={0} yMax={100} showYAxis={true} showXAxis={false} values={v} size={[300, 200]} annotation={annotation} onHover={x => {
            if (x) {
                setAnnotation({ week: x.week, lineIndex: x.parentLine.key });
            }
            else { setAnnotation(); }
        }} />);
    });
    const totalChart = (<AreaChart key="chart-total" weeks={dataProps.weeks} colors={dataProps.colors} titles={dataProps.titles} yMin={0} yMax={100} showYAxis={true} showXAxis={true} values={dataProps.total} size={[800, 600]} annotation={annotation} onHover={x => {
        if (x) {
            setAnnotation({ week: x.week, lineIndex: x.parentLine.key });
        }
        else { setAnnotation(); }
    }} />);
    const content = total ?
        (<div >{totalChart}</div>) :
        (<div className="multiple-charts-wrapper">{charts}</div>);
    return (
        <Layout>
            <h1>{title}</h1>
            <p>
                {description}
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
                        {legend}
                    </div>
                </div>
                {navigation}
                <div id="stories">
                    <h2>Interpretace a další story</h2>
                    {dataProps.stories.map((s, i) => (<div class="story" key={`story-${i}}`}>
                        <p style={{ fontSize: 16, color: "#B3B3B3" }}>{s.date}</p>
                        <p style={{ fontSize: 20, fontWeight: "medium", color: "#545454" }}>{s.title}</p>
                        <p style={{ fontSize: 16, fontWeight: "medium", color: "#545454" }} dangerouslySetInnerHTML={{ __html: s.text }}></p>
                    </div>))}
                </div>
                <div id="methodology">
                    <h2>Metodické poznámky</h2>
                    <p style={{ fontSize: 16, fontWeight: "medium", color: "#545454" }} dangerouslySetInnerHTML={{ __html: dataProps.methodology }}></p>
                </div>
                {navigation}
            </div>
        </Layout>
    )
}