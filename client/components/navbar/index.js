import styles from '../../styles/Home.module.css'
import { useContext } from 'react'
import { userContext } from '../../lib/user'
import { useAuth } from '../../lib/auth'

export default function Navbar() {
    const { userInfo } = useContext(userContext);
    const { signOut } = useAuth();
    const logOutHandler = (e) => {
        e.preventDefault();
        signOut();
        window.location.href="http://localhost:3000/login"
    }
    console.log('navbar', userInfo)
    return (
        <nav className={styles.nav}>
            Dis a navbar
            {userInfo?
                <div>
                    User: {userInfo.username}
                    Email: {userInfo.email}
                    <button onClick={logOutHandler}>Log Out</button>
                </div>
                : 
                <p>Login/Register</p>
            }
        </nav>
    )
}