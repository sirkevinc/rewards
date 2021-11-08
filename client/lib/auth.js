import React, { useContext, createContext } from 'react'
import {
    ApolloProvider,
    ApolloClient,
    InMemoryCache,
    HttpLink,
    gql,
} from '@apollo/client'
import jwt_decode from 'jwt-decode'
import Cookies from 'js-cookie'

const authContext = createContext();

export function AuthProvider({ children }) {
    const auth = useProvideAuth();

    return (
        <authContext.Provider value={auth}>
            <ApolloProvider client={auth.createApolloClient()}>
                    {children}
            </ApolloProvider>
        </authContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(authContext);
}

function useProvideAuth() {
    const createApolloClient = () => {
        const link = new HttpLink({
            uri: 'http://localhost:4000/graphql',
            headers: getAuthHeaders(),
        })

        return new ApolloClient({
            link,
            cache: new InMemoryCache(),
        }) 
    };
    
    const isSignedIn = async () => {
        const token = Cookies.get('token');
        if (token) {
            const { exp } = jwt_decode(token);
            const expirationTime = (exp*1000) - 60000;
            if (Date.now() >= expirationTime) {
                Cookies.remove('token');
            }
            console.log("IsSignedIn");
            const client = createApolloClient();
            const meQuery = gql `
                query {
                    me {
                        id
                        email
                        username
                    }
                }
                `;
            try {
                const result = await client.query({
                    query: meQuery,
                });
                const currentUser = result.data.me;
                // console.log('currentUser', currentUser)
                return currentUser;
            } catch (err) {
                throw new Error (err);
            }
        } else {
            return false;
        }
    };

    const getAuthHeaders = () => {
        const cookieToken = Cookies.get('token');
        // console.log('authtoken', authToken);
        // console.log('cookieToken...?', cookieToken)
        if (!cookieToken) return null;
        return {
            authorization: `Bearer ${cookieToken}`,
        }
    };

    const signIn = async({ email, password }) => {
        const client = createApolloClient();
        const LoginMutation = gql `
            mutation login($email: String!, $password: String!) {
                login(email: $email, password: $password) {
                    token
                    user {
                        id
                        email
                        username
                    }
                }
            }
        `
        try {
            const result = await client.mutate({
                mutation: LoginMutation,
                variables: { email, password },
            });
            console.log(result);
            if (result?.data?.login?.token) {
                const cookieToken = result.data.login.token;
                Cookies.set('token', cookieToken, { expires: 7 });
                return cookieToken;
            }
        } catch(err) {
            return err;
        }
    };

    const signUp = async({ username, email, password }) => {
        const client = createApolloClient();
        const SignUpMutation = gql`
            mutation createUser($username: String!, $email: String!, $password: String!) {
                createUser(username: $username, email: $email, password: $password) {
                    token
                }
            }
        `
        try {
            const result = await client.mutate({
                mutation: SignUpMutation,
                variables: { username, email, password },
            });
            console.log('register result', result);
            if (result?.data?.createUser?.token) {
                const cookieToken = result.data.createUser.token;
                Cookies.set('token', cookieToken, { expires: 7 });
                return cookieToken;
            }
        } catch(err) {
            return err;
        }
    }

    const signOut = () => {
        Cookies.remove('token');
    }

    return {
        isSignedIn,
        signIn,
        signOut,
        signUp,
        createApolloClient,
    }
}