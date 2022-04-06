import React from 'react';
import {Switch,Route,withRouter} from "react-router-dom";
import JuniorPayment from "../../Components/JuniorPayment/JuniorPayment";
import JuniorLogs from "../../Components/JuniorLogs/JuniorLogs";
import ProfileSection from "../../Components/ProfileSection/ProfileSection";
import JuniorReferFriend from "../../Components/JuniorReferFriend/JuniorReferFriend";
import JuniorBox from '../../Components/JuniorBox/JuniorBox';

const JuniorPanel = ({match,user}) => {
    alert(JSON.stringify(match))
    return (
        <div>
        	<Switch>
            <Route path={`${match.path}/fetch`} exact ><JuniorBox/></Route>
				<Route path={`${match.path}/profile`}><ProfileSection /></Route>
        		<Route path={`${match.path}/logs`}><JuniorLogs /></Route>
        		<Route path={`${match.path}/payment`}><JuniorPayment/></Route>
                <Route path={`${match.path}/refer_friend`}><JuniorReferFriend/></Route>
        	</Switch>
        </div>
    );
}

export default withRouter(JuniorPanel);

