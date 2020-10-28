import getMenu from '../components/menuBuilder'
import Layout from '../components/layout';
import styles from './index.module.css'
import { useState, useEffect } from 'react';

function Card({ title, link, linkLabel, contents }) {

    const [contentIndex, setContentIndex] = useState(Math.floor(Math.random() * contents.length));
    return (
        <div className={styles.card}>
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <h2 style={{ fontSize: "1.9rem", textAlign: "left" }}>{title}</h2>
                <button className={styles.button}>{linkLabel}</button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", position: "relative" }}>
                <a className={styles.carouselButton} style={{ left: 0 }} onClick={e => setContentIndex(contentIndex === 0 ? contents.length - 1 : (contentIndex - 1))}>
                    <span style={{ backgroundImage: "url(\"data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='gray' viewBox='0 0 8 8'%3E%3Cpath d='M5.25 0l-4 4 4 4 1.5-1.5-2.5-2.5 2.5-2.5-1.5-1.5z'/%3E%3C/svg%3E\");" }}></span>
                </a>
                <p dangerouslySetInnerHTML={{ __html: contents[contentIndex] }} style={{ padding: "0 20px" }}></p>
                <a className={styles.carouselButton} style={{ right: 0 }} onClick={e => setContentIndex((contentIndex + 1) % contents.length)}>
                    <span style={{ backgroundImage: "url(\"data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='gray' viewBox='0 0 8 8'%3E%3Cpath d='M2.75 0l-1.5 1.5 2.5 2.5-2.5 2.5 1.5 1.5 4-4-4-4z'/%3E%3C/svg%3E\");" }}></span>
                </a>
            </div>
        </div>);
}

export default function Home({ menu }) {
    return (
        <Layout menuItemsData={menu} landingPage={true}>
            <div className={styles.landingPage}>
                <h1 style={{ fontSize: "2.8rem", maxWidth: "900px" }}>Výzkum chování Čechů a dopadů pandemie na jejich životy</h1>
                <p>Je více nezaměstnaných a mají pracovníci ve státní správě strach ze ztráty práce?</p>

                <div className={styles.cards}>
                    <Card
                        title="Co jsme se dozvěděli z posledních odpovědí?"
                        contents={["<strong>+8 %</strong><br />má snížený pracovní úvazek či příjmy oproti stavu před pandemií", "test..."]}
                        link="destabilizace-prace"
                        linkLabel="Podívejte se na novinky z měření"
                    />
                    <Card
                        title="Jak odpovídají respondenti v čase?"
                        contents={["Jak dopadá pandemie v čase na pracovní život?", "Jak postihla pandemie ekonomickou situaci domácností?", "Jak domácnosti reagují na ekonomické problémy?", "Jak se pandemie promítá do společenských a volnočasových činností?", "..."]}
                        link="destabilizace-prace"
                        linkLabel="Prostudujte vybraná témata"
                    />
                </div>
            </div>
        </Layout>
    )
}
export async function getStaticProps(context) {
    return {
        props: {
            menu: await getMenu()
        }
    };
}
