import fs from 'fs';
import path from 'path';
import DataPage from '../components/dataPage';
import ThemeNavigation from '../components/themeNavigation';

const navigation = (<ThemeNavigation previousHref="/pocity" previousTitle="Pocity ohledně koronaviru" nextHref="/dopad" nextTitle="Ekonomické dopady na domácnost" />);

export default function Destabilization(props) {
    return <DataPage
        navigation={navigation}
        dataProps={props}
        title="Jak epidemie ovlivňuje destabilizaci práce?"
        description="Ačkoliv nárůst registrované nezaměstnanosti byl od března malý, důsledky epidemie se stále promítají do života takřka pětiny aktivních Čechů. Okolo 4 % původně reportuje ztrátu práce (část ji částečně nahradila sezónními pracemi). Dalších šestina má ale dodnes omezený úvazek, mzdu, benefity či vedlejší příjmy (DPP, na ruku)."
    />;
}

export async function getStaticProps(context) {
    const filePath = path.join(process.cwd(), 'data.json');
    const fileContent = fs.readFileSync(filePath, 'utf8');
    return {
        props: JSON.parse(fileContent).destabilization
    }
}
