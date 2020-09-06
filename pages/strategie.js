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
        description="Více pětina respondentů v současnosti snaží či chce omezit kvůli důsledkům krize svou spotřebu. Od jara ale jejich počet výrazně poklesl (ze 45 %), ale přesto existuje riziko omezení domácí poptávky. Počet domácností, které nezvládají splácet závazky či zvažují nové půjčky je nižší, ale naopak stabilní a může se projevit mimo jiné do nárůstu exekucí."
        asLineChart={true}
    />;
}

export async function getStaticProps(context) {
    const filePath = path.join(process.cwd(), 'data.json');
    const fileContent = fs.readFileSync(filePath, 'utf8');
    return {
        props: JSON.parse(fileContent).strategies
    }
}
