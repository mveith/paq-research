import fs from 'fs';
import path from 'path';
import DataPage from '../components/dataPage';
import ThemeNavigation from '../components/themeNavigation';

const navigation = (<ThemeNavigation previousHref="/dopad" previousTitle="Ekonomické dopady na domácnosti" nextHref="/protektivni-aktivity" nextTitle="Počet protektivních aktivit" />);

export default function Destabilization(props) {
    return <DataPage
        navigation={navigation}
        dataProps={props}
        title="K jakým řešením své momentální finanční situace domácnosti přistupují?"
        description="Domácnosti na popsané změny práce a výpadky rozpočtu reagují, což dopadá na jejich hospodaření. Buď se snaží o redukci některých výdajů (to dělá asi 20-25 % dotázaných), ale u menší části domácností sledujeme i vážnější problémy – a to neschopnost splácet některé výdaje či snahu řešit problémy půjčkami."
    />;
}

export async function getStaticProps(context) {
    const filePath = path.join(process.cwd(), 'data.json');
    const fileContent = fs.readFileSync(filePath, 'utf8');
    return {
        props: JSON.parse(fileContent).strategies
    }
}
