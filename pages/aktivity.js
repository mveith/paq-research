import fs from 'fs'
import path from 'path'
import DataPage from '../components/dataPage';
import ThemeNavigation from '../components/themeNavigation';

const navigation = (<ThemeNavigation previousHref="/strategie" previousTitle="Dopady a strategie domácnosti" nextHref="/protektivni-aktivity" nextTitle="Počet protektivních aktivit" />);

export default function Actvities(props) {
    return <DataPage
        navigation={navigation}
        dataProps={props}
        title="Jak se vyvíjely sociální aktivity od začátku epidemie koronaviru?"
        description="Od začátku epidemie lidé dramaticky omezovali společenské aktivity, které by mohly být potenciálně rizikové z hlediska šíření nákazy. Opětovný nárůst kopíroval rozvolnění vládních opatření a nastával postupně od konce května. Na podzim můžeme očekávat další snížení v závislosti na vývoji epidemie."
        asLineChart={true}
    />;
}

export async function getStaticProps(context) {
    const filePath = path.join(process.cwd(), 'data.json');
    const fileContent = fs.readFileSync(filePath, 'utf8');
    return {
        props: JSON.parse(fileContent).activities
    }
}
