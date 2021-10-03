import { useQuery, gql } from '@apollo/client'
import { useState, useContext, useEffect } from 'react'
import { useRouter } from 'next/router'
import styles from '../../styles/Page.module.css'
import Card from '../../components/card'

import { userContext } from '../../lib/user'
import { useMeQuery } from '../../lib/userQuery'

const MeQuery = gql`
    {
        me {
            id
            username
            email
            cards {
                bank
                name
            }
        }
    }
`

export default function Dashboard() {
    const { userInfo, userLoading, setUserInfo, setUserLoading } = useContext(userContext);
    const router = useRouter();

    const { loading, error, data } = useMeQuery();
    console.log('Dashboard userquery', data);

    useEffect(() => {
        if (data) {
            setUserLoading(false)
            setUserInfo(data.me)
        } else {
            setUserLoading(true)
        }
    }, [userLoading, userInfo, data]);

    console.log('Dashboard Context', userInfo, userLoading)

    if (loading) return <p>Loading ...</p>;
    if (error) {
        const redirect = () => {
            router.push('/login');
        }
        setTimeout(redirect, 1500);
        return `${error} Please return to login page`;
    }
    return (
        <div>
            IDKLOL
            {data.me?<p>{data.me.email}</p>:<p>Negative...</p>}
        </div>
    )
}