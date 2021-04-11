import getMenu from '../components/menuBuilder'
import Head from 'next/head';
import Layout from '../components/layout';
import Link from 'next/link';

function Arrow({ direction, color }) {
    const arrow = {
        border: `solid black`,
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
                        <span dangerouslySetInnerHTML={{ __html: value }}></span>
                        <span style={{ margin: "0 1em" }}><Arrow direction={arrow} color={color} /></span>
                    </div>
                    <p style={{ textAlign: "center" }} dangerouslySetInnerHTML={{ __html: text }}></p>
                </div>
            </a>
        </Link>
    );
}

export default function Summary({ menu }) {
    const d = [
        { value: "11&nbsp;%", text: "má omezenou práci (nižší výdělek či úvazek, ošetřovné atp.)", color: "red", arrow: "up", url: "/destabilizace-prace" },
        { value: "45&nbsp;%", text: "navštívilo v posledním týdnu rodinu či přátele", color: "red", arrow: "up", url: "/socialni-aktivity" },
        { value: "11,5", text: "týdenní průměr přímých osobních kontaktů trvajících aspoň 5 minut", color: "red", arrow: "up", url: "/kontakty" },
        { value: "25&nbsp;%", text: "pracuje plně či částečně z domova", color: "red", arrow: "down", url: "/home-office" },
        { value: "61&nbsp;%", text: "je ochotných nechat se zdarma naočkovat", color: "green", arrow: "up", url: "/ockovani" },
        { value: "35&nbsp;%", text: "téměř či vůbec nevychází z domova", color: "green", arrow: "down", url: "/jednotlive-protektivni" },
        { value: "14&nbsp;%", text: "má vysoký počet kontaktů a méně se chrání před nákazou", color: "red", arrow: "up", url: "/kontakty-protektivni" },
        { value: "45&nbsp;%", text: "má z epidemie velké starosti", color: "green", arrow: "down", url: "/obavy-epidemie" }
    ];
    return (
        <Layout title="Přehled nejnovějších výsledků: 25. vlna výzkumu k 30. březnu 2021" menuItemsData={menu}>
            <Head>
                <meta key="share-image" property="og:image" content={`https://zivotbehempandemie.cz/rozdily.png`} />
                <meta property="og:description" content="Přehled nejnovějších výsledků: 25. vlna výzkumu k 30. březnu 2021" />
            </Head>
            <h1>Přehled nejnovějších výsledků: 25. vlna výzkumu k 30. březnu 2021</h1>


            <div className="blog">

                <div className="diff-grid">
                    {d.map(dv => (<SummaryTile {...dv} />))}
                </div>

                <h2>Co říkají data o aktuálním chování a postojích?</h2>
                <div className="story">
                    <div className="block-paragraph">Po významném omezení v prvních týdnech březnového lock-downu se chování populace na konci března mírně uvolnilo (lehce narostly kontakty a rodinné návštěvy, mírně pokleslo protektivní chování a využívání home-office). Po zavedení testování ve firmách významně vzrostla protestovanost.</div>
                    <hr style={{ margin: "2rem 40%", color: "#707070" }} />
                </div>
                <div className="story">
                    <p><strong><Link href="/kontakty"><a class="external-link">Počty osobních kontaktů</a></Link> se na konci března mírně zvýšily na 11,5 lidí v průměru týdně</strong></p>
                    <div className="block-paragraph">Po celý březen měli lidé v průměru 4,5 kontaktů nad 15 minut bez roušky týdně. Odhadovaná míra kontaktů je tedy na jaře stále nižší než během vrcholu podzimní vlny, a to zejména díky vyššímu omezení rodinných návštěv.</div>
                </div>
                <div className="story">
                    <p><strong>Od počátku března narostly <Link href="/socialni-aktivity"><a class="external-link">návštěvy mezi přáteli a rodinou</a></Link></strong></p>
                    <div className="block-paragraph">Po oslabení sociálních aktivit v první půlce března došlo ke konci měsíce k rozšíření návštěv mezi přáteli a rodinou. V týdnu od 8. března se alespoň jednou s rodinou či přáteli sešlo jen 39 % respondentů (nejméně od jara 2020), ke konci března to bylo 45 %.</div>
                </div>
                <div className="story">
                    <p><strong>Lehce se omezila <Link href="/home-office"><a class="external-link">práce z domova</a></Link></strong></p>
                    <div className="block-paragraph">Na počátku března došlo k nárůstu využívání práce z domova. A to až na 18 % pracovně aktivních respondentů (oproti 13–15 % v zimě). Trend nárůstu home office ale nepokračuje, naopak čísla se opět v druhé polovině března mírně propadla (16 %).</div>
                </div>
                <div className="story">
                    <p><strong><Link href="/protektivni-aktivity"><a class="external-link">Opatrnost před nákazou</a></Link> a jejím šířením v posledních dvou týdnech mírně poklesla</strong></p>
                    <div className="block-paragraph">Především se zvýšilo zastoupení dospělých, kteří ze 13 sledovaných preventivních opatření (jako pečlivé mytí rukou, nošení roušky, vyhýbání se přelidněným místům) dodržují jen menšinu. Takových je nyní 44 %, zatímco během vrcholu podzimní vlny to bylo kolem 35 %.</div>
                </div>
                <div className="story">
                    <p><strong>Zájem o očkování<Link href="/ockovani"><a class="external-link"> během března opět lehce stoupl</a></Link></strong></p>
                    <div className="block-paragraph">Na konci března vyjadřovalo ochotu k očkování 61 % (včetně více než 10 % již očkovaných respondentů). Což je nárůst o 10 procentních bodů oproti začátku roku a mírný nárůst oproti září 2020 (tehdy ochotných 57 %). Detailnější analýza ale ukazuje, že ochota silně narostla mezi staršími, vzdělanějšími a vysokopříjmovými respondenty.</div>
                </div>
                <div className="story">
                    <p><strong><Link href="/testovani"><a class="external-link">Míra protestovanosti</a></Link> je výrazně vyšší než na podzim či začátku zimy</strong></p>
                    <div className="block-paragraph">Nějakým typem testu prošlo v posledním měsíci 38 % respondentů a 69 % zaměstnanců docházejících na pracoviště (zbytek může být z menších firem či firem, které nezvládly testovat).</div>
                </div>
                <div className="story">
                    <p><strong><Link href="/obavy-epidemie"><a class="external-link">Obavy veřejnosti z epidemie</a></Link> po nárůstu v první polovině března mírně opadly</strong></p>
                    <div className="block-paragraph">Velké starosti nyní epidemie dělá přibližně 45 % dospělých. Obavy se tedy vrátily na úroveň z ledna či února. Pokles obav v minulosti predikoval další mírné uvolnění chování v následujících týdnech.</div>
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
