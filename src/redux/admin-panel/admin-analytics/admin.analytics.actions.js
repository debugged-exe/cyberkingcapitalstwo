import {AdminAnalyticsActionTypes} from "./admin.analytics.types";

//destructing the action types
const {SET_ADMIN_ANALYTICS_COUNT, SET_ADMIN_ANALYTICS_LOGS} = AdminAnalyticsActionTypes;

export const setAdminAnalyticsCount = array => ({
	type: SET_ADMIN_ANALYTICS_COUNT,
	payload: array
})

export const setAdminAnalyticsLogs = array => ({
	type: SET_ADMIN_ANALYTICS_LOGS,
	payload: array
})