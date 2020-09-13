import fs from 'fs'
import path from 'path'
import DataPage from '../components/dataPage';
import ThemeNavigation from '../components/themeNavigation';

const navigation = (<ThemeNavigation previousHref="/destabilizace-prace" previousTitle="Destabilizace práce" nextHref="/strategie" nextTitle="Dopady a strategie domácnosti" />);

export default function Impact(props) {
    return <DataPage
        navigation={navigation}
        dataProps={props}
        title="Jak postihla pandemie ekonomickou situaci domácností?"
        description="Vývoj ekonomiky od začátku epidemie těžce dopadá na zhruba desetinu Čechů – reportují pokles příjmu domácnosti o 30 a více procent a jejich domácnost nemá velké úspory. Domácnosti další čtvrtiny Čechů si pohoršily lehce."
    />;
}

export async function getStaticProps(context) {
    const filePath = path.join(process.cwd(), 'data.json');
    const fileContent = fs.readFileSync(filePath, 'utf8');
    return {
        props: JSON.parse(fileContent).impacts
    }
}
