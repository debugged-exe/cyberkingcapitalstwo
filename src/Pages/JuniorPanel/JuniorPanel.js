import React from 'react';
import {Switch,Route,withRouter} from "react-router-dom";
import JuniorPayment from "../../Components/JuniorPayment/JuniorPayment";
import JuniorLogs from "../../Components/JuniorLogs/JuniorLogs";
const JuniorPanel = ({match}) => {
    return (
        <div>
        	<Switch>
        		<Route path={`${match.path}/logs`}><JuniorLogs /></Route>
        		<Route path={`${match.path}/payment`}><JuniorPayment/></Route>
        	</Switch>
        </div>
    );
}

export default withRouter(JuniorPanel);

