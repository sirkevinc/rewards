import styles from '../../styles/Home.module.css'
import SignIn from '../../components/signIn'
import { useAuth } from '../../lib/auth.js'

import { useState, useEffect } from 'react'

// import { useState } from 'react'

// export default function Login() {
//     return (
//             <h1 className={styles.title}>
//                 This is really just a test
//             </h1>
//     )
// }

// import React from 'react';
// import { useForm } from 'react-hook-form';

export default function Login() {
  const { isSignedIn, signOut } = useAuth();
  // const [user, setUser] = useState({});
  const [error, setError] = useState();
  const errorHandler = (err) => {
    setError(err);
  }

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     const currentUser = await isSignedIn();
  //     setUser(currentUser)
  //   }
  //   fetchUser().catch(console.error);
  // }, []);
  return (
    <div>
        <h1>Login Page</h1>
        {/* {user?<p>Current User Id: {user.email}</p>:<p>Not Logged In</p>} */}
        {error?<p>{error.message}</p>:null}
        <SignIn errorHandler={errorHandler}/>

        <button onClick={isSignedIn}>Check current</button>
        <button onClick={signOut}>Sign Out</button>
        {/* <button onClick={() => errorHandler('hi')}>Ok</button> */}
    </div>
  );
}
