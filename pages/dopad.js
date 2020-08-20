import fs from 'fs'
import path from 'path'
import DataPage from '../components/dataPage';
import ThemeNavigation from '../components/themeNavigation';

const navigation = (<ThemeNavigation previousHref="/destabilizace-prace" previousTitle="Destabilizace práce" nextHref="/" nextTitle="Dopady a strategie domácnosti" />);

export default function Impact(props) {
    var legend = (
        <ul style={{ listStyle: "none", flexBasis: "20%" }}>
            <li>
                <h2 style={{ color: "#b3b3b3" }}>V poho skupina</h2>
                <p>V poho skupina</p>
            </li>
            <li>
                <h2 style={{ color: "rgb(238, 190, 94)" }}>Lehce ekonomicky zasažení</h2>
                <p>Jejich příjem klesl alespoň o 10% a mají úspory alespoň na půl roku</p>
            </li>
            <li>
                <h2 style={{ color: "rgb(233, 129, 129)" }}>Těžce ekonoomicky zasažení</h2>
                <p>Jejich příjem klesl o více než 30% a mají úspory maximálně na 2 měsíce</p>
            </li>
        </ul>);
    return <DataPage
        navigation={navigation}
        dataProps={props}
        title="Jaký má epidemie ekonomický dopad na domácnosti?"
        description="Ekonomické dopady na domácnosti se vyvíjejí - podle toho, jak lidé ztratili práci, či jim byla redukována mzda. Existuje malá velmi riziková skupina zasažená poklesem příjmů a zároveň bez úspor, která může mít velké ekonomické problémy brzy + skupina lehčeji zasažených lidí, která může měnit spotřební chování, či ji může krize dostihnout později." 
        legend={legend}
    />;
}

export async function getStaticProps(context) {
    const filePath = path.join(process.cwd(), 'data.json');
    const fileContent = fs.readFileSync(filePath, 'utf8');
    return {
        props: JSON.parse(fileContent).impacts
    }
}
