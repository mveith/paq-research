import fs from 'fs'
import path from 'path'
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
    const filePath = path.join(process.cwd(), 'data.json');
    const fileContent = fs.readFileSync(filePath, 'utf8');
    return {
        props: JSON.parse(fileContent).feelings
    }
}
