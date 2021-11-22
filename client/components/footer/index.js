import styles from '../../styles/Component.module.css'

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <a
                href='http://github.com/sirkevinc'
                target='_blank'
                rel="noopener noreferrer"
            >
                Created by SirKevinC
            </a>
        </footer>
    )
}
