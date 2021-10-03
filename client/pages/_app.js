import '../styles/globals.css'
import Layout from '../components/layout'
import { AuthProvider } from '../lib/auth'
import { UserContextProvider } from '../lib/user'

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <UserContextProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </UserContextProvider>
    </AuthProvider>
  )
}

export default MyApp
