import getMenu from "../components/menuBuilder";
import Layout from "../components/layout";

export default function Studies({ menu }) {
  function Study({ title, authors, url, description }) {
    return (
      <article>
        <h3 style={{fontSize: "1.1rem;"}}>
          <a href={url} target="_blank" class="external-link">
            {title}
          </a>
        </h3>
        <address>{authors}</address>
        <p>{description}</p>
      </article>
    );
  }

  return (
    <Layout title="Studie" menuItemsData={menu}>
        <h1 style={{ marginBottom: "3rem" }}>Studie</h1>
        <p>Z výzkumu Život během pandemie byla vydána řada analytických zpráv zabývajících se postoji, chováním a životními podmínkami Čechů během epidemie. Kompletní přehled zpráv je dostupný na <a href="https://www.paqresearch.cz/research-blog" target="_blank" class="external-link">výzkumném blogu</a>, níže je zařazen výběr nejnovějších.</p>

        <p>Tvorba tohoto dashboardu byla podpořena grantem TAČR ETA Mapování dopadů ekonomické krize a optimalizace systémů daní, dávek, exekucí a insolvencí pro zmírnění jejích nepříznivých vlivů (TL04000332). Mezi další výstupy tohoto projektu patří níže uvedené analytické studie a zprávy zabývající se aktuálními otázkami nastavení daňových politik.</p>

        <h2>Analýzy postojů a chování během epidemie</h2>
    
        <Study
            title="Vnímání vládních opatření a vliv představ o epidemii na jejich přijímání"
            authors="Daniel Prokop, Lucie Marková (říjen 2020)"
            url="https://www.paqresearch.cz/post/vnimana-vladnich-opatreni-a-vliv-predstav-o-epidemii-na-jejich-prijimani"
            description="Výzkumná zpráva z šetření Život během pandemie ukazuje, jak byla na podzim 2020 českou veřejností hodnocena opatření proti šíření nákazy koronaviru – jak reálně zaváděná, tak další možná. Zkoumána byla vnímaná účinnost opatření i komplikace, které by lidem přinesla."
        />
        <Study
            title="Testování a očkování na koronavirus: motivace a bariéry"
            authors="Michaela Kudrnáčová, Daniel Prokop (prosinec 2020)"
            url="https://www.paqresearch.cz/post/testovani-a-ockovani-na-koronavirus-motivace-a-bariery"
            description="Výzkumná zpráva se zabývá postoji k testování a očkování na koronavirus. Popisuje, jaký byl v závěru roku 2020 zájem o testování a očkování mezi různými skupinami obyvatel, a ukazuje, že motivaci k testování zvyšuje kompenzace ztraceného příjmu v době karantény i dostupnost testovacího místa."
        />
        
        <h2>Analýzy a studie k dopadům daňových politik</h2>
    
        <Study
            title="Dopady zrušení superhrubé mzdy na daň z příjmů placenou zaměstnanci"
            authors="Klára Kalíšková, Daniel Münich, Michal Šoltés (září 2020)"
            url="https://idea.cerge-ei.cz/files/IDEA_TaxBen_2020_01_1_Superhruba_mzda.pdf"
            description="Pracovní list určený pro veřejnou diskusi obsahuje výpočty dopadů vládou oznámeného záměru zrušení superhrubé mzdy na zaměstnance. Ukazuje, že z poklesu příjmů státního rozpočtu způsobeného zrušením superhrubé mzdy (přibližně 80 mld. Kč ročně) by téměř čtvrtina přilepšila desetině zaměstnanců s nejvyššími příjmy. Desetina zaměstnanců s nejnižšími mzdami by si polepšila v lepším případě o 100 Kč ročně."
        />
        <Study
            title="Návrh reformy zdanění zaměstnanců: Jak ulevit nízkopříjmovým a pomoci spotřebě za polovinu veřejných výdajů"
            authors="Štěpán Jurajda, Klára Kalíšková, Daniel Prokop, Michal Šoltés (listopad 2020)"
            url="https://idea.cerge-ei.cz/files/Zmena_dani_varianty_TAXBEN_dodatek_03_11_2020.pdf"
            description="Analytická zpráva předkládá alternativu k vládní variantě zrušení superhrubé mzdy. Tato varianta jen mírně snižuje sazby danění zaměstnanců, ale výrazně navyšuje slevu na dani a převádí ji do daňového bonusu, aby ji vyčerpali i nízkopříjmoví."
        />
        <Study
            title="Vyhodnocení dopadů návrhů na zrušení superhrubé mzdy"
            authors="Štěpán Jurajda, Klára Kalíšková, Daniel Prokop, Michal Šoltés (listopad 2020)"
            url="https://idea.cerge-ei.cz/files/Dopady%20zruseni%20superhrube%20mzdy%20pracovni%20list%2002.pdf"
            description="Pracovní list předkládá grafické znázornění dopadů čtyř návrhů na zrušení superhrubé mzdy. Rozebírá, k jakým nákladům veřejných rozpočtů a daňovým odvodům zaměstnanců by vedly jednotlivé návrhy, a ukazuje, jak se tyto dopady liší dle výše výdělků."
        />
        <br />
    </Layout>
  );
}

export async function getStaticProps(context) {
  return {
    props: {
      menu: await getMenu(),
    },
  };
}
