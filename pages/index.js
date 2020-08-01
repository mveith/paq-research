import Head from 'next/head'
import styles from '../styles/Home.module.css'
import ChartComponent from "../components/chart"

export default function Home() {
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
          <div style={{ display: "flex", flexDirection: "column", flexBasis: "100%", flex: "1", margin: "10px" }}>
            <ChartComponent chartId="work" height="450px" type="line" data={{
              labels: ["1. týden", "2. týden", "3. týden", "4. týden", "5. týden", "6. týden", "7. týden", "8. týden", "9. týden", "10. týden"],
              datasets: [{
                data: [26.8, 23.0, 13.9, 13.9, 16.4, 17.5, 18.3, 19.1, 19.1, 20.7],
                label: "Průměrný počet lidí, s kterými byli v kontaktu",
                borderColor: "#3e95cd",
                fill: false,
                lineTension: 0
              }]
            }} options={{
              responsive: true,
              maintainAspectRatio: false,
              title: {
                display: true,
                text: 'Byl(a) v práci (plně či částečně)'
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
                    labelString: "Průměrný počet lidí, s kterými byli v kontaktu"
                  }
                }]
              }
            }} /></div>
          <div style={{ display: "flex", flexDirection: "column", flexBasis: "100%", flex: "1", margin: "10px" }}>
            <ChartComponent chartId="remote" height="450px" type="line" data={{
              labels: ["1. týden", "2. týden", "3. týden", "4. týden", "5. týden", "6. týden", "7. týden", "8. týden", "9. týden", "10. týden"],
              datasets: [{
                data: [17.5, 7.1, 5.5, 3.7, 4.7, 4.4, 6.2, 6.8, 7.6, 9.0],
                label: "Průměrný počet lidí, s kterými byli v kontaktu",
                borderColor: "#3e95cd",
                fill: false,
                lineTension: 0
              }]
            }} options={{
              responsive: true,
              maintainAspectRatio: false,
              title: {
                display: true,
                text: 'Měl(a) home-office'
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
                    labelString: "Průměrný počet lidí, s kterými byli v kontaktu"
                  }
                }]
              }
            }} /></div>

          <div style={{ display: "flex", flexDirection: "column", flexBasis: "100%", flex: "1", margin: "10px" }}>
            <ChartComponent chartId="nothing" height="450px" type="line" data={{
              labels: ["1. týden", "2. týden", "3. týden", "4. týden", "5. týden", "6. týden", "7. týden", "8. týden", "9. týden", "10. týden"],
              datasets: [{
                data: [9.2, 5.9, 4.0, 2.9, 4.6, 4.4, 5.8, 5.8, 6.5, 6.4],
                label: "Průměrný počet lidí, s kterými byli v kontaktu",
                borderColor: "#3e95cd",
                fill: false,
                lineTension: 0
              }]
            }} options={{
              responsive: true,
              maintainAspectRatio: false,
              title: {
                display: true,
                text: 'Nepracoval(a)'
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
                    labelString: "Průměrný počet lidí, s kterými byli v kontaktu"
                  }
                }]
              }
            }} /></div>
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
