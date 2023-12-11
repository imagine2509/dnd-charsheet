
import { useNavigate } from 'react-router';
import PrimaryButton from '../../../../shared/UIKit/Buttons/PrimaryButton';
import styles from '../header.styles.module.scss'

const NavbarWithAuth = () => {
    const navigate = useNavigate()

    const handleLogout = () => {
        console.log('logout');

    }

    return (
        <ul className={styles.navUl}>
            <li className={styles.navItem}>
                <PrimaryButton content='Logout' onClick={() => { handleLogout(); navigate('/') }} />
            </li>
        </ul>
    )
}

export default NavbarWithAuth