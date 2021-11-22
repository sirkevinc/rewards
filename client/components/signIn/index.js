import { useState } from 'react'
import { useAuth } from '../../lib/auth.js'
import { useRouter } from 'next/router'

import styles from '../../styles/Component.module.css'

const SignIn = (props) => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const { signIn } = useAuth();
  
    async function onSubmit(e) {
      e.preventDefault()
      try {
        const result =  await signIn({ email, password });
        if (result.graphQLErrors) {
          props.errorHandler(result);
        } else {
          props.errorHandler(null);
          router.push('/dashboard');
        }
      } catch(err) {
        console.error(err);        
      }
    }
    return (
      <div className={styles.signin__container}>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
          ></input>
          <input
            type="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          <button type="submit">Sign In</button>
        </form>
      </div>
    )
  }

  export default SignIn;