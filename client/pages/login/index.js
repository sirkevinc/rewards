import styles from '../../styles/Page.module.css'
import SignIn from '../../components/signIn'
import { useRouter } from 'next/router'
import Link from 'next/link'

import { userContext } from '../../lib/user'

import { useState, useEffect, useContext } from 'react'

export default function Login() {
  const { userInfo, userLoading } = useContext(userContext);
  const [error, setError] = useState();
  const errorHandler = (err) => {
    setError(err);
  }
  const router = useRouter();

  useEffect(() => {
    console.log('login', userInfo)
    if (userInfo) {
      router.push('/dashboard');
    }
  }, [userInfo, userLoading]);
  return (
    <section className={styles.content}>
      <div className={styles.login__container}>
        <h1>Login</h1>
        {error?<p>{error.message}</p>:null}
        <SignIn errorHandler={errorHandler}/>
        <p>Don't Have an account? Register <Link href="/register">here</Link>!</p>
      </div>
    </section>
  );
}
