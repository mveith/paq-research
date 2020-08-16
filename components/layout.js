import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

const menuItemStyle = { color: "gray" };
const activeMenuItemStyle = { color: "black" };

function ActiveLink({ children, href, style, activeStyle }) {
    const router = useRouter()
    const isActive = router.pathname === href && router.pathname !== "/";
    return (<Link href={href}><a style={isActive ? activeStyle : style}>{children}</a></Link>);
}

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
                    <span><ActiveLink href="/projekt" style={menuItemStyle} activeStyle={activeMenuItemStyle}>O projektu</ActiveLink></span>
                </header>
                <div style={{ display: "flex", flexDirection: "column", flex: 1, justifyContent: "space-between" }}>
                    <nav>
                        <div>
                            <h3>EKONOMICKÉ DOPADY</h3>
                            <ul>
                                <li><ActiveLink href="/" style={menuItemStyle} activeStyle={activeMenuItemStyle}>Destabilizace práce</ActiveLink></li>
                                <li><ActiveLink href="/dopad" style={menuItemStyle} activeStyle={activeMenuItemStyle}>Ekonomické dopady na domácnosti</ActiveLink></li>
                                <li><ActiveLink href="/" style={menuItemStyle} activeStyle={activeMenuItemStyle}>Dopady a strategie domácnosti</ActiveLink></li>
                            </ul>
                        </div>

                        <div>
                            <h3>CHOVÁNÍ A AKTIVITY</h3>
                            <ul>
                                <li><ActiveLink href="/" style={menuItemStyle} activeStyle={activeMenuItemStyle}>Celkový profil aktivit</ActiveLink></li>
                                <li><ActiveLink href="/" style={menuItemStyle} activeStyle={activeMenuItemStyle}>Počet protektivních aktivit</ActiveLink></li>
                                <li><ActiveLink href="/" style={menuItemStyle} activeStyle={activeMenuItemStyle}>Kontakt s lidmi</ActiveLink></li>
                                <li><ActiveLink href="/" style={menuItemStyle} activeStyle={activeMenuItemStyle}>Pocity ohledně koronaviru</ActiveLink></li>
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