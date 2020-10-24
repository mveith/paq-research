import getMenu from '../components/menuBuilder'
import Layout from '../components/layout';

export default function Home({ menu }) {
    return (
        <Layout menuItemsData={menu} landingPage={true}>
            <h1>Život během pandemie</h1>
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
