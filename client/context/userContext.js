import { createContext } from 'react'

const userContext = createContext({ user: { name: "test" }});

export { userContext };
