import { combineReducers } from 'redux';

import seniorPaymentReducer from './senior-payment/senior.payment.reducer.js';
import seniorViewTeamReducer from './senior-view-team/senior.view.team.reducer.js';
import seniorHandoverReducer from './senior-handover/senior.handover.reducer.js';

const seniorPanelReducer = combineReducers({
	senior_payment: seniorPaymentReducer,
	senior_view_team: seniorViewTeamReducer,
	senior_handover: seniorHandoverReducer
});

export default seniorPanelReducer;