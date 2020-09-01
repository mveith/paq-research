import fs from 'fs'
import path from 'path'
import DataPage from '../components/dataPage';
import ThemeNavigation from '../components/themeNavigation';

const navigation = (<ThemeNavigation previousHref="/protektivni-aktivity" previousTitle="Počet protektivních aktivit" nextHref="/pocity" nextTitle="Pocity ohledně koronaviru" />);

export default function Contacts(props) {
    return <DataPage
        navigation={navigation}
        dataProps={props}
        title="S kolika lidmi byli respondenti v bližším kontaktu?"
        description="S kolika lidmi byli respondenti v bližším kontaktu?"
        asLineChart={true}
        max={50}
    />;
}

export async function getStaticProps(context) {
    const filePath = path.join(process.cwd(), 'data.json');
    const fileContent = fs.readFileSync(filePath, 'utf8');
    return {
        props: JSON.parse(fileContent).contacts
    }
}
