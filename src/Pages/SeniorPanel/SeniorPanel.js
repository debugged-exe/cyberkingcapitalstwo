import React from 'react';
import {Switch, Route, withRouter} from 'react-router-dom';
import SeniorPayment from "../../Components/SeniorPayment/SeniorPayment";
import SeniorViewTeam from "../../Components/SeniorViewTeam/SeniorViewTeam";
import SearchByDropdown from "../../Components/SearchByDropdown/SearchByDropdown";
import ProfileSection from "../../Components/ProfileSection/ProfileSection";
import SeniorHandoverLeads from '../../Components/SeniorHandoverLeads/SeniorHandoverLeads.js';
import SeniorCounts from "../../Components/SeniorCounts/SeniorCounts";

const SeniorPanel = ({match,user}) => {
    return (
        <div>
        	<Switch>
				<Route path={`${match.path}/profile`}><ProfileSection/></Route>
        		<Route path={`${match.path}/payment`}><SeniorPayment/></Route>
        		<Route path={`${match.path}/team`}><SeniorViewTeam/></Route>
        		<Route path={`${match.path}/search`}><SearchByDropdown/></Route>
                <Route path={`${match.path}/handover`}><SeniorHandoverLeads/></Route>
				<Route path={`${match.path}/counts`}><SeniorCounts/></Route>
        	</Switch>
        </div>
    );
}

export default withRouter(SeniorPanel);

