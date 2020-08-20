import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

const menuItemStyle = { color: "gray" };
const activeMenuItemStyle = { color: "black" };
const navbarItemStyle = {
    color: "#707070",
    padding: "14px 16px"
};

function ActiveLink({ children, href, style, activeStyle }) {
    const router = useRouter()
    const isActive = router.pathname === href && router.pathname !== "/";
    return (<Link href={href}><a style={isActive ? activeStyle : style}>{children}</a></Link>);
}


export default function Layout(props) {
    return (
        <>
            <nav style={{ overflow: "hidden", backgroundColor: "#F4F4F4", position: "fixed", top: "0", width: "100%", height: "50px", display: "flex", justifyContent: "right" }}>
                <Link href="/"><a style={navbarItemStyle}>Život během pandemie</a></Link>
                <Link href="/projekt"><a style={navbarItemStyle}>O projektu</a></Link>
                <Link href="/projekt"><a style={navbarItemStyle}>Kontakt</a></Link>
            </nav>
            <div className="main-wrapper" style={{ marginTop: "50px", }}>
                <Head>
                    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                    <link href="https://fonts.googleapis.com/css2?family=Fira+Sans&display=swap" rel="stylesheet" />
                </Head>
                <div className="side-menu">
                    <header>
                        <Link href="/"><a><h1>život během pandemie</h1></a></Link>
                    </header>
                    <div className="main-menu">
                        <nav>
                            <div>
                                <h3>EKONOMICKÉ DOPADY</h3>
                                <ul>
                                    <li><ActiveLink href="/destabilizace-prace" style={menuItemStyle} activeStyle={activeMenuItemStyle}>Destabilizace práce</ActiveLink></li>
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
                <div className="content-wrapper">
                    {props.children}
                </div>
                <div className="main-footer">
                    <hr />
                    <p>výzkumné společnosti PAQ Research, iniciativa IDEA AntiCovid a data sbírá agentura NMS.</p>
                </div>
            </div>
        </>
    )
}