import { combineReducers } from 'redux';

import adminPaymentReducer from './admin-payment/admin.payment.reducer.js';
import adminCountReducer from './admin-count/admin.count.reducer.js';
import adminRequestReducer from './admin-request/admin.request.reducer.js';
import adminLogsReducer from "./admin-logs/admin.logs.reducer";
import adminOverviewReducer from "./admin-overview/admin.overview.reducer";
import adminAnalyticsReducer from "./admin-analytics/admin.analytics.reducer";
import adminBlockTelecallerReducer from "./admin-block-telecaller/admin.block.telecaller.reducer";

const adminPanelReducer = combineReducers({
	admin_payment: adminPaymentReducer,
	admin_count: adminCountReducer,
	admin_request: adminRequestReducer,
	admin_logs: adminLogsReducer,
	admin_overview: adminOverviewReducer,
	admin_analytics: adminAnalyticsReducer,
	admin_block_telecaller: adminBlockTelecallerReducer
});

export default adminPanelReducer;