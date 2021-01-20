import getMenu from '../components/menuBuilder'
import Layout from '../components/layout';

export default function About({ menu }) {
    function Person(name, items) {
        return (<p>
            <strong>{name}</strong>
            <ul>
                {items}
            </ul>
        </p>);
    }

    return (
        <Layout title="Kontakty" menuItemsData={menu}>
            <h1 style={{ marginBottom: "3rem" }}>Studie</h1>

            <p>Tvorba tohoto dashboardu byla podpořena grantem TAČR ETA Mapování dopadů ekonomické krize a optimalizace systémů daní, dávek, exekucí a insolvencí pro zmírnění jejích nepříznivých vlivů (TL04000332).</p>
            <p>Mezi další výstupy tohoto projektu patří analytické studie a zprávy:
                <ul>
                    <li><a href="https://idea.cerge-ei.cz/files/IDEA_TaxBen_2020_01_1_Superhruba_mzda.pdf" target="_blank" class="external-link">Dopady zrušení superhrubé mzdy na daň z příjmů placenou zaměstnanci</a></li>
                    <li><a href="https://idea.cerge-ei.cz/files/Zmena_dani_varianty_TAXBEN_dodatek_03_11_2020.pdf" target="_blank" class="external-link">Návrh reformy zdanění zaměstnanců: Jak ulevit nízkopříjmovým a pomoci spotřebě za polovinu veřejných výdajů</a></li>
                    <li><a href="https://idea.cerge-ei.cz/files/Dopady%20zruseni%20superhrube%20mzdy%20pracovni%20list%2002.pdf" target="_blank" class="external-link">Vyhodnocení dopadů návrhů na zrušení superhrubé mzdy</a></li>
                </ul>
            </p>
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
