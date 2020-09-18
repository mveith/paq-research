import getSourceData from '../components/dataProvider'
import DataPage from '../components/dataPage';
import ThemeNavigation from '../components/themeNavigation';

const navigation = (<ThemeNavigation previousHref="/destabilizace-prace" previousTitle="Destabilizace práce" nextHref="/strategie" nextTitle="Reakce a strategie domácností" />);

export default function Impact(props) {
    return <DataPage
        navigation={navigation}
        dataProps={props}
        title="Jak postihla pandemie ekonomickou situaci domácností?"
        description="Vývoj ekonomiky od začátku epidemie těžce dopadá na zhruba desetinu Čechů – reportují pokles příjmu domácnosti o 30 a více procent a jejich domácnost nemá velké úspory. Domácnosti další čtvrtiny Čechů si pohoršily lehce."
        shareImage="dopady"
    />;
}

export async function getStaticProps(context) {
    var data = await getSourceData();
    return {
        props: data.impacts
    }
}
