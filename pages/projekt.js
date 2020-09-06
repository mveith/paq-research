import Layout from '../components/layout';

export default function About() {
    return (
        <Layout title="O projektu">
            <h1 style={{ marginBottom: "3rem" }}>O projektu</h1>

            <p>Data v na této stránce pocházejí z výzkumu Život během pandemie. Jeho cílem je sledovat, jak se vyvíjí sociální
            chování Čechů od začátku pandemie koronaviru, jak pandemie a související problémy dopadají na jejich život. Kromě
            ekonomických dopadů výzkum zkoumá například vývoj duševního zdraví a některých společenských postojů. Shromažďuje
            data o míře kontaktů a typů aktivit, testování a symptomech nemoci, které mohou být využita i pro epidemiologické
            modelování. </p>
            <p>Každé 2-3 týdny (počínaje týdnem březnem 2020) oslovujeme vzorek stejných respondentů – výsledný reprezentativní
            vzorek se v jednotlivých vlnách pohybuje mezi 2200 a 2600 rozhovory. Longitudinální metodika umožňuje zkoumat změnu
            chování či ekonomického stavu stejné skupiny domácností.</p>
            <p>Na projektu se podílí výzkumníci ze společnosti PAQ Research (Daniel Prokop, Lucie Marková, Michaela Kudrnáčová) a
            vědci z iniciativy IDEA AntiCovid (Jana Cahlíková, Vojtěch Bartoš, Michal Bauer, Julie Chytilová). Data sbírá
            agentura NMS (člen SIMAR).</p>

            <h2>Sběr dat</h2>
            <p>Dotazování realizuje na probíhá na Českém národním panelu. Výzkum je kvótně reprezentativní pro populaci ČR, ale
            kvůli metodice se ho mohou účastnit jen respondenti s připojením k internetu. Online metodika sběr redukuje sociální
            desirabilitu a je nutná . Výstupy pro starší generaci (55+) jsou kvůli online sběru pouze orientační.</p>

            <h2>Reprezentativita</h2>
            <p>Náš vzorek kopíruje složení populace 18+ z hlediska:
                <ul>
                    <li>kraje a velikosti obce bydliště, pohlaví, vzdělání, věku respondenta</li>
                    <li>pracovního statusu (před začátkem epidemie), věku × pohlaví, věku ×vzdělání</li>
                </ul>
            </p>
            <p>Pro možnost robustnějšího modelování vztahu sociálních aktivit, protektivního chování a promořenosti jsou v
            hrubém vzorku nadhodnoceny rizikové kategorie měst nad 50 tisíc obyvatel. Pro zpracování výsledků je tento
            „boost“ redukován vážením dat.</p>
            <p>Kromě vysoké retence pro zajištění srovnatelnosti výsledků a dodržení stejné reprezentativní struktury (viz výše)
            dovažujeme data z druhé a další vlny mj.na typ vykonávané práce před začátkem epidemie. Původní příjmová
            struktura ani další původní parametry respondentů se během vln významně nemění. Vývoj v datech tak není dán tím,
            že by se měnilo složení respondentů – ale vývojem chování.</p>

            <h2>Kontroly dat</h2>
            <p>Ve výzkumu kontrolujeme délku vyplňování dotazníku. Výzkum také obsahuje kontrolní otázky, které odhalí, když
            respondent při vyplňování nedával pozor.</p>
            <p>V minulosti sběr dat ve výzkumu Život během pandemie podpořili i Michal Sirový, Ondřej Nezdara či Člověk v tísni
            (téma distančního vzdělávání). </p>

            <p>
                <a href="https://www.paqresearch.cz/"><img src="logo-paq.png" width="120" /></a>
                <a href="https://idea.cerge-ei.cz/anti-covid-19/"><img src="idea.png" width="120" /></a>
            </p>
        </Layout>
    )
}