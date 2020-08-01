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
        <ChartComponent type="doughnut" data={{
          labels: ['Red', 'Blue'],
          datasets: [{
            label: '# of Votes',
            data: [12, 19],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)'
            ],
            borderWidth: 1
          }]
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
