import Head from 'next/head';
import getMenu from '../components/menuBuilder'
import Layout from '../components/layout';
import Carousel from '../components/carousel';
import styles from './index.module.css'

function Card({ title, link, linkLabel, contents }) {
    return (
        <div className={styles.card}>
            <h2 style={{ fontSize: "1.6rem", textAlign: "left" }}>{title}</h2>
            <div className={styles.cardCarousel}><Carousel contents={contents} /></div>
            <button className={styles.button}>{linkLabel}</button>
        </div>);
}

export default function Home({ menu }) {
    return (
        <Layout menuItemsData={menu} landingPage={true}>
            <Head>
                <title>život během pandemie</title>
                <meta key="share-image" property="og:image" content={`https://zivotbehempandemie.cz/destabilizace.png`} />
                <meta property="og:description" content="PAQ Research: Život během pandemie" />
            </Head>
            <div className={styles.landingPage}>
                <h1 style={{ fontSize: "2.8rem", maxWidth: "900px" }}>Výzkum chování Čechů a dopadů pandemie na jejich životy</h1>
                <p className={styles.subtitle}>Již od března se každé dva týdny ptáme stejného vzorku Čechů, jak se mění jejich chování během pandemie. Sledujeme i dopad na jejich životní podmínky a obavy.</p>

                <div className={styles.cards}>
                    <Card
                        title="Shrnutí výsledků z posledních týdnů"
                        contents={["<strong>+8 %</strong><br />má snížený pracovní úvazek či příjmy oproti stavu před pandemií", "test..."]}
                        link="destabilizace-prace"
                        linkLabel="Podívejte se na nejnovější data"
                    />
                    <Card
                        title="Vývoj situace od počátku epidemie"
                        contents={["Jsou chudé domácnosti epidemií zasažený více než bohaté?", "Proč nepřecházíme na home office jako na jaře?", "Omezujeme v pandemii svoje kontakty a jak?", "Jak se pandemie promítá do společenských a volnočasových činností?", "..."]}
                        link="destabilizace-prace"
                        linkLabel="Prostudujte klíčové trendy a témata"
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
