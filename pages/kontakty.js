import fs from 'fs'
import path from 'path'
import DataPage from '../components/dataPage';
import ThemeNavigation from '../components/themeNavigation';

const navigation = (<ThemeNavigation previousHref="/protektivni-aktivity" previousTitle="Počet protektivních aktivit" nextHref="/destabilizace-prace" nextTitle="Destabilizace práce" />);

export default function Contacts(props) {
    return <DataPage
        navigation={navigation}
        dataProps={props}
        title="S kolika lidmi byli respondenti v bližším kontaktu?"
        description="Na začátku epidemie (konec března) se snížil průměrný počet osob, se kterými byl respondent v rámci jednoho týdne v kontaktu na 7. Od konce dubna dochází ke kontinuálnímu nárůstu kontaktů, a začátkem prázdnin už je situace stejná jako před epidemií. Nárůst kontaktů zvyšuje pravděpodobnost komunitního šíření, rizikovost byla ale v létě zřejmě omezena i tím, že často probíhaly venku. Nárůstem kontaktů také vzrostly nároky na trasování (vyhledávání kontaktů nakažených)."
        asLineChart={true}
        max={50}
        nonpercentage={true}
    />;
}

export async function getStaticProps(context) {
    const filePath = path.join(process.cwd(), 'data.json');
    const fileContent = fs.readFileSync(filePath, 'utf8');
    return {
        props: JSON.parse(fileContent).contacts
    }
}
