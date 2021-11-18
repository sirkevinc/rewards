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
    <div className={styles.main}>
      <Head>
        <title>Rewards Helper</title>
        <meta name="description" content="Helpful tool for credit card rewards" />
        <link rel="icon" href="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20100%20100%22%3E%3Ctext%20y%3D%22.9em%22%20font-size%3D%2290%22%3E%F0%9F%92%B3%EF%B8%8F%3C%2Ftext%3E%3C%2Fsvg%3E" type="image/svg+xml" />
        {/* <link rel="icon" href="/credit-card.svg" /> */}
      </Head>
      <div className={styles.home__content}>
        <div className={styles.home__top}>
          <header>
            <div className={styles.home__title}>Credit card rewards simplified</div>
            {/* <img src={`/images/credit-card.svg`} /> */}
          </header>
          <section className={styles.home__description}>
            <p>With so many credit cards offering different rewards depending on what is purchased, too many consumers fail to use their best credit cards to optimize the amount of rewards they receive.</p>
            <p>We're here to help with that.</p>
          </section>
        </div>
        <section className={styles.home__features}>
          <header>Features</header>
          <p>Create an account and manage your profile by adding your current credit cards</p>
          <p>View detailed information about different cards and their benefits</p>
          <p>Get recommendations on the best cards to use based on rewards</p>
        </section>
      </div>
    </div>
  )
}
