// import { useQuery, gql } from '@apollo/client'
import { useState, useContext, useEffect } from 'react'
import { useRouter } from 'next/router'
import styles from '../../styles/Page.module.css'

import { userContext } from '../../lib/user'
import { useMeQuery } from '../../lib/userQuery'

export default function Dashboard() {
    const { userInfo, userLoading, setUserInfo, setUserLoading } = useContext(userContext);
    const router = useRouter();

    const { loading, error, data } = useMeQuery();

    useEffect(() => {
        if (data) {
            setUserLoading(false)
            setUserInfo(data.me)
        } else {
            setUserLoading(true)
        }
    }, [userLoading, userInfo, data]);

    console.log('Dashboard', userInfo, userLoading)

    if (loading) return <p>Loading ...</p>;
    if (error) {
        const redirect = () => {
            router.push('/login');
        }
        setTimeout(redirect, 1500);
        return `${error} Please return to login page`;
    }
    return (
        <div className={styles.main}>
            IDKLOL

            {data.me?<p>{data.me.email}</p>:<p>Negative...</p>}
        </div>
    )
}