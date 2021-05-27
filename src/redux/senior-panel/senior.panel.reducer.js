import { combineReducers } from 'redux';

import seniorPaymentReducer from './senior-payment/senior.payment.reducer.js';

const seniorPanelReducer = combineReducers({
	senior_payment: seniorPaymentReducer
});

export default seniorPanelReducer;