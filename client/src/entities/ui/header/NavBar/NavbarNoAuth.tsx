import { useNavigate } from 'react-router'
import PrimaryButton from '../../../../shared/UIKit/Buttons/PrimaryButton'
import styles from '../header.styles.module.scss'


const NavbarNoAuth = () => {
    const navigate = useNavigate()

    return (
        <ul className={styles.navUl}>
            <li className={styles.navItem}>
                <PrimaryButton content='Login' onClick={() => navigate('/login')} />
            </li>
            <li className={styles.navItem}>
                <PrimaryButton content='Register' onClick={() => navigate('/register')} />
            </li>
        </ul>
    )
}

export default NavbarNoAuth
