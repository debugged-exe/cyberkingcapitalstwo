import {createStore } from 'redux';

//for session management
import {persistStore} from 'redux-persist';

import logger from 'redux-logger';

import rootReducer from './root-reducer';

const middlewares = [];

if(process.env.NODE_ENV==='development')
{
	middlewares.push(logger);
}

export const store = createStore(rootReducer);
export const persistor = persistStore(store);
