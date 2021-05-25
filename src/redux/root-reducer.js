import { combineReducers } from 'redux';

import userReducer from './user/user.reducer';
import juniorPanelReducer from './junior-panel/junior.panel.reducer.js';

export default combineReducers({
	user: userReducer,
	junior_panel: juniorPanelReducer
});