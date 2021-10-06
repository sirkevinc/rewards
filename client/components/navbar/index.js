import styles from '../../styles/Home.module.css'
import { useContext } from 'react'
import { userContext } from '../../lib/user'
import { useAuth } from '../../lib/auth'
import Link from 'next/link'

export default function Navbar() {
    const { userInfo } = useContext(userContext);
    const { signOut } = useAuth();
    const logOutHandler = (e) => {
        e.preventDefault();
        signOut();
        window.location.href="http://localhost:3000/"
    }
    console.log('navbar', userInfo)
    return (
        <nav className={styles.nav}>
            <Link href='/'>Home</Link>
            {userInfo?
                <div>
                    User: {userInfo.username}
                    Email: {userInfo.email}
                    <button onClick={logOutHandler}>Log Out</button>
                </div>
                : 
                <Link href='/login'>Login/Register</Link>
            }
        </nav>
    )
}