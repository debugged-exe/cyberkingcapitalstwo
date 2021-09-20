import {AdminAnalyticsActionTypes} from "./admin.analytics.types";

const initialState = {
	admin_analytics_count: null,
	admin_analytics_logs: null
}

//destructing the action types
const {SET_ADMIN_ANALYTICS_COUNT} = AdminAnalyticsActionTypes;

const adminAnalyticsReducer = (state = initialState, { type, payload }) => {
	switch (type) {

	case SET_ADMIN_ANALYTICS_COUNT:
		return {
			...state,
			admin_analytics_count: payload
		}
	default:
		return state
	}
}

export default adminAnalyticsReducer;