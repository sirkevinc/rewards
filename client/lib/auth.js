import React, { useState, useContext, createContext, useEffect } from 'react'
import {
    ApolloProvider,
    ApolloClient,
    InMemoryCache,
    HttpLink,
    gql,
} from '@apollo/client'
import Cookies from 'js-cookie'

import { userContext } from '../context/userContext'

const authContext = createContext();

export function AuthProvider({ children }) {
    const auth = useProvideAuth();
    const [user, setUser] = useState();

    useEffect(() => {
        const fetchUser = async() => {
            const currentUser = await auth.isSignedIn();
            setUser(currentUser);     
        }
        fetchUser().catch(console.error);
    }, []);

    return (
        <authContext.Provider value={auth}>
            <userContext.Provider value={user}>
                <ApolloProvider client={auth.createApolloClient()}>
                        {children}
                </ApolloProvider>
            </userContext.Provider>
        </authContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(authContext);
}

function useProvideAuth() {
    const [authToken, setAuthToken] = useState(null);

    const isSignedIn = async () => {
        if (Cookies.get('token')) {
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
                console.log('currentUser', currentUser)
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
        console.log('authtoken', authToken);
        console.log('cookieToken...?', cookieToken)
        if (!cookieToken) return null;
        return {
            authorization: `Bearer ${cookieToken}`,
        }
    };

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
    
    const signIn = async({ email, password }) => {
        const client = createApolloClient();
        const LoginMutation = gql `
            mutation login($email: String!, $password: String!) {
                login(email: $email, password: $password) {
                    token
                }
            }
        `
        try {
            const result = await client.mutate({
                mutation: LoginMutation,
                variables: { email, password },
            });
            if (result?.data?.login?.token) {
                const cookieToken = result.data.login.token;
                Cookies.set('token', cookieToken, { expires: 7 });
                return cookieToken;
                // console.log('authtoken!', authToken)
                // console.log('cookie', Cookies.get('token'))
            }
        } catch(err) {
            return err;
        }
    };

    const signOut = () => {
        setAuthToken(null);
        Cookies.remove('token');
    }

    return {
        setAuthToken,
        isSignedIn,
        signIn,
        signOut,
        createApolloClient,
    }
}