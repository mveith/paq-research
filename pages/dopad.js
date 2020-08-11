import fs from 'fs'
import path from 'path'
import dynamic from 'next/dynamic'
import Layout from '../components/layout';

const Chart = dynamic(
    () => import('../components/chart'),
    { ssr: false }
)
function ImpactChart(props) {
    const values = props;
    const lines = values.lines.map(l => { return { coordinates: l.map((v, i) => { return { week: i + 1, value: v }; }) }; });

    const frameProps = {
        lines: lines,

        size: [300, 200],
        margin: { left: 80, bottom: 10, right: 10, top: 40 },

        lineType: "stackedarea",

        xAccessor: "week",
        yAccessor: "value",
        yExtent: [0, 50],
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
        axes: [
            {
                orient: "left", baseline: false, showOutboundTickLines: false, tickLineGenerator: e => null, tickFormat: function (e) { return e + "%" }
            },
            {
                orient: "bottom", ticks: values.weeks, tickLineGenerator: ({ xy }) => (
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
            }
        ],
        hoverAnnotation: [
            { type: "x", disable: ["connector", "note"] }
        ]
    };
    return <Chart {...frameProps} />;
}

export default function Home(props) {
    const charts = props.groups.map(v => <ImpactChart {...v} />);
    return (
        <Layout>
            <h1>Jaký má epidemie ekonomický dopad na domácnosti?</h1>
            <p>Ekonomické dopady na domácnosti se vyvíjejí - podle toho, jak lidé ztratili práci, či jim byla redukována mzda.
            Existuje malá velmi riziková skupina zasažená poklesem příjmů a zároveň bez úspor, která může mít velké ekonomické prolémy brzy + skupina lehčeji zasažených lidí,
            která může měnit spotřební chování, či ji může krize dostihnout později.
                </p>
            <div style={{ display: "flex", flexDirection: "row" }}>
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <div style={{ display: "flex", flexDirection: "row" }}>
                        <div style={{ margin: "0 20px" }}>
                            <button className="button button-left">souhrnný ukazatel</button>
                            <button className="button button-right">jednotlivé ukazatele</button>
                        </div>

                        <div style={{ margin: "0 20px" }}>
                            <button className="button button-left">celkem</button>
                            <button className="button button-right">podle skupin</button>
                        </div>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", }}>{charts}</div>
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
