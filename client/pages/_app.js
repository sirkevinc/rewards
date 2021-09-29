import '../styles/globals.css'
import Layout from '../components/layout'


// import {
//   ApolloProvider,
//   ApolloClient,
//   InMemoryCache,
//   HttpLink,
// } from '@apollo/client'

// function createApolloClient() {
//   const link = new HttpLink({
//     uri: 'http://localhost:4000/graphql',
//   })

//   return new ApolloClient({
//     link,
//     cache: new InMemoryCache(),
//   })
// }

// function MyApp({ Component, pageProps }) {
//   return (
//     <ApolloProvider client={createApolloClient()}>
//       <Layout>
//         <Component {...pageProps} />
//       </Layout>
//     </ApolloProvider>
//   )
// }

// import { AuthProvider } from '../lib/auth.js'

// function MyApp({ Component, pageProps }) {
//   return (
//     <AuthProvider>
//       <Layout>
//         <Component {...pageProps} />
//       </Layout>
//     </AuthProvider>
//   )
// }

// export default MyApp



import { AuthProvider } from '../lib/auth.js'

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  )
}

export default MyApp
