import { Menu, MenuProps } from "antd";
import { useState } from "react";

const NavbarWithAuth = () => {
    const [current, setCurrent] = useState('login');

    const onClick: MenuProps['onClick'] = (e) => {
        setCurrent(e.key);
    };

    const items: MenuProps['items'] = [
        {
            label: 'Logout',
            key: 'logout',
        }
    ]

    return (
        <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
    )
}

export default NavbarWithAuth