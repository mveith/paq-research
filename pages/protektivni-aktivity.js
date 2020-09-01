import fs from 'fs';
import path from 'path';
import DataPage from '../components/dataPage';
import ThemeNavigation from '../components/themeNavigation';

const navigation = (<ThemeNavigation previousHref="/aktivity" previousTitle="Celkový profil aktivit" nextHref="/kontakty" nextTitle="Kontakt s lidmi" />);

export default function Destabilization(props) {
    return <DataPage
        navigation={navigation}
        dataProps={props}
        title="Jak časté jsou různé formy protekce před nákazou?"
        description="Jak časté jsou různé formy protekce před nákazou??"
    />;
}

export async function getStaticProps(context) {
    const filePath = path.join(process.cwd(), 'data.json');
    const fileContent = fs.readFileSync(filePath, 'utf8');
    return {
        props: JSON.parse(fileContent).protection
    }
}
