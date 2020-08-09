import Head from 'next/head';
import Link from 'next/link';

export default function Layout(props) {
    return (
        <div style={{ width: "100%", display: "flex", height: "100vh", fontFamily: "'Fira Sans', sans-serif" }}>
            <Head>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <link href="https://fonts.googleapis.com/css2?family=Fira+Sans&display=swap" rel="stylesheet" />
            </Head>
            <div style={{ flexShrink: "0", flexBasis: "12%", padding: "0 10px", margin: "0 1rem", display: "flex", flexDirection: "column" }}>
                <header>
                    <h1>život během pandemie</h1>
                    <span><Link href="/projekt"><a>O projektu</a></Link></span>
                </header>
                <div style={{ display: "flex", flexDirection: "column", flex: 1, justifyContent: "space-between" }}>
                    <nav>
                        <div>
                            <h3>EKONOMICKÉ DOPADY</h3>
                            <ul>
                                <li><Link href="/"><a>Destabilizace práce</a></Link></li>
                                <li><Link href="/dopad"><a>Ekonomické dopady na domácnosti</a></Link></li>
                                <li><Link href="/"><a>Dopady a strategie domácnosti</a></Link></li>
                            </ul>
                        </div>

                        <div>
                            <h3>CHOVÁNÍ A AKTIVITY</h3>
                            <ul>
                                <li><Link href="/"><a>Celkový profil aktivit</a></Link></li>
                                <li><Link href="/"><a>Počet protektivních aktivit</a></Link></li>
                                <li><Link href="/"><a>Kontakt s lidmi</a></Link></li>
                                <li><Link href="/"><a>Pocity ohledně koronaviru</a></Link></li>
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
                {props.children}
            </div>
        </div>
    )
}