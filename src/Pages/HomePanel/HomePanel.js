import React from 'react';
import './HomePanel.scss';
import {
    Switch,
    Route,
    withRouter,
    Link
} from "react-router-dom";

const HomePanel = ({}) => {
    return(<div>
            <h1 className={'f1 tc'}>Press Sign in Button to proceed further</h1>
        <div className={'w-100 flex justify-center items-center'}>
            <button className={'bg-light-red'}><Link to={'/signin'}>SIGN IN</Link></button>
        </div>
    </div>);
}

export default HomePanel;