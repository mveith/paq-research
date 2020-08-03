import Head from 'next/head'
import styles from '../styles/Home.module.css'
import fs from 'fs'
import path from 'path'
import dynamic from 'next/dynamic'

const Chart = dynamic(
  () => import('../components/chart'),
  { ssr: false }
)
function LineChart(props) {
  var coordinates = props.labels.map((l, i) => {
    return {
      value: props.chart.data[i],
      wave: i
    };
  });
  const frameProps = {
    lines: [
      {
        coordinates: coordinates
      }
    ],
    size: [400, 450],
    margin: { left: 80, bottom: 90, right: 50, top: 40 },
    xAccessor: "wave",
    yAccessor: "value",
    yExtent: [0, 30],
    lineStyle: (d, i) => ({
      stroke: "#3e95cd",
      strokeWidth: 2,
      fill: "none"
    }),
    title: (
      <text textAnchor="middle">
        {props.chart.title}
      </text>
    ),
    axes: [
      {
        orient: "left",
        label: props.chart.valueLabel,
        tickLineGenerator: ({ xy }) => { return null; }
      },
      {
        orient: "bottom",
        tickValues: props.labels.map((l, i) => i),
        tickFormat: i => props.labels[i],
        tickLineGenerator: ({ xy }) => { return null; }
      }],
    showLinePoints: true,
    hoverAnnotation: true,
    tooltipContent: d => (
      <div>
        <p><strong>{d.wave}. týden: </strong><br />
          {props.chart.valueLabel}: {d.value}</p>
      </div>
    )
  };
  return <Chart {...frameProps} />;
}

export default function Home(props) {
  const charts = props.charts.map((c, i) => {
    return (<div style={{ display: "flex", flexDirection: "column", flexBasis: "100%", flex: "1", margin: "10px" }} key={`chart-${i}`}>
      <LineChart
        id={`chart-${i}`}
        labels={props.labels}
        chart={c}
      />
    </div>);
  });
  return (
    <div className={styles.container}>
      <Head>
        <title>PAQ Research</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>

        <h1>Život během pandemie</h1>
        <h2>Aktivity - vývoj typů chování v čase</h2>

        <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", width: "100%" }}>
          {charts}
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://www.paqresearch.cz/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="/paqresearch.png" alt="PAQ Research Logo" className={styles.logo} />
        </a>
      </footer>
    </div >
  )
}

export async function getStaticProps(context) {
  const filePath = path.join(process.cwd(), 'data.json');
  const fileContent = fs.readFileSync(filePath, 'utf8');
  return {
    props: JSON.parse(fileContent)
  }
}
