import { createContext } from 'react'
import { useAuth } from '../lib/auth'


const userContext = createContext({ user: {name: "test"} });
const { isSignedIn } = useAuth();

export { userContext };
