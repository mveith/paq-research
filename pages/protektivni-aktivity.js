import fs from 'fs';
import path from 'path';
import DataPage from '../components/dataPage';
import ThemeNavigation from '../components/themeNavigation';

const navigation = (<ThemeNavigation previousHref="/strategie" previousTitle="Reakce a strategie domácností" nextHref="/kontakty" nextTitle="Kontakt s lidmi" />);

export default function Protection(props) {
    return <DataPage
        navigation={navigation}
        dataProps={props}
        title="Jak časté jsou různé formy ochrany před nákazou?"
        description="Ostražitost populace se v průběhu posledních měsíců výrazně mění. Během jarní vlny epidemie dělaly dvě pětiny respondentů téměř všechny zkoumané protektivní aktivity (nošení roušky, pečlivé mytí rukou, omezování fyzických kontaktů a pobytu na přelidněných místech, atd.). Dnes to je jen okolo sedminy respondentů. Naopak více než polovina přijímá v současnosti menšinu těchto ochranných opatření."
    />;
}

export async function getStaticProps(context) {
    const filePath = path.join(process.cwd(), 'data.json');
    const fileContent = fs.readFileSync(filePath, 'utf8');
    return {
        props: JSON.parse(fileContent).protection
    }
}
