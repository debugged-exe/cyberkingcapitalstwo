import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as BsIcons from 'react-icons/bs';
import * as AiIcons from 'react-icons/ai';
import * as FiIcons from 'react-icons/fi';
import * as CgIcons from 'react-icons/cg';
import * as MdIcons from 'react-icons/md';
import * as BiIcons from 'react-icons/bi';
import * as IoIcons from 'react-icons/io';
import * as RiIcons from 'react-icons/ri';
import * as GrIcons from 'react-icons/gr';
import * as SiIcons from 'react-icons/si';
import * as ImIcons from 'react-icons/im';

export const SidebarData = {
    client: [
        {
            title: 'Sign in',
            path: '/',
            icon: <AiIcons.AiFillHome />
        }
    ],
    admin: [
        {
            path: '/admin/profile',
            title: "My Profile",
            icon: <CgIcons.CgProfile size={'2rem'}/>
        },
        {
            path: '/admin/overview',
            title: "Team Overview",
            icon: <AiIcons.AiOutlineTeam size={'2rem'} />
        },
        {
            path: '/admin/payment',
            title: "Payment Details",
            icon: <MdIcons.MdPayment size={'2rem'} />
        },
        {
            path: '/admin/logs',
            title: "View Logs",
            icon: <BiIcons.BiSpreadsheet size={'2rem'}/>
        },
        {
            path: '/admin/requests',
            title: "Requests",
            icon: <BiIcons.BiSelectMultiple size={'2rem'}/>
        },
        {
            path: '/admin/register',
            title: "Register Telecaller",
            icon: <AiIcons.AiOutlineUserAdd size={'2rem'}/>
        },
        {
            path: '/admin/counts',
            title: "View Counts",
            icon: <GrIcons.GrScorecard size={'2rem'}/>
        },
        {
            path: '/admin/update-password',
            title: "Update Password",
            icon: <GrIcons.GrPowerReset size={'2rem'}/>
        },
        {
            path: '/admin/analytics',
            title: "Telecaller Analytics",
            icon: <SiIcons.SiGoogleanalytics size={'2rem'}/>
        },
        {
            path: '/admin/block',
            title: "Block Telecaller",
            icon: <ImIcons.ImBlocked size={'2rem'}/>
        },
        {
            path: '/',
            title: "Sign Out",
            icon: <FiIcons.FiLogOut size={'2rem'}/>
        }
    ],
    junior: [
        {
            path: '/junior/profile',
            title: "My Profile",
            icon: <CgIcons.CgProfile size={'2rem'}/>
        },
        {
            path: '/junior/payment',
            title: "Payment Details",
            icon: <MdIcons.MdPayment size={'2rem'} />
        },
        {
            path: '/junior/logs',
            title: "View Logs",
            icon: <BiIcons.BiSpreadsheet size={'2rem'}/>
        },
        {
            path: '/',
            title: "Sign Out",
            icon: <FiIcons.FiLogOut size={'2rem'}/>
        },
        {
            path: '/junior/refer_friend',
            title: "Refer a Friend",
            icon: <FaIcons.FaUserFriends size={'2rem'}/>
        }
    ],
    senior: [
        {
            path: '/senior/profile',
            title: "My Profile",
            icon: <CgIcons.CgProfile size={'2rem'}/>
        },
        {
            path: '/senior/payment',
            title: "Payment Details",
            icon: <MdIcons.MdPayment size={'2rem'} />
        },
        {
            path: '/senior/team',
            title: "View Team",
            icon: <BsIcons.BsPeopleFill size={'2rem'} />
        },
        {
            path: '/senior/handover',
            title: "Handed over Leads",
            icon: <RiIcons.RiHandCoinLine size={'2rem'}/>
        },
        {
            path: '/senior/search',
            title: "Search For Leads",
            icon: <BsIcons.BsSearch size={'2rem'}/>
        },
        {
            path: '/senior/counts',
            title: "View Counts",
            icon: <GrIcons.GrScorecard size={'2rem'}/>
        },
        {
            path: '/',
            title: "Sign Out",
            icon: <FiIcons.FiLogOut size={'2rem'}/>
        }
    ]
}