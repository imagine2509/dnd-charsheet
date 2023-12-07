
import styles from '../header.styles.module.scss'

const NavbarWithAuth = () => {

    const handleLogout = () => {
        console.log('logout');

    }

    return (
        <ul className={styles.navUl}>
            <li className={styles.navItem}>
                <button
                    className={styles.navLink}
                    id='logout-link'
                    onClick={handleLogout}>
                    Logout
                </button>
            </li>
        </ul>
    )
}

export default NavbarWithAuth