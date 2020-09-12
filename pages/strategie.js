import fs from 'fs';
import path from 'path';
import DataPage from '../components/dataPage';
import ThemeNavigation from '../components/themeNavigation';

const navigation = (<ThemeNavigation previousHref="/dopad" previousTitle="Ekonomické dopady na domácnosti" nextHref="/protektivni-aktivity" nextTitle="Počet protektivních aktivit" />);

export default function Strategies(props) {
    return <DataPage
        navigation={navigation}
        dataProps={props}
        title="K jakým řešením své momentální finanční situace domácnosti přistupují?"
        description="Necelá čtvrtina respondentů se v současnosti snaží či chce omezit kvůli dopadům krize svou spotřebu. Od jara jejich počet výrazně poklesl (ze 45&nbsp;%), ale přesto existuje nezanedbatelné riziko omezení domácí poptávky. Počet domácností, které nezvládají splácet závazky či zvažují nové půjčky je nižší, ale naopak stabilní a může se promítnout mimo jiné do nárůstu exekucí."
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
