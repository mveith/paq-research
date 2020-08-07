import Head from 'next/head'

import dynamic from 'next/dynamic'

const Chart = dynamic(
    () => import('../components/chart'),
    { ssr: false }
)
function AreaChart(props) {
    const theme = ["#ac58e5", "#E0488B", "#9fd0cb", "#e0d33a", "#7566ff", "#533f82", "#7a255d", "#365350", "#a19a11", "#3f4482"]
    const frameProps = {
        /* --- Data --- */
        lines: [{
            title: "Ex", coordinates: [{ week: 1, grossWeekly: 327616, theaterCount: 4, theaterAvg: 81904, date: "2015-04-10", rank: 18 },
            { week: 2, grossWeekly: 1150814, theaterCount: 39, theaterAvg: 29508, date: "2015-04-17", rank: 15 },]
        },
        {
            title: "Far", coordinates: [{ week: 1, grossWeekly: 240160, theaterCount: 10, theaterAvg: 24016, date: "2015-05-01", rank: 24 },
            { week: 2, grossWeekly: 1090487, theaterCount: 99, theaterAvg: 11015, date: "2015-05-08", rank: 15 },]
        }],

        /* --- Size --- */
        size: [300, 200],
        margin: { left: 80, bottom: 10, right: 10, top: 40 },

        /* --- Layout --- */
        lineType: "area",

        /* --- Process --- */
        xAccessor: "week",
        yAccessor: "theaterCount",
        yExtent: [0],
        lineDataAccessor: "coordinates",

        /* --- Customize --- */
        lineStyle: (d, i) => ({
            stroke: theme[i],
            strokeWidth: 2,
            fill: theme[i],
            fillOpacity: 0.6
        }),
        title: (
            <text textAnchor="middle">
                TODO
            </text>
        ),
        axes: [{ orient: "left",  tickFormat: function (e) { return e + "%" } }]
    };
    return <Chart {...frameProps} />;
}

export default function Layout(props) {
    const charts = [0, 1, 2, 3, 4, 5].map(_ => <AreaChart />);
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