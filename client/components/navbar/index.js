import styles from '../../styles/Home.module.css'
import { useContext } from 'react'
import { userContext } from '../../context/userContext'

export default function Navbar() {
    const user = useContext(userContext);
    return (
        <nav className={styles.nav}>
            Dis a navbar
            {user?<div>
                User: {user.username}
                Email: {user.email}
            </div>: <p>Login/Register</p>}
        </nav>
    )
}