import { useQuery, gql } from '@apollo/client'
import styles from '../../styles/Page.module.css'

import { useAuth } from '../../lib/auth'
// import { useEffect } from 'react'

const MeQuery = gql`
    {
        me {
            id
            username
            email
        }
    }
`

export default function MyCards() {
    const { loading, error, data } = useQuery(MeQuery);
    const { isSignedIn } = useAuth();

    // useEffect(isSignedIn);

    console.log(data)

    if (loading) return <p>Loading ...</p>;
    if (error) return `Error! ${error}`;
    return (
        <div>
            IDKLOL
        </div>
    )
}