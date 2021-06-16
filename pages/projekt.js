import getMenu from '../components/menuBuilder'
import Layout from '../components/layout';

export default function About({ menu }) {
    return (
        <Layout title="O projektu" menuItemsData={menu}>
            <h1 style={{ marginBottom: "3rem" }}>O projektu</h1>

            <p>Data na této stránce pocházejí z výzkumu Život během pandemie. Jeho cílem je sledovat, jak se vyvíjí sociální
            chování Čechů od začátku pandemie koronaviru, jak pandemie a související problémy dopadají na jejich život. Kromě
            ekonomických dopadů výzkum zkoumá například vývoj duševního zdraví a některých společenských postojů. Shromažďuje data o míře kontaktů a typech aktivit, testování a symptomech nemoci, která mohou být využita i pro epidemiologické modelování.</p>
            <p>Každé 2–3 týdny (počínaje březnem 2020) oslovujeme vzorek stejných respondentů – výsledný reprezentativní vzorek se v jednotlivých vlnách pohybuje mezi 2200 a 2600 rozhovory. Longitudinální metodika umožňuje zkoumat změnu chování či ekonomického stavu stejné skupiny domácností.</p>
            <p>Na projektu se podílí výzkumníci ze společnosti PAQ Research (Daniel Prokop, Lucie Marková, Michaela Kudrnáčová) a
            vědci z iniciativy IDEA AntiCovid (Jana Cahlíková, Vojtěch Bartoš, Michal Bauer, Julie Chytilová). Data sbírá
            agentura NMS (člen SIMAR).</p>

            <h2>Sběr dat</h2>
            <p>Dotazování probíhá na Českém národním panelu. Výzkum je kvótně reprezentativní pro populaci ČR, ale kvůli metodice se ho mohou účastnit jen respondenti s připojením k internetu. Online metodiku sběru dat si vyžádala potřeba rychlého dotázání respondentů v krátkém časovém úseku, znemožnění osobních kontaktů či jejich preventivní omezování během pandemie i citlivý charakter dotazovaných témat, u nichž by přítomnost tazatele mohla vést ke zkreslení odpovědí. Výstupy pro starší generaci (55+) jsou kvůli online sběru pouze orientační.</p>

            <h2>Reprezentativita</h2>
            <p>Náš vzorek kopíruje složení populace 18+ z hlediska:
                <ul>
                    <li>kraje a velikosti obce bydliště, pohlaví, vzdělání, věku respondenta</li>
                    <li>pracovního statusu (před začátkem epidemie), věku&nbsp;×&nbsp;pohlaví, věku&nbsp;×&nbsp;vzdělání</li>
                </ul>
            </p>
            <p>Pro možnost robustnějšího modelování vztahu sociálních aktivit, protektivního chování a promořenosti jsou v
            hrubém vzorku nadhodnoceny rizikové kategorie měst nad 50 tisíc obyvatel. Pro zpracování výsledků je tento
            „boost“ redukován vážením dat.</p>
            <p>Pro zajištění srovnatelnosti výsledků a dodržení stejné reprezentativní struktury (viz výše) usilujeme o vysokou retenci a rovněž dovažujeme data z druhé a další vlny mj. na typ vykonávané práce před začátkem epidemie. Původní příjmová
            struktura ani další původní parametry respondentů se během vln významně nemění. Vývoj v datech tak není dán tím,
            že by se měnilo složení respondentů – ale vývojem chování.</p>

            <h2>Kontroly dat</h2>
            <p>Ve výzkumu kontrolujeme délku vyplňování dotazníku. Výzkum také obsahuje kontrolní otázky, které odhalí, když
            respondent při vyplňování nedával pozor.</p>

            <h2>Financování</h2>
            <p>Sběr dat je financován z následujících zdrojů:
                <ul>
                    <li>Max Planck Institute for Tax Law and Public Finance</li>
                    <li>Akademie věd ČR (ERC-CZ/AV-B (ERC300851901))</li>
                    <li>German Science Foundation CRC TRR 190</li>
                </ul>
            </p>
            <p>V minulosti projekt podpořili Ondřej Nezdara, Michal Sirový, Člověk v tísni (sběr dat o distančním vzdělávání)</p>
            <p>Tvorba tohoto dashboardu byla podpořena grantem TAČR ETA Mapování dopadů ekonomické krize a optimalizace systémů daní, dávek, exekucí a insolvencí pro zmírnění jejích nepříznivých vlivů (TL04000332).</p>

            <p>Realizace sběru dat ve čtyřech vlnách výzkumu na konci roku 2020 a začátku roku 2021 a příprava dat pro epidemiologické modelování byla podpořena grantem TAČR ETA Město pro lidi, ne pro virus (TL04000282).</p>

            <p>Sběr dat ve dvou vlnách výzkumu v květnu 2021 byl podpořen Centrem pro výzkum veřejného mínění (CVVM) a Českým sociálněvědním datovým archivem (ČSDA) Sociologického ústavu Akademie věd, v. v. i.</p>

            <p>
                <a href="https://www.paqresearch.cz/"><img src="logo-paq.png" width="120" /></a>
                <a href="https://idea.cerge-ei.cz/anti-covid-19/"><img src="idea.png" width="120" /></a>
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
