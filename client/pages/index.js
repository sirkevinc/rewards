import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

import { useEffect, useContext } from 'react'
import { userContext } from '../lib/user'
import { useRouter } from 'next/router'

export default function Home() {
  const { userInfo, userLoading } = useContext(userContext);
  const router = useRouter();

  useEffect(() => {
    if (userInfo && !userLoading) {
      router.push('/dashboard');
    }
  }, [userInfo, userLoading]);
  return (
    <div>
      <Head>
        <title>Rewards Helper</title>
        <meta name="description" content="Helpful tool for credit card rewards" />
        <link rel="icon" href="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20100%20100%22%3E%3Ctext%20y%3D%22.9em%22%20font-size%3D%2290%22%3E%F0%9F%92%B3%EF%B8%8F%3C%2Ftext%3E%3C%2Fsvg%3E" type="image/svg+xml" />
        {/* <link rel="icon" href="/credit-card.svg" /> */}
      </Head>
      <main className={styles.main}>
        Hi
      </main>

      {/* <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <p className={styles.description}>
          Get started by editing{' '}
          <code className={styles.code}>pages/index.js</code>
        </p>

        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h2>Documentation &rarr;</h2>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h2>Learn &rarr;</h2>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/master/examples"
            className={styles.card}
          >
            <h2>Examples &rarr;</h2>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
          >
            <h2>Deploy &rarr;</h2>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div>
      </main> */}
    </div>
  )
}
