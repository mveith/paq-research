import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

const menuItemStyle = { color: "#888" };
const activeMenuItemStyle = { color: "black", fontWeight: "bold" };
const navbarItemStyle = {
    color: "#707070"
};
const navbarItemStylePadding = {
    ...navbarItemStyle,
    padding: "14px 16px"
};

function ActiveLink({ children, href, style, activeStyle }) {
    const router = useRouter()
    const isActive = router.pathname === href && router.pathname !== "/";
    return (<Link href={href}><a style={isActive ? activeStyle : style}>{children}</a></Link>);
}

export default function Layout(props) {
    const [openMenu, setOpenMenu] = useState(false);

    const menu = (
        <>
            <div style={{ marginTop: "4rem"}}>
                <h3>EKONOMICKÉ DOPADY</h3>
                <ul>
                {/* <ul style={{ listStyle: "none" }}> */}
                    {/* <li><span className="li-custom" ><i class="fa fa-circle" /></span><ActiveLink href="/destabilizace-prace" style={menuItemStyle} activeStyle={activeMenuItemStyle}>Destabilizace práce</ActiveLink></li> */}
                    <li><ActiveLink href="/destabilizace-prace" style={menuItemStyle} activeStyle={activeMenuItemStyle}>Destabilizace práce</ActiveLink></li>
                    <li><ActiveLink href="/dopad" style={menuItemStyle} activeStyle={activeMenuItemStyle}>Ekonomické dopady na domácnosti</ActiveLink></li>
                    <li><ActiveLink href="/strategie" style={menuItemStyle} activeStyle={activeMenuItemStyle}>Dopady a strategie domácnosti</ActiveLink></li>
                </ul>
            </div>

            <div style={{ marginTop: "2rem"}}>
                <h3>CHOVÁNÍ A AKTIVITY</h3>
                <ul>
                    <li><ActiveLink href="/" style={menuItemStyle} activeStyle={activeMenuItemStyle}>Celkový profil aktivit</ActiveLink></li>
                    <li><ActiveLink href="/protektivni-aktivity" style={menuItemStyle} activeStyle={activeMenuItemStyle}>Počet protektivních aktivit</ActiveLink></li>
                    <li><ActiveLink href="/" style={menuItemStyle} activeStyle={activeMenuItemStyle}>Kontakt s lidmi</ActiveLink></li>
                    <li><ActiveLink href="/pocity" style={menuItemStyle} activeStyle={activeMenuItemStyle}>Pocity ohledně koronaviru</ActiveLink></li>
                </ul>
            </div>
        </>);

    return (
        <>
            <Head>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
                <link href="https://fonts.googleapis.com/css2?family=Fira+Sans&display=swap" rel="stylesheet" />
            </Head>
            <nav className="top-menu">
                <Link href="/"><a style={navbarItemStylePadding}>Život během pandemie</a></Link>
                <Link href="/projekt"><a style={navbarItemStylePadding}>O projektu</a></Link>
                <Link href="/projekt"><a style={navbarItemStylePadding}>Kontakt</a></Link>
            </nav>
            <nav className="top-menu-mobile">
                <div style={{ overflow: "hidden", backgroundColor: "#F4F4F4", position: "relative" }} >
                    <Link href="/"><a style={{ ...navbarItemStylePadding, display: "block" }}>Život během pandemie</a></Link>
                    <div style={{ display: openMenu ? "flex" : "none", flexDirection: "column", margin: "0 16px" }}>
                        {menu}
                        <hr style={{ width: "100%" }} />
                        <div>
                            <ul>
                                <li><Link href="/projekt" ><a style={navbarItemStyle}>O projektu</a></Link></li>
                                <li><Link href="/projekt"><a style={navbarItemStyle}>Kontakt</a></Link></li>
                            </ul>
                        </div>
                    </div>
                    <a href="javascript:void(0);" class="icon" onClick={e => setOpenMenu(!openMenu)} style={{ ...navbarItemStylePadding, fontSize: "17px", display: "block", position: "absolute", right: 0, top: 0 }}>
                        <i class="fa fa-bars"></i>
                    </a>
                </div>
            </nav>
            <div className="main-wrapper container" style={{ marginTop: "50px", }}>
                <div className="side-menu">
                    <header>
                        <Link href="/"><a><h1>život během pandemie</h1></a></Link>
                    </header>
                    <div className="main-menu">
                        <nav>
                            {menu}
                        </nav>
                        <div>
                            <hr />
                            <p className="menu-footer">výzkumné společnosti PAQ Research, iniciativa IDEA AntiCovid a data sbírá agentura NMS.</p>
                        </div>
                    </div>
                </div>
                <div className="content-wrapper">
                    {props.children}
                </div>
                <div className="main-footer">
                    <hr />
                    <p className="menu-footer">výzkumné společnosti PAQ Research, iniciativa IDEA AntiCovid a data sbírá agentura NMS.</p>
                </div>
            </div>
        </>
    )
}