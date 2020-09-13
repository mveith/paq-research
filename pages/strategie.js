import fs from 'fs';
import path from 'path';
import DataPage from '../components/dataPage';
import ThemeNavigation from '../components/themeNavigation';

const navigation = (<ThemeNavigation previousHref="/dopad" previousTitle="Ekonomické zasažení domácností" nextHref="/protektivni-aktivity" nextTitle="Počet protektivních aktivit" />);

export default function Strategies(props) {
    return <DataPage
        navigation={navigation}
        dataProps={props}
        title="Jak domácnosti reagují na ekonomické problémy?"
        description="Necelá čtvrtina respondentů se v současnosti snaží či chce omezit kvůli dopadům krize svou spotřebu. Od jara jejich počet výrazně poklesl (ze 47&nbsp;%), ale přesto existuje nezanedbatelné riziko omezení domácí poptávky. Počet domácností, které nezvládají splácet závazky či zvažují nové půjčky je nižší, ale naopak stabilní a může se promítnout mimo jiné do nárůstu exekucí."
        asLineChart={true}
        shareImage="strategie"
    />;
}

export async function getStaticProps(context) {
    const filePath = path.join(process.cwd(), 'data.json');
    const fileContent = fs.readFileSync(filePath, 'utf8');
    return {
        props: JSON.parse(fileContent).strategies
    }
}
