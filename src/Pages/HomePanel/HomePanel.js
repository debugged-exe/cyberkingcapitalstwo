import React from 'react';
import './HomePanel.scss';
import BasicCourseForm from "../../Components/BasicCourseForm/BasicCourseForm";
import {
    Switch,
    Route,
    withRouter
} from "react-router-dom";
import ProCourseForm from "../../Components/ProCourseForm/ProCourseForm";

const HomePanel = ({}) => {
    return(<div>
            <h1>Home Page</h1>
    </div>);
}

export default HomePanel;