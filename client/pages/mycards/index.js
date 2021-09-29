import { useQuery, gql } from '@apollo/client'
import { useContext, useEffect } from 'react'
import { useRouter } from 'next/router'
import styles from '../../styles/Page.module.css'

import { useAuth } from '../../lib/auth'
import { userContext } from '../../context/userContext'
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
    const router = useRouter();
    const user = useContext(userContext);
    const { loading, error, data } = useQuery(MeQuery);

    // useEffect(isSignedIn);

    console.log('mycards', user)
    useEffect(() => {
        if (!user) {
            router.push('/login')
        }
    })
    if (loading) return <p>Loading ...</p>;
    if (error) return `Error! ${error}`;
    return (
        <div>
            IDKLOL
        </div>
    )
}