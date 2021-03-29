import getMenu from '../components/menuBuilder'
import Head from 'next/head';
import Layout from '../components/layout';

function Arrow({ direction, color }) {
    const arrow = {
        border: `solid ${color}`,
        borderWidth: "0 3px 3px 0",
        display: "inline-block",
        padding: "3px"
    };
    switch (direction) {
        case "up":
            return (<i style={{ ...arrow, transform: "rotate(-135deg)" }}></i>);

        case "down":
            return (<i style={{ ...arrow, transform: "rotate(45deg)" }}></i>);

        default:
            return (<i></i>);
    }
}

function DiffTile({ value, text, color, arrow }) {
    return (
        <div style={{ margin: "1em" }}>
            <div style={{ fontSize: "2em", display: "flex", justifyContent: "space-around", margin: "0 2em" }}>
                <span>{value}</span>
                <span><Arrow direction={arrow} color={color} /></span>
            </div>
            <p style={{ textAlign: "center" }} dangerouslySetInnerHTML={{ __html: text }}></p>
        </div >
    );
}

export default function Page({ menu }) {
    const d = [
        { value: "8 %", text: "má <strong>snížený pracovní úvazek či příjmy</strong> oproti stavu před pandemií", color: "red", arrow: "up" },
        { value: "24 %", text: "domácností je <strong>těžce finančně zasažena</strong> v důsledku pandemie", color: "blue", arrow: "up" },
        { value: "14", text: "týdenní průměr <strong>přímých osobních kontaktů</strong> trvajících alespoň 5 minut", color: "red", arrow: "down" },
        { value: "8 %", text: "má <strong>snížený pracovní úvazek či příjmy</strong> oproti stavu před pandemií", color: "red", arrow: "up" },
        { value: "24 %", text: "domácností je <strong>těžce finančně zasažena</strong> v důsledku pandemie", color: "blue", arrow: "up" },
        { value: "14", text: "týdenní průměr <strong>přímých osobních kontaktů</strong> trvajících alespoň 5 minut", color: "red", arrow: "down" }
    ];
    return (
        <Layout title="Co jsme zjistili z 16. vlny" menuItemsData={menu}>
            <Head>
                <meta key="share-image" property="og:image" content={`https://zivotbehempandemie.cz/rozdily.png`} />
                <meta property="og:description" content="Co jsme zjistili z 16. vlny" />
            </Head>
            <h1>Co jsme zjistili z 16. vlny</h1>


            <div className="diff-grid">
                {d.map(dv => (<DiffTile {...dv} />))}
            </div>

            <div className="blog">
                <h2>Stručně hlavní pozorování?</h2>
                <div className="story" key={`story-1}`}>
                    <p className="story-title">Na homeoffice...</p>
                    <div className="block-paragraph">Test...</div>
                    <hr style={{ margin: "2rem 40%", color: "#707070" }} />
                </div>
                <div className="story" key={`story-2}`}>
                    <p className="story-title">Míra kontaktů...</p>
                    <div className="block-paragraph">Test 2...</div>
                    <hr style={{ margin: "2rem 40%", color: "#707070" }} />
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
