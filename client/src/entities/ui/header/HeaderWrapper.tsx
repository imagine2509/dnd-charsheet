import { useNavigate } from 'react-router'
import PrimaryButton from '../../../shared/UIKit/Buttons/PrimaryButton'
import withAuth from '../../../shared/authCheckHOC/withAuth'
import NavbarNoAuth from './NavBar/NavbarNoAuth'
import NavbarWithAuth from './NavBar/NavbarWithAuth'
import styles from './header.styles.module.scss'

const Header = () => {
    const navigate = useNavigate()
    const isAuthorized = false
    const NavBar = withAuth({
        isAuthorized,
        components: {
            ComponentForAuthorized: NavbarWithAuth,
            ComponentForUnauthorized: NavbarNoAuth,
        },
    })

    const handleCharSelectionOpen = () => {
        console.log('something');

    }

    return (
        <header className={styles.header}>
            <div className={styles.logoField}>
                <img src='/img/logo.png' alt='logo' className={styles.logoImg} onClick={() => navigate('/')} />
                <h1 className={styles.stringLogo} onClick={() => navigate('/')}>DnD Character Sheet</h1>
            </div>
            <div className={styles.characterButtonContainer}>
                <PrimaryButton content='Choose Character' onClick={handleCharSelectionOpen} />
            </div>
            <nav className={styles.navMenuContainer}>
                <NavBar />
            </nav>
        </header>
    )
}

export default Header
