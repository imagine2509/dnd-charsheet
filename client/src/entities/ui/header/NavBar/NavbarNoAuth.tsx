import { Menu, MenuProps } from "antd";
import { useState } from "react";

const NavbarNoAuth = () => {
    const [current, setCurrent] = useState('login');

    const onClick: MenuProps['onClick'] = (e) => {
        setCurrent(e.key);
    };

    const items: MenuProps['items'] = [
        {
            label: 'Login',
            key: 'login',
        },
        {
            label: 'Register',
            key: 'register',
        },

    ]
    return (
        <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
    )
}

export default NavbarNoAuth