import getSourceData from '../components/dataProvider'
import DataPage from '../components/dataPage';
import ThemeNavigation from '../components/themeNavigation';

const navigation = (<ThemeNavigation previousHref="/dopad" previousTitle="Ekonomické zasažení domácností" nextHref="/protektivni-aktivity" nextTitle="Počet protektivních aktivit" />);

export default function Strategies(props) {
    return <DataPage
        navigation={navigation}
        dataProps={props}
        asLineChart={true}
    />;
}

export async function getStaticProps(context) {
    var data = await getSourceData();
    return {
        props: data.strategies
    }
}
