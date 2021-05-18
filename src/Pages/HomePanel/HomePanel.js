import React from 'react';
import './HomePanel.scss';
import BasicCourseForm from "../../Components/BasicCourseForm/BasicCourseForm";
import {
    Switch,
    Route,
    withRouter
} from "react-router-dom";

const HomePanel = () => {
    return(<div>
        <h1>Home Page</h1>
        <div className={''}>
            <BasicCourseForm />
        </div>

    </div>);
}

export default HomePanel;