import React from 'react';
import {Switch,Route} from "react-router-dom";
import JuniorPayment from "../../Components/JuniorPayment/JuniorPayment";
const JuniorPanel = () => {
    return (
        <div>
            Junior
            <Switch>
                <Route path={'/junior/payment'}>
                    <JuniorPayment/>
                </Route>
            </Switch>
        </div>
    );
}

export default JuniorPanel;

