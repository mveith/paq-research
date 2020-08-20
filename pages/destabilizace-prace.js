import fs from 'fs';
import path from 'path';
import DataPage from '../components/dataPage';
import ThemeNavigation from '../components/themeNavigation';
import Legend from '../components/legend';

const navigation = (<ThemeNavigation previousHref="/" previousTitle="Pocity ohledně koronaviru" nextHref="/dopad" nextTitle="Ekonomické dopady na domácnost" />);

export default function Destabilization(props) {
    const legend = {
        items: [
            { color: "#b3b3b3", title: "Zbytek", description: "" },
            { color: "rgb(238, 190, 94)", title: "desPra4_omezeni_domacnost", description: "" },
            { color: "green", title: "desPra3_podzamestnani_nestabilni", description: "" },
            { color: "blue", title: "desPra2_prekarizace", description: "" },
            { color: "rgb(233, 129, 129)", title: "desPra1_celkova_ztrata_prace", description: "" }
        ]
    };
    return <DataPage
        navigation={navigation}
        dataProps={props}
        title="Jak epidemie ovlivňuje destabilizaci práce?"
        description="Nárůst nezaměstnanosti byl relativně malý, ale ztrátu práce či její výraznou redukci zažilo vice lidí, než ukazují oficiální statistiky (OSVČ a DPP se často nehlásí na ÚP) a další drží Antivirus B v placené neaktivitě. Kromě toho jsou lidé, kterým byl nějak změněn úvazek či se výrazně obávají ztráty práce a jsou na pracovním trhu ohrožení."
        legend={<Legend {...legend} />}
    />;
}

export async function getStaticProps(context) {
    const filePath = path.join(process.cwd(), 'data.json');
    const fileContent = fs.readFileSync(filePath, 'utf8');
    return {
        props: JSON.parse(fileContent).destabilization
    }
}
