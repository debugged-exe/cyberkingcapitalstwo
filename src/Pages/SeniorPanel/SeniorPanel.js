import React from 'react';
import {Switch, Route, withRouter} from 'react-router-dom';
import SeniorPayment from "../../Components/SeniorPayment/SeniorPayment";
import SeniorViewTeam from "../../Components/SeniorViewTeam/SeniorViewTeam";
import SearchByDropdown from "../../Components/SearchByDropdown/SearchByDropdown";

const SeniorPanel = ({match}) => {
    return (
        <div>
        	<Switch>
        		<Route path={`${match.path}/payment`}><SeniorPayment/></Route>
        		<Route path={`${match.path}/team`}><SeniorViewTeam/></Route>
        		<Route path={`${match.path}/search`}><SearchByDropdown/></Route>
        	</Switch>
        </div>
    );
}

export default withRouter(SeniorPanel);

