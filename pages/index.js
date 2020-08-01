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
        <ChartComponent width="800" height="450" type="line" data={{
          labels: ["1. týden", "2. týden", "3. týden", "4. týden", "5. týden", "6. týden", "7. týden", "8. týden", "9. týden", "10. týden"],
          datasets: [{
            data: [26.8, 23.0, 13.9, 13.9, 16.4, 17.5, 18.3, 19.1, 19.1, 20.7],
            label: "Průměrný počet lidí, s kterými byli v kontaktu",
            borderColor: "#3e95cd",
            fill: false
          }]
        }} options={{
          responsive: true,
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
        }} />
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
    </div>
  )
}
