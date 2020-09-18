import getSourceData from '../components/dataProvider'
import DataPage from '../components/dataPage';
import ThemeNavigation from '../components/themeNavigation';

const navigation = (<ThemeNavigation previousHref="/destabilizace-prace" previousTitle="Destabilizace práce" nextHref="/strategie" nextTitle="Reakce a strategie domácností" />);

export default function Impact(props) {
    return <DataPage
        navigation={navigation}
        dataProps={props}
    />;
}

export async function getStaticProps(context) {
    var data = await getSourceData();
    return {
        props: data.impacts
    }
}
