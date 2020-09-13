import DataPage from '../components/dataPage';
import ThemeNavigation from '../components/themeNavigation';

const navigation = (<ThemeNavigation previousHref="/strategie" previousTitle="Reakce a strategie domácností" nextHref="/protektivni-aktivity" nextTitle="Počet protektivních aktivit" />);

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
    const res = await fetch(process.env.PAQ_DATA_PATH);
    const fileContent = await res.text();
    return {
        props: JSON.parse(fileContent).activities
    }
}
