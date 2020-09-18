import getSourceData from '../components/dataProvider'
import DataPage from '../components/dataPage';
import ThemeNavigation from '../components/themeNavigation';

const navigation = (<ThemeNavigation previousHref="/strategie" previousTitle="Reakce a strategie domácností" nextHref="/kontakty" nextTitle="Kontakt s lidmi" />);

export default function Protection(props) {
    return <DataPage
        navigation={navigation}
        dataProps={props}
    />;
}

export async function getStaticProps(context) {
    var data = await getSourceData();
    return {
        props: data.protection
    }
}
