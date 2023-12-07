import withAuth from '../../../shared/authCheckHOC/withAuth'
import NavbarNoAuth from './NavBar/NavbarNoAuth'
import NavbarWithAuth from './NavBar/NavbarWithAuth'
import styles from './header.styles.module.scss'

const Header = () => {
    const isAuthorized = false
    const NavBar = withAuth({
        isAuthorized,
        components: {
            ComponentForAuthorized: NavbarWithAuth,
            ComponentForUnauthorized: NavbarNoAuth,
        },
    })
    return (
        <header className={styles.header}>
            <div className={styles.logoField}>
                <img src='/img/logo.png' alt='logo' className={styles.logoImg} />
                <h1 className={styles.stringLogo}>DnD Character Sheet</h1>
            </div>
            <div className={styles.characterButtonContainer}>
                <button id='navbar-character-button' type='submit'>
                    Choose Character
                </button>
            </div>
            <nav className={styles.navMenuContainer}>
                <NavBar />
            </nav>
        </header>
    )
}

export default Header
