import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

const menuItemStyle = { color: "#7C8A92" };
const activeMenuItemStyle = { fontWeight: "bold" };
const navbarItemStyle = {
    color: "#707070"
};
const navbarItemStylePadding = {
    ...navbarItemStyle,
    padding: "14px 16px"
};

function ActiveLink({ children, href, as, style, activeStyle }) {
    const router = useRouter()
    const isActive = (router.pathname === href || router.asPath === as) && router.pathname !== "/";
    return (<Link href={href} as={as}><a style={isActive ? activeStyle : style}>{children}</a></Link>);
}

function MenuGroup({ margin, title, items }) {
    const links = items.map(i => <li><ActiveLink href="[key]" as={`/${i.key}`} style={menuItemStyle} activeStyle={activeMenuItemStyle}>{i.title}</ActiveLink></li>);
    return (<div style={{ marginTop: margin }}>
        <h3>{title.toUpperCase()}</h3>
        <ul>
            {links}
        </ul>
    </div>);
}

export default function Layout(props) {
    const [openMenu, setOpenMenu] = useState(false);

    const menu = props.menuItemsData ? props.menuItemsData.map((item, index) => <MenuGroup margin={index === 0 ? "4em" : "2em"} title={item.title} items={item.items} />) : <></>;
    const defaultUrl = props.menuItemsData ? props.menuItemsData[0].items[0].key : "";
    const onMenuButtonClick = e => {
        const openMenuValue = openMenu || props.openMenu;
        setOpenMenu(!openMenuValue);
        if (props.setOpenMenu) {
            props.setOpenMenu(!openMenuValue);
        }
    };
    return (
        <>
            <Head>
                <title>život během pandemie - {props.title}</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />

                <meta key="share-image" property="og:image" content="https://zivotbehempandemie.cz/destabilizace.png" />
                <meta property="og:title" content="PAQ Research: Život během pandemie" />
                <meta name="twitter:card" content="summary" />

                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
                <link href="https://fonts.googleapis.com/css2?family=Fira+Sans&display=swap" rel="stylesheet" />

                {/* Global site tag (gtag.js) - Google Analytics */}
                <script async src="https://www.googletagmanager.com/gtag/js?id=UA-177624987-1"></script>
                <script dangerouslySetInnerHTML={{
                    __html: `
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());

                    gtag('config', 'UA-177624987-1');
                `}} />
            </Head>
            <nav className="top-menu">
                <Link href="[key]" as={`/${defaultUrl}`}><a style={navbarItemStylePadding}>Život během pandemie</a></Link>
                <Link href="/souhrn"><a style={navbarItemStylePadding}>Souhrn</a></Link>
                <Link href="/projekt"><a style={navbarItemStylePadding}>O projektu</a></Link>
                <Link href="/studie"><a style={navbarItemStylePadding}>Studie</a></Link>
                <Link href="/kontakt"><a style={navbarItemStylePadding}>Kontakt</a></Link>
            </nav>
            <nav className="top-menu-mobile">
                <div style={{ overflow: "hidden", backgroundColor: "#F4F4F4", position: "relative", zIndex: 10 }} >
                    <Link href="[key]" as={`/${defaultUrl}`}><a style={{ ...navbarItemStylePadding, display: "block" }}>Život během pandemie</a></Link>
                    <div style={{ display: openMenu || props.openMenu ? "flex" : "none", flexDirection: "column", margin: "0 16px" }}>
                        {menu}
                        <hr style={{ width: "100%" }} />
                        <div>
                            <ul>
                                <li><Link href="/souhrn" ><a style={navbarItemStyle}>Souhrn</a></Link></li>
                                <li><Link href="/projekt" ><a style={navbarItemStyle}>O projektu</a></Link></li>
                                <li><Link href="/studie"><a style={navbarItemStyle}>Studie</a></Link></li>
                                <li><Link href="/kontakt"><a style={navbarItemStyle}>Kontakt</a></Link></li>
                            </ul>
                        </div>
                    </div>
                    <a href="javascript:void(0);" className="icon" onClick={onMenuButtonClick} style={{ ...navbarItemStylePadding, fontSize: "17px", display: "block", position: "absolute", right: 0, top: 0 }}>
                        <i className="fa fa-bars"></i>
                    </a>
                </div>
            </nav>
            <div className="main-wrapper">
                <div className="side-menu">
                    <header>
                        <Link href="[key]" as={`/${defaultUrl}`}><a><h1 style={{ color: "#eec94e", lineHeight: "1.9rem", fontSize: "1.9rem" }} >život během pandemie</h1></a></Link>
                    </header>
                    <div className="main-menu">
                        <nav>
                            {menu}
                        </nav>
                        <div>
                            <a href="https://www.paqresearch.cz/"><img src="logo-paq.png" width="90" /></a>
                            <hr />
                            <p className="menu-footer">
                                Na projektu se podílí výzkumné společnosti <a href="https://www.paqresearch.cz/">PAQ Research</a>, iniciativa <a href="https://idea.cerge-ei.cz/anti-covid-19/">IDEA AntiCovid</a> a data sbírá agentura <a href="https://www.nms.cz/">NMS</a>.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="content-wrapper container">
                    {props.children}
                </div>
                <div className="main-footer">
                    <p className="menu-footer">Na projektu se podílí výzkumné společnosti <a href="https://www.paqresearch.cz/">PAQ Research</a>, iniciativa <a href="https://idea.cerge-ei.cz/anti-covid-19/">IDEA AntiCovid</a> a data sbírá agentura <a href="https://www.nms.cz/">NMS</a>.</p>
                </div>
            </div>
        </>
    )
}