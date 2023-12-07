import styles from '../header.styles.module.scss'


const NavbarNoAuth = () => {
    return (
        <ul className={styles.navUl}>
            <li className={styles.navItem}>
                <button className={styles.navLink} id='login-link'>
                    Login
                </button>
            </li>
            <li className={styles.navLink}>
                <button className={styles.navLink} id='reg-link'>
                    Register
                </button>
            </li>
        </ul>
    )
}

export default NavbarNoAuth
