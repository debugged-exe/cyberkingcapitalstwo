import React from 'react';

// components
import AdminPayment from '../../Components/AdminPayment/AdminPayment.js';
import AdminRegistration from '../../Components/AdminRegistration/AdminRegistration.js';
import {Route, Switch, withRouter} from 'react-router-dom';
import AdminRequest from "../../Components/AdminRequest/AdminRequest";
import AdminViewTeam from "../../Components/AdminViewTeam/AdminViewTeam";
import AdminViewLogs from "../../Components/AdminViewLogs/AdminViewLogs";
import ProfileSection from "../../Components/ProfileSection/ProfileSection";
import AdminCounts from "../../Components/AdminCounts/AdminCounts";
import AdminUpdatePassword from "../../Components/AdminUpdatePassword/AdminUpdatePassword";
import TelecallerAnalytics from "../../Components/TelecallerAnalytics/TelecallerAnalytics";
import AdminBlockTelecaller from "../../Components/AdminBlockTelecaller/AdminBlockTelecaller";
import AdminSendId from '../../Components/AdminSendId/AdminSendId.js';
import { AdminDeleteLead } from '../../Components/AdminDeleteLead/AdminDeleteLead.js';

const AdminPanel = ({match}) => {
    return (
        <div>
        	<Switch>
				<Route path={`${match.path}/profile`}><ProfileSection /></Route>
        		<Route path={`${match.path}/payment`}><AdminPayment /></Route>
        		<Route path={`${match.path}/register`}><AdminRegistration /></Route>
				<Route path={`${match.path}/requests`}><AdminRequest /></Route>
				<Route path={`${match.path}/overview`}><AdminViewTeam /></Route>
				<Route path={`${match.path}/counts`}><AdminCounts /></Route>
				<Route path={`${match.path}/logs`}><AdminViewLogs /></Route>
				<Route path={`${match.path}/update-password`}><AdminUpdatePassword /></Route>
				<Route path={`${match.path}/analytics`}><TelecallerAnalytics /></Route>
				<Route path={`${match.path}/block`}><AdminBlockTelecaller/></Route>
				<Route path={`${match.path}/sendid`}><AdminSendId/></Route>
				<Route path={`${match.path}/deletelead`}><AdminDeleteLead/></Route>
        	</Switch>
        </div>
    );
}

export default withRouter(AdminPanel);

