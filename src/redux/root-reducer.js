import { combineReducers } from 'redux';

import userReducer from './user/user.reducer';
import juniorPanelReducer from './junior-panel/junior.panel.reducer.js';
import seniorPanelReducer from './senior-panel/senior.panel.reducer.js';

export default combineReducers({
	user: userReducer,
	junior_panel: juniorPanelReducer,
	senior_panel: seniorPanelReducer
});