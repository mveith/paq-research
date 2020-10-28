import getMenu from '../components/menuBuilder'
import Layout from '../components/layout';
import Carousel from '../components/carousel';
import styles from './index.module.css'

function Card({ title, link, linkLabel, contents }) {
    return (
        <div className={styles.card}>
            <h2 style={{ fontSize: "1.9rem", textAlign: "left" }}>{title}</h2>
            <div className={styles.cardCarousel}><Carousel contents={contents} /></div>
            <button className={styles.button}>{linkLabel}</button>
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
