import React from 'react';
import AdminPayment from '../../Components/AdminPayment/AdminPayment.js';
import AdminRegistration from '../../Components/AdminRegistration/AdminRegistration.js';
import {Route, Switch, withRouter} from 'react-router-dom';
import AdminRequest from "../../Components/AdminRequest/AdminRequest";
import AdminViewTeam from "../../Components/AdminViewTeam/AdminViewTeam";
import AdminViewLogs from "../../Components/AdminViewLogs/AdminViewLogs";
import ProfileSection from "../../Components/ProfileSection/ProfileSection";
const AdminPanel = ({match,user}) => {
    return (
        <div>
        	<Switch>
				<Route path={`${match.path}/profile`}><ProfileSection user={user}/></Route>
        		<Route path={`${match.path}/payment`}><AdminPayment /></Route>
        		<Route path={`${match.path}/register`}><AdminRegistration /></Route>
				<Route path={`${match.path}/requests`}><AdminRequest /></Route>
				<Route path={`${match.path}/overview`}><AdminViewTeam /></Route>
				<Route path={`${match.path}/logs`}><AdminViewLogs /></Route>
        	</Switch>
        </div>
    );
}

export default withRouter(AdminPanel);

