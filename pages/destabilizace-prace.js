import getSourceData from '../components/dataProvider'
import DataPage from '../components/dataPage';
import ThemeNavigation from '../components/themeNavigation';

const navigation = (<ThemeNavigation previousHref="/kontakty" previousTitle="Kontakt s lidmi" nextHref="/dopad" nextTitle="Ekonomické zasažení domácností" />);

export default function Destabilization(props) {
    return <DataPage
        navigation={navigation}
        dataProps={props}
    />;
}

export async function getStaticProps(context) {
    var data = await getSourceData();
    return {
        props: data.destabilization
    }
}
