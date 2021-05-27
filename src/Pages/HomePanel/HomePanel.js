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
            <h1>Home Page</h1>
            <button className={'bg-light-red'}><Link to={'/signin'}>SIGN IN</Link></button>
    </div>);
}

export default HomePanel;