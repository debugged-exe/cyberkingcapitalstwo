import React from "react";

// redux
import {connect} from 'react-redux';

// css
import './ProfileSection.scss';

const ProfileSection = ({currentUser}) => {
    return(<div className={'profile-container h-100 mt6'}>
        <div className={'profile-tag f1 b'} data-aos="fade-down" data-aos-duration={'2000'}>Welcome Back!</div>
        <div className={'profile-name f2 mt4'} data-aos={"fade-up"} data-aos-duration={'2000'}>Telecaller Name: {currentUser.username}</div>
        <div className={'profile-id f2'} data-aos={"fade-up"} data-aos-duration={'2000'}>Telecaller Id: {currentUser.telecaller_id}</div>
    </div>);
}

const mapStateToProps = ({user: {currentUser}}) => ({
	currentUser: currentUser
})

export default connect(mapStateToProps)(ProfileSection);