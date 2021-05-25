import { combineReducers } from 'redux';

import juniorLogsReducer from './junior-logs/junior.logs.reducer.js';

const juniorPanelReducer = combineReducers({
	junior_logs: juniorLogsReducer
});

export default juniorPanelReducer;