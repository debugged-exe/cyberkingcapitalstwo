import {AdminAnalyticsActionTypes} from "./admin.analytics.types";

//destructing the action types
const {SET_ADMIN_ANALYTICS_COUNT} = AdminAnalyticsActionTypes;

export const setAdminAnalyticsCount = array => ({
	type: SET_ADMIN_ANALYTICS_COUNT,
	payload: array
})