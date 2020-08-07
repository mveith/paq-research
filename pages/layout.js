import Head from 'next/head'

export default function Test(props) {
    return (
        <div style={{ width: "100%", display: "flex", height: "100vh", fontFamily: "'Fira Sans', sans-serif" }}>
            <Head>
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
            <div style={{ padding: "10px", margin: "1rem" }}>
                <h1>Jaký má epidemie ekonomický dopad na domácnosti?</h1>
                <p>Ekonomické dopady na domácnosti se vyvíjejí - podle toho, jak lidé ztratili práci, či jim byla redukována mzda.
                Existuje malá velmi riziková skupina zasažená poklesem příjmů a zároveň bez úspor, která může mít velké ekonomické prolémy brzy + skupina lehčeji zasažených lidí,
                která může měnit spotřební chování, či ji může krize dostihnout později.
                </p>
                <p><img src="/charts.png" alt="charts" width="1500px"/></p>
            </div>
        </div>
    )
}