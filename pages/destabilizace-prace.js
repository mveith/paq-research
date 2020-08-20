import fs from 'fs';
import path from 'path';
import DataPage from '../components/dataPage';
import ThemeNavigation from '../components/themeNavigation';

const navigation = (<ThemeNavigation previousHref="/" previousTitle="Pocity ohledně koronaviru" nextHref="/dopad" nextTitle="Ekonomické dopady na domácnost" />);

export default function Destabilization(props) {
    return <DataPage
        navigation={navigation}
        dataProps={props}
        title="Jak epidemie ovlivňuje destabilizaci práce?"
        description="Nárůst nezaměstnanosti byl relativně malý, ale ztrátu práce či její výraznou redukci zažilo vice lidí, než ukazují oficiální statistiky (OSVČ a DPP se často nehlásí na ÚP) a další drží Antivirus B v placené neaktivitě. Kromě toho jsou lidé, kterým byl nějak změněn úvazek či se výrazně obávají ztráty práce a jsou na pracovním trhu ohrožení."
        legend={(
            <ul style={{ listStyle: "none", flexBasis: "20%" }}>
                <li>
                    <h2 style={{ color: "#b3b3b3" }}>Zbytek</h2>
                    <p></p>
                </li>
                <li>
                    <h2 style={{ color: "rgb(238, 190, 94)" }}>desPra4_omezeni_domacnost</h2>
                    <p></p>
                </li>
                <li>
                    <h2 style={{ color: "green" }}>desPra3_podzamestnani_nestabilni</h2>
                    <p></p>
                </li>
                <li>
                    <h2 style={{ color: "blue" }}>desPra2_prekarizace</h2>
                    <p></p>
                </li>
                <li>
                    <h2 style={{ color: "rgb(233, 129, 129)" }}>desPra1_celkova_ztrata_prace</h2>
                    <p></p>
                </li>
            </ul>)}
    />;
}

export async function getStaticProps(context) {
    const filePath = path.join(process.cwd(), 'data.json');
    const fileContent = fs.readFileSync(filePath, 'utf8');
    return {
        props: JSON.parse(fileContent).destabilization
    }
}
