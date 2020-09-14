import DataPage from '../components/dataPage';
import ThemeNavigation from '../components/themeNavigation';

const navigation = (<ThemeNavigation previousHref="/kontakty" previousTitle="Kontakt s lidmi" nextHref="/dopad" nextTitle="Ekonomické zasažení domácností" />);

export default function Destabilization(props) {
    return <DataPage
        navigation={navigation}
        dataProps={props}
        title="Jak dopadla pandemie na pracovní život?"
        description="Ačkoliv nárůst oficiálně registrované nezaměstnanosti byl od března malý, důsledky epidemie se stále promítají do života šestiny pracovně aktivních Čechů. Okolo 3&nbsp;% současně reportuje ztrátu práce (část ji částečně nahradila sezónními pracemi). Dalších 12&nbsp;% dotázaných má ale dodnes omezený úvazek, mzdu či vedlejší příjmy (DPP, na ruku)."
        shareImage="destabilizace"
    />;
}

export async function getStaticProps(context) {
    const res = await fetch(process.env.PAQ_DATA_PATH);
    const fileContent = await res.text();
    return {
        props: JSON.parse(fileContent).destabilization
    }
}
