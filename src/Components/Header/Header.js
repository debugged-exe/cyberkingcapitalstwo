import React from 'react';
import './Header.scss';
import Logo from '../../Assets/Images/Logo_3D2.png';
import {Link} from "react-router-dom";
import {FiMenu} from 'react-icons/fi';
const Header = () =>{
    return(
        <div className={'nav shadow-2'}>
            <Link className={'logo ma1'} to={'/'}><img src={Logo} /></Link>
            <div className={'nav-links'}>
                <Link className={'nav-item-link'}>Sign out</Link>
            </div>
            <div className={'menu-icon'}>
                <FiMenu className={'mt2'} size={50} />
            </div>
        </div>
    )
}
export default Header;