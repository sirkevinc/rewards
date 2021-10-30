import styles from '../../styles/Home.module.css'
import SignUp from '../../components/signUp'
import { useAuth } from '../../lib/auth.js'
import { useRouter } from 'next/router'

import { userContext } from '../../lib/user'

import { useState, useEffect, useContext } from 'react'

export default function Register() {
  const { userInfo, userLoading } = useContext(userContext);
  const [error, setError] = useState();
  const errorHandler = (err) => {
    setError(err);
  }
  const router = useRouter();

  useEffect(() => {
    if (userInfo) {
      router.push('/dashboard');
    }
  }, [userInfo, userLoading]);

  return (
    <div>
        <h1>Register</h1>
        {error?<p>{error.message}</p>:null}
        <SignUp errorHandler={errorHandler}/>
    </div>
  );
}
