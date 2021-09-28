import { useState } from 'react'
import { useAuth } from '../../lib/auth.js'

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const { signIn } = useAuth();
  
    function onSubmit(e) {
      e.preventDefault()
      signIn({ email, password })
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
        </form>
      </div>
    )
  }

  export default SignIn;