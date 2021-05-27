import { combineReducers } from 'redux';

import juniorLogsReducer from './junior-logs/junior.logs.reducer.js';
import juniorPaymentReducer from './junior-payment/junior.payment.reducer';

const juniorPanelReducer = combineReducers({
	junior_logs: juniorLogsReducer,
	junior_payment: juniorPaymentReducer
});

export default juniorPanelReducer;