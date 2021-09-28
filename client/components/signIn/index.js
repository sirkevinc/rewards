import { useState } from 'react'
import { useAuth } from '../../lib/auth.js'

const SignIn = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const { signIn } = useAuth();
  
    async function onSubmit(e) {
      e.preventDefault()
      try {
        const result =  await signIn({ email, password });
        props.errorHandler(result);
        
      } catch(err) {
        console.error(err);        
      }
      // signIn({ email, password })
    }
    return (
      <div>
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
          <button onClick={() => props.errorHandler('hi')}>Ok</button>

        </form>
      </div>
    )
  }

  export default SignIn;