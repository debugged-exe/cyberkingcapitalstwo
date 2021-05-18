import React from "react";
import './ProfileSection.scss';

const ProfileSection = ({user}) => {
    return(<div className={'profile-container h-100 mt6'}>
        <div className={'profile-tag f1 b'} data-aos="fade-down" data-aos-duration={'2000'}>Welcome Back!</div>
        <div className={'profile-name f2 mt4'} data-aos={"fade-up"} data-aos-duration={'2000'}>Telecaller Name: {user.username}</div>
        <div className={'profile-id f2'} data-aos={"fade-up"} data-aos-duration={'2000'}>Telecaller Id: {user.telecaller_id}</div>
    </div>);
}

export default ProfileSection;