import React from 'react';
import AdminPayment from '../../Components/AdminPayment/AdminPayment.js';
import AdminRegistration from '../../Components/AdminRegistration/AdminRegistration.js';

import {Route, Switch, withRouter} from 'react-router-dom';

import './AdminPanel.scss';

const AdminPanel = ({match}) => {
    return (
        <div>
        	<Switch>
        		<Route path={`${match.path}/payment`}><AdminPayment /></Route>
        		<Route path={`${match.path}/register`}><AdminRegistration /></Route>
        	</Switch>
        </div>
    );
}

export default withRouter(AdminPanel);

