import Navbar from '../navbar'
import Footer from '../footer'
import styles from '../../styles/Home.module.css'

export default function Layout({ children }) {
    return (
        <div className={styles.container}>
            <Navbar />
            <main className={styles.main}>{children}</main>
            <Footer />
        </div>
    )
}