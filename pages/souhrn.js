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

function SummaryTile({ value, text, color, arrow }) {
    return (
        <div className="summary">
            <div className="summary-number">
                <span>{value}</span>
                <span><Arrow direction={arrow} color={color} /></span>
            </div>
            <p style={{ textAlign: "center" }} dangerouslySetInnerHTML={{ __html: text }}></p>
        </div >
    );
}

export default function Summary({ menu }) {
    const d = [
        { value: "3 %", text: "má snížený pracovní úvazek či příjmy oproti stavu před pandemií", color: "gray", arrow: "no" },
        { value: "13 %", text: "domácnost je těžce finančně zasažena v důsledku pandemie", color: "gray", arrow: "no" },
        { value: "15", text: "týdenní průměr přímých osobních kontaktů trvajících aspoň 5 minut", color: "darkGreen", arrow: "down" },
        { value: "16 %", text: "pracuje plně z domova", color: "green", arrow: "up" },
        { value: "89 %", text: "deklaruje nošení roušky/respirátoru", color: "blue", arrow: "up" },
        { value: "13 %", text: "je vysoce sociálně aktivní a méně se chrání před nákazou", color: "darkGreen", arrow: "down" },
        { value: "48 %", text: "má z epidemie velké starosti", color: "red", arrow: "up" },
        { value: "23 %", text: "velmi se obává, že přijde o práci", color: "gray", arrow: "no" }
    ];
    return (
        <Layout title="Co jsme zjistili z 16. vlny" menuItemsData={menu}>
            <Head>
                <meta key="share-image" property="og:image" content={`https://zivotbehempandemie.cz/rozdily.png`} />
                <meta property="og:description" content="Co jsme zjistili z 16. vlny" />
            </Head>
            <h1>Co jsme zjistili z 16. vlny</h1>


            <div className="diff-grid">
                {d.map(dv => (<SummaryTile {...dv} />))}
            </div>

            <div className="blog">
                <h2>Stručně hlavní pozorování?</h2>
                <div className="story">
                    <div className="block-paragraph">Zpřísnění vládních opatření na začátku března provázel mírný pokles osobních přímých kontaktů v průměru přibližně o jeden týdně. Míra kontaktů pozvolna klesala již od ledna a aktuálně je omezena nejvíce od dubna loňského roku. Restrikce se dotkly především setkávání s rodinou a přáteli, která v březnu oproti únoru zaznamenala zásadní propad. V březnu také posílilo využívání home office. Práce z domova byla v druhém březnovém týdnu využívána dosud nejvíce od počátku května minulého roku. Obavy z epidemie se drží na vysokých hodnotách, ochota k očkování zdarma stagnuje.</div>
                    <hr style={{ margin: "2rem 40%", color: "#707070" }} />
                </div>
                <div className="story">
                    <p className="story-title"><Link href="/kontakty"><a class="external-link">Kontakty</a></Link></p>
                    <div className="block-paragraph">Míra kontaktů se v první polovině března oproti konci února snížila na přibližně 10 až 11 přímých osobních kontaktů týdně (v týdnu od 8. března), tedy zhruba o jeden kontakt ve srovnání s koncem února. Zpřísněná vládní opatření tak ještě víc stlačila kontakty, které klesaly už během ledna a února, ale zásadní propad nepřinesla. Míra kontaktů je už několik týdnů pod hranicí podzimního minima, ale stále výrazně vyšší než na vrcholu první vlny v druhé polovině března 2020, kdy dospělí měli týdně v průměru 7 blízkých kontaktů týdně.</div>
                </div>
                <div className="story">
                    <p className="story-title"><Link href="/socialni-aktivity"><a class="external-link">Sociální aktivity</a></Link></p>
                    <div className="block-paragraph">Ze sociálních aktivit se nové restrikce dotkly nejvíce návštěv mezi přáteli a rodinou – ty jsou nyní omezené nejvíce od loňského dubna. Ačkoli jejich intenzita pozvolna klesala již od ledna, březen přinesl výrazný propad. Na konci února se aspoň jednou doma s rodinou či přáteli setkalo 47 % lidí, kolem poloviny března to bylo 39 %.</div>
                </div>
                <div className="story">
                    <p className="story-title"><Link href="/home-office"><a class="external-link">Home office</a></Link></p>
                    <div className="block-paragraph">Využívání home office poprvé od podzimu posílilo. V týdnu od 8. března plně z domova pracovalo 18 % pracovně aktivních. Během ledna až února se přitom tato hodnota pohybovala mezi 13 až 15 %. Na pracoviště však stále dochází kolem 70 % lidí – během první vlny na jaře 2020 díky vyšší míře home office, ale také v důsledku pracovních neschopností jen kolem 55 %.</div>
                </div>
                <div className="story">
                    <p className="story-title"><Link href="/jednotlive-protektivni"><a class="external-link">Jednotlivé protektivní aktivity</a></Link></p>
                    <div className="block-paragraph">Podíl lidí, kteří se izolují v prostředí domova a nesetkávají se kromě členů domácnosti s dalšími osobami, od ledna setrvale roste a nové restrikce ho ještě více navýšily. Tuto strategii v první půlce března volilo přes 40 % lidí, dokonce o něco více než na podzim. Zejména díky nevycházení z domu celková míra obezřetnosti před nákazou již od ledna setrvale, i když spíše jen mírně, stoupá.</div>
                </div>
                <div className="story">
                    <p className="story-title"><Link href="/ockovani"><a class="external-link">Očkování</a></Link></p>
                    <div className="block-paragraph">Ochotu k očkování proti koronaviru zdarma vyjadřovalo během první poloviny března stabilně necelých 60 % lidí (zahrnuto je 7 % dospělých, kteří mají za sebou aspoň jednu dávku). V prosinci a lednu to přitom bylo 50 %. Ochota se ale mezi skupinami obyvatel liší – výrazně vyšší je mezi starými ročníky, lidmi s vyšším vzděláním a v Praze. </div>
                </div>
                <div className="story">
                    <p className="story-title"><Link href="/obavy-epidemie"><a class="external-link">Obavy z epidemie</a></Link></p>
                    <div className="block-paragraph">Obavy z epidemie jsou nejvyšší od loňského jara. Velké obavy dělá aktuální situace již od začátku března polovině veřejnosti. V novém roce se také dlouhodobě zhoršilo duševního zdraví – symptomy alespoň středně těžké deprese nebo úzkosti má od ledna 12 až 13 % lidí, během podzimu to bylo 10 až 11 % a ještě před epidemií kolem 6 %. Zhoršení zasáhlo především matky s nezletilými dětmi.</div>
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
