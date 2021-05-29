import { combineReducers } from 'redux';

//session management
import {persistReducer} from "redux-persist";
import storage from 'redux-persist/lib/storage';

import userReducer from './user/user.reducer';
import juniorPanelReducer from './junior-panel/junior.panel.reducer.js';
import seniorPanelReducer from './senior-panel/senior.panel.reducer.js';

const persistConfig = {
	key: 'root',
	storage,
	whitelist: ['user']
};

const rootReducer = combineReducers({
	user: userReducer,
	junior_panel: juniorPanelReducer,
	senior_panel: seniorPanelReducer
});
export default persistReducer(persistConfig, rootReducer);