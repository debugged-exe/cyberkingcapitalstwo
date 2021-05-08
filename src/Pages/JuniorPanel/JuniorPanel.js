import React from 'react';
import {Switch,Route,useRouteMatch} from "react-router-dom";
import JuniorPayment from "../../Components/JuniorPayment/JuniorPayment";
import JuniorLogs from "../../Components/JuniorLogs/JuniorLogs";
const JuniorPanel = () => {
    let match = useRouteMatch();
    return (
        <div>
            <JuniorPayment/>
            <JuniorLogs />
        </div>
    );
}

export default JuniorPanel;

