import styles from '../../styles/Home.module.css'
import SignIn from '../../components/signIn'
import { useAuth } from '../../lib/auth.js'
import { useRouter } from 'next/router'
import Link from 'next/link'

import { userContext } from '../../lib/user'

import { useState, useEffect, useContext } from 'react'

export default function Login() {
  const { isSignedIn } = useAuth();
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
    // const fetchUser = async () => {
    //   const currentUser = await isSignedIn();
    //   if (currentUser) {
    //     router.push('/dashboard');
    //   }
    // }
    // fetchUser().catch(console.error);
  }, [userInfo]);
  return (
    <div>
        <h1>Login Page</h1>
        {/* {user?<p>Current User Id: {user.email}</p>:<p>Not Logged In</p>} */}
        {error?<p>{error.message}</p>:null}
        <SignIn errorHandler={errorHandler}/>
        <p>Don't Have an account? Register <Link href="/register">here</Link>!</p>

        {/* <button onClick={signOut}>Sign Out</button> */}
        {/* <button onClick={() => errorHandler('hi')}>Ok</button> */}
    </div>
  );
}
