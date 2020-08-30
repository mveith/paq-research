import fs from 'fs'
import path from 'path'
import DataPage from '../components/dataPage';
import ThemeNavigation from '../components/themeNavigation';

const navigation = (<ThemeNavigation previousHref="/destabilizace-prace" previousTitle="Destabilizace práce" nextHref="/" nextTitle="Dopady a strategie domácnosti" />);

export default function Impact(props) {
    return <DataPage
        navigation={navigation}
        dataProps={props}
        title="Jaký má epidemie ekonomický dopad na domácnosti?"
        description="Ekonomické dopady na domácnosti se vyvíjejí - podle toho, jak lidé ztratili práci, či jim byla redukována mzda. Existuje malá velmi riziková skupina zasažená poklesem příjmů a zároveň bez úspor, která může mít velké ekonomické problémy brzy + skupina lehčeji zasažených lidí, která může měnit spotřební chování, či ji může krize dostihnout později."
    />;
}

export async function getStaticProps(context) {
    const filePath = path.join(process.cwd(), 'data.json');
    const fileContent = fs.readFileSync(filePath, 'utf8');
    return {
        props: JSON.parse(fileContent).impacts
    }
}
