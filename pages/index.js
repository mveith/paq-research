import Head from 'next/head'
import styles from '../styles/Home.module.css'
import ChartComponent from "../components/chart"
import fs from 'fs'
import path from 'path'

function LineChart(props) {
  return <ChartComponent chartId={props.id} height="450px" type="line" data={{
    labels: props.labels,
    datasets: [props.dataset]
  }} options={{
    responsive: true,
    maintainAspectRatio: false,
    title: {
      display: true,
      text: props.title
    },
    plugins: {
      datalabels: {
        align: "end"
      }
    },
    legend: { display: false },
    layout: {
      padding: {
        left: 0,
        right: 20,
        top: 0,
        bottom: 0
      }
    },
    scales: {
      xAxes: [{ gridLines: { display: false } }],
      yAxes: [{
        gridLines: {
          display: false
        },
        ticks: {
          display: false,
          suggestedMin: 0,
          suggestedMax: 30
        },
        scaleLabel: {
          display: true,
          labelString: props.yAxisLabel
        }
      }]
    }
  }} />;
}

export default function Home(props) {
  const charts = props.charts.map((c, i) => {
    return (<div style={{ display: "flex", flexDirection: "column", flexBasis: "100%", flex: "1", margin: "10px" }} key={`chart-${i}`}>
      <LineChart
        id={`chart-${i}`}
        labels={props.labels}
        dataset={{
          data: c.data,
          label: c.valueLabel,
          borderColor: "#3e95cd",
          fill: false,
          lineTension: 0
        }}
        title={c.title}
        yAxisLabel={c.valueLabel}
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
