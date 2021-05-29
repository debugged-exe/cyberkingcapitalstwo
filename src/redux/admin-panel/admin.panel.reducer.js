import { combineReducers } from 'redux';

import adminPaymentReducer from './admin-payment/admin.payment.reducer.js';
import adminCountReducer from './admin-count/admin.count.reducer.js';
import adminRequestReducer from './admin-request/admin.request.reducer.js';

const adminPanelReducer = combineReducers({
	admin_payment: adminPaymentReducer,
	admin_count: adminCountReducer,
	admin_request: adminRequestReducer
});

export default adminPanelReducer;