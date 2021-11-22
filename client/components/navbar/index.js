import styles from '../../styles/Component.module.css'
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
    // console.log('navbar', userInfo)
    return (
        <nav className={styles.nav__container}>
            <div className={styles.nav__title}>Rewards Helper</div>
            <div className={styles.nav__links}>
                {userInfo ? <Link href='/dashboard'>Dashboard</Link>: <Link href='/'>Home</Link>}
                <Link href='/cards'>Cards</Link>
                    {userInfo?
                        <div>
                            <button onClick={logOutHandler}>Log Out</button>
                        </div>
                        : 
                <Link href='/login'>Login/Register</Link>
            }
            </div>
        </nav>
    )
}