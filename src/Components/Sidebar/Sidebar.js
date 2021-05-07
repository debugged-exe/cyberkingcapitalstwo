import React, {useState} from 'react'
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import './Sidebar.scss';
import {SidebarData} from './SidebarData.js';
import SubMenu from './SubMenu.js';
import Logo from '../../Assets/Images/Logo_3D2.png';

const Sidebar = () => {

    const [sidebar, setSidebar] = useState(false);

    const showSidebar = () => {
        setSidebar(!sidebar);
    }

    return (
        <div className="sidebar-container white">
            <div className="nav shadow-2" style={{display: `${sidebar?'none':'flex'}`}}>
                <div className="logo-container">
                    <img src={Logo} style={{width: '100px', height: '50px'}}/>
                    <p className="logo-title black pl2 f3">Cyberking Capitals</p>
                </div>
                <FaIcons.FaBars size={25} color={'black'}onClick={showSidebar} />
            </div>
            <div className="sidebar-nav shadow-2" style={{left: `${sidebar?'0':'-100%'}`}}>
                <div className="sidebar-wrap">
                    <div className="nav-cross">
                        <AiIcons.AiOutlineClose size={25} color={'black'} onClick={showSidebar} />
                    </div>
                    <img src={Logo} alt="React Logo" style={{width: '75%', margin:'10px'}}/>
                    {
                        SidebarData.senior.map((item,index) => {
                            return(
                                <SubMenu key={index} item={item} />
                            );
                        })
                    }
                </div>
            </div>
        </div>

    )
}

export default Sidebar;