import getMenu from '../components/menuBuilder'
import Head from 'next/head';
import Layout from '../components/layout';
import Link from 'next/link';

function Arrow({ direction, color }) {
    const arrow = {
        border: `solid ${color}`,
        borderWidth: "0 3px 3px 0",
        display: "inline-block",
        padding: "3px",
        verticalAlign: "middle"
    };
    const dot = {
        height: "13px",
        width: "13px",
        backgroundColor: "#bbb",
        borderRadius: "50%",
        display: "inline-block",
        verticalAlign: "middle"
    };
    switch (direction) {
        case "up":
            return (<i style={{ ...arrow, transform: "rotate(-135deg)" }}></i>);

        case "down":
            return (<i style={{ ...arrow, transform: "rotate(45deg)" }}></i>);

        case "no":
            return (<i style={{ ...dot }}></i>);
        default:
            return (<i></i>);
    }
}

function SummaryTile({ value, text, color, arrow, url }) {
    return (
        <Link href="[key]" as={url}>
            <a>
                <div className="summary">
                    <div className="summary-number">
                        <span>{value}</span>
                        <span><Arrow direction={arrow} color={color} /></span>
                    </div>
                    <p style={{ textAlign: "center" }} dangerouslySetInnerHTML={{ __html: text }}></p>
                </div>
            </a>
        </Link>
    );
}

export default function Summary({ menu }) {
    const d = [
        { value: "11 %", text: "má omezenou práci (nižší výdělek či úvazek, ošetřovné atp.)", color: "red", arrow: "up", url: "/destabilizace-prace" },
        { value: "45 %", text: "navštívilo v posledním týdnu rodinu či přátele", color: "red", arrow: "up", url: "/socialni-aktivity" },
        { value: "11,5", text: "týdenní průměr přímých osobních kontaktů trvajících aspoň 5 minut", color: "red", arrow: "up", url: "/kontakty" },
        { value: "25 %", text: "pracuje plně či částečně z domova", color: "red", arrow: "down", url: "/home-office" },
        { value: "61 %", text: "je ochotných nechat se zdarma naočkovat", color: "green", arrow: "up", url: "/ockovani" },
        { value: "35 %", text: "téměř či vůbec nevychází z domova", color: "green", arrow: "down", url: "/jednotlive-protektivni" },
        { value: "14 %", text: "má vysoký počet kontaktů a méně se chrání před nákazou", color: "red", arrow: "up", url: "/kontakty-protektivni" },
        { value: "45 %", text: "má z epidemie velké starosti", color: "green", arrow: "down", url: "/obavy-epidemie" }
    ];
    return (
        <Layout title="Přehled nejnovějších výsledků: 25. vlna výzkumu k 30. březnu 2021" menuItemsData={menu}>
            <Head>
                <meta key="share-image" property="og:image" content={`https://zivotbehempandemie.cz/rozdily.png`} />
                <meta property="og:description" content="Přehled nejnovějších výsledků: 25. vlna výzkumu k 30. březnu 2021" />
            </Head>
            <h1>Přehled nejnovějších výsledků: 25. vlna výzkumu k 30. březnu 2021</h1>


            <div className="diff-grid">
                {d.map(dv => (<SummaryTile {...dv} />))}
            </div>

            <div className="blog">
                <h2>Co říkají data o aktuálním chování a postojích?</h2>
                <div className="story">
                    <div className="block-paragraph">Počty kontaktů se i v druhé polovině března držely na nízké úrovni kolem 11 osobních kontaktů v průměru týdně, tedy pod polovinou běžného stavu. Sociální aktivity jako využívání služeb lehce posílily, nejvíce se rozšířila setkávání mezi přáteli a známými. Ta však byla v první půlce března potlačena nejvíce od loňského jara, tedy i aktuální hodnoty představují omezený stav. Dodržování preventivních opatření (jako pečlivé mytí rukou či nošení roušky) v posledních dvou týdnech mírně polevilo, zejména ubylo lidí, kteří téměř či vůbec nevycházejí z domova. Takových je nyní 35 %, v polovině března to bylo 41 %. Obavy z epidemie oproti první půlce března oslabily, stále se jí však velmi obává kolem 45 % dospělých, podobně jako během celé zimy.</div>
                    <hr style={{ margin: "2rem 40%", color: "#707070" }} />
                </div>
                <div className="story">
                    <p className="story-title"><Link href="/kontakty"><a class="external-link">Počty kontaktů</a></Link></p>
                    <div className="block-paragraph">Počty osobních kontaktů se již v únoru pohybovaly na zhruba 55 % běžného stavu (12 až 13 přímých osobních kontaktů v průměru týdně), podobně jako během vrcholu podzimní vlny. Březnové zpřísnění restrikcí kontakty dále stlačilo k 10 až 11 týdně. Na konci března se míra kontaktů jen lehce zvýšila k 11,5 v průměru týdně. Po celý březen měli lidé v průměru 4,5 kontaktů nad 15 minut bez roušky týdně, tedy o něco méně než během vrcholu podzimní vlny.</div>
                </div>
                <div className="story">
                    <p className="story-title"><Link href="/socialni-aktivity"><a class="external-link">Sociální aktivity</a></Link></p>
                    <div className="block-paragraph">Po oslabení sociálních aktivit v první půlce března došlo ke konci měsíce k opětovnému mírnému nárůstu využívání služeb. Především se ale rozšířily návštěvy mezi přáteli a známými, které byly na počátku března oslabeny nejvíce od loňského dubna. Zatímco v týdnu od 8. března se alespoň jednou s rodinou či přáteli sešlo 39 % respondentů, ke konci března to bylo 45 %.</div>
                </div>
                <div className="story">
                    <p className="story-title"><Link href="/home-office"><a class="external-link">Home office</a></Link></p>
                    <div className="block-paragraph">V březnu došlo poprvé od přelomu října a listopadu k nárůstu využívání práce z domova. Během zimy z domova v jednotlivých týdnech pracovalo plně kolem 13 až 15 % lidí, částečně pak kolem 8 až 9 %. V březnu se podíl plné práce z domova pohyboval mezi 16 až 18 %, podobně až mírně více než během vrcholu podzimní vlny. Ve srovnání s druhým březnovým týdnem ale práce z domova na konci března mírně oslabila.</div>
                </div>
                <div className="story">
                    <p className="story-title"><Link href="/ockovani"><a class="external-link">Zájem o očkování</a></Link></p>
                    <div className="block-paragraph">Zájem o očkování během března lehce stoupl. Na počátku března by se spíše či určitě nechalo zdarma naočkovat 57 % dospělých, na konci března pak 61 %. Od září se ochota k očkování jen mírně zvýšila (z 56 %), avšak v některých populačních skupinách je zájem nyní dokonce nižší než na podzim (zejména mladší lidé s nižším vzděláním).</div>
                </div>
                <div className="story">
                    <p className="story-title"><Link href="/jednotlive-protektivni"><a class="external-link">Obavy a duševní zdraví</a></Link></p>
                    <div className="block-paragraph">Obavy veřejnosti z epidemie po nárůstu v první polovině března mírně opadly. Velké starosti nyní epidemie dělá přibližně 45 % dospělých. Tato vysoká úroveň obav se drží již od počátku letošního roku. V novém roce se také ve srovnání s podzimem a létem minulého roku rozrostly příznaky deprese a úzkosti.</div>
                </div>
                <div className="story">
                    <p className="story-title"><Link href="/destabilizace-prace"><a class="external-link">Práce a ekonomika domácností</a></Link></p>
                    <div className="block-paragraph">Přibližně 11 % pracujících (zaměstnanci a OSVČ) se aktuálně potýká s nějakou formou omezení v práci, ať už kompenzovanou (ošetřovné, překážky práce apod.), nebo se jedná o omezení bez náhrady (snížení výdělku, ztráta doplňkového příjmu na DPP apod.).</div>
                </div>
            </div>

        </Layout >
    );
}

export async function getStaticProps(context) {
    return {
        props: {
            menu: await getMenu(),
        },
    };
}
