import Head from 'next/head'
import fs from 'fs'
import path from 'path'
import dynamic from 'next/dynamic'

const Chart = dynamic(
    () => import('../components/chart'),
    { ssr: false }
)
function AreaChart(props) {
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
            fillOpacity: 0.8
        }),
        title: (
            <text textAnchor="middle">
                {values.title}
            </text>
        ),
        axes: [{ orient: "left", baseline: false, showOutboundTickLines: false, tickLineGenerator: e => null, tickFormat: function (e) { return e + "%" } }]
    };
    return <Chart {...frameProps} />;
}

export default function Layout(props) {
    const charts = props.groups.map(v => <AreaChart {...v} />);
    return (
        <div style={{ width: "100%", display: "flex", height: "100vh", fontFamily: "'Fira Sans', sans-serif" }}>
            <Head>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <link href="https://fonts.googleapis.com/css2?family=Fira+Sans&display=swap" rel="stylesheet" />
            </Head>
            <div style={{ flexShrink: "0", flexBasis: "12%", padding: "0 10px", margin: "0 1rem", display: "flex", flexDirection: "column" }}>
                <header>
                    <h1>život během pandemie</h1>
                    <span>O projektu</span>
                </header>
                <div style={{ display: "flex", flexDirection: "column", flex: 1, justifyContent: "space-between" }}>
                    <nav>
                        <div>
                            <h3>EKONOMICKÉ DOPADY</h3>
                            <ul>
                                <li>Destabilizace práce</li>
                                <li>Ekonomické dopady na domácnosti</li>
                                <li>Dopady a strategie domácnosti</li>
                            </ul>
                        </div>

                        <div>
                            <h3>CHOVÁNÍ A AKTIVITY</h3>
                            <ul>
                                <li>Celkový profil aktivit</li>
                                <li>Počet protektivních aktivit</li>
                                <li>Kontakt s lidmi</li>
                                <li>Pocity ohledně koronaviru</li>
                            </ul>
                        </div>
                    </nav>
                    <div>
                        <hr />
                        <p>výzkumné společnosti PAQ Research, iniciativa IDEA AntiCovid a data sbírá agentura NMS.</p>
                    </div>
                </div>
            </div>
            <div style={{ padding: "10px", margin: "1rem", display: "flex", flexDirection: "column" }}>
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
            </div>
        </div>
    )
}

export async function getStaticProps(context) {
    const filePath = path.join(process.cwd(), 'data.json');
    const fileContent = fs.readFileSync(filePath, 'utf8');
    return {
        props: JSON.parse(fileContent).impacts
    }
}
