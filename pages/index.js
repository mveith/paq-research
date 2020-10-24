import getMenu from '../components/menuBuilder'
import Layout from '../components/layout';
import styles from './index.module.css'

export default function Home({ menu }) {
    return (
        <Layout menuItemsData={menu} landingPage={true}>
            <div className={styles.landingPage}>
                <h1>Výzkum chování Čechů a dopadů pandemie na jejich životy</h1>
                <p>Je více nezaměstnaných a mají pracovníci ve státní správě strach ze ztráty práce?</p>

                <div className={styles.cards}>
                    <div className={styles.card}>
                        <h2>Trendy v posledních týdnech</h2>
                        <p><strong>+8 %</strong> má snížený pracovní úvazek či příjmy oproti stavu před pandemií</p>
                        <button className={styles.button}>Podívejte se na novinky z měření</button>
                    </div>

                    <div className={styles.card}>
                        <h2>Sledování dlouhodobých trendů</h2>
                        <p>Jak dopadá pandemie na pracovní život</p>
                        <button className={styles.button}>Prostudujte vybraná témata</button>
                    </div>
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
