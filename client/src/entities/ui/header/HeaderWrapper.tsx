import withAuth from '../../../shared/authCheckHOC/withAuth'
import NavbarNoAuth from './NavBar/NavbarNoAuth'
import NavbarWithAuth from './NavBar/NavbarWithAuth'
import styles from './header.styles.module.scss'

const Header = () => {
    const isAuthorized = false
    const NavBar = withAuth({
        isAuthorized, components: {
            ComponentForAuthorized: NavbarWithAuth, ComponentForUnauthorized: NavbarNoAuth
        }
    })
    return (
        <header className={styles.header}>
            <div className='logo-field'>
                <a href='/'>
                    <img src='/img/logo.png' alt='logo' id='logo' />
                </a>
                <a className='str-logo' href='/'>
                    <h1>DnD Character Sheet</h1>
                </a>
            </div>
            <div className={styles.characterButtonContainer}>
                <button
                    id='navbar-character-button'
                    type='submit'
                    className='js-open-modal'>
                    Choose Character
                </button>
            </div>
            <NavBar />
        </header>
    )
}

export default Header