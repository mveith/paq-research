import DataPage from '../components/dataPage';
import ThemeNavigation from '../components/themeNavigation';

const navigation = (<ThemeNavigation previousHref="/kontakty" previousTitle="Kontakt s lidmi" nextHref="/destabilizace-prace" nextTitle="Destabilizace práce" />);

export default function Feelings(props) {
    return <DataPage
        navigation={navigation}
        dataProps={props}
        title="Pocity ohledně koronaviru"
        description="Jaké mají respondenti pocity ohledně probíhající epidemie koronaviru?"
    />;
}

export async function getStaticProps(context) {
    const res = await fetch(process.env.PAQ_DATA_PATH);
    const fileContent = await res.text();
    return {
        props: JSON.parse(fileContent).feelings
    }
}
