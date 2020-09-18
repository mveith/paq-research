import getSourceData from '../components/dataProvider'
import DataPage from '../components/dataPage';
import ThemeNavigation from '../components/themeNavigation';

const navigation = (<ThemeNavigation previousHref="/protektivni-aktivity" previousTitle="Počet protektivních aktivit" nextHref="/destabilizace-prace" nextTitle="Destabilizace práce" />);

export default function Contacts(props) {
    return <DataPage
        navigation={navigation}
        dataProps={props}
        asLineChart={true}
        max={50}
        nonpercentage={true}
    />;
}

export async function getStaticProps(context) {
    var data = await getSourceData();
    return {
        props: data.contacts
    }
}
