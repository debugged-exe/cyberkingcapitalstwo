import {AdminOverviewActionTypes} from "./admin.overview.types";

//destructing the action types
const {SET_SENIOR_TELECALLER_ARRAY, SET_OVERVIEW_FILTER, SET_JR_VIEW, SET_JUNIOR_LOG_ARRAY, SET_JUNIOR_LOG_VIEW} = AdminOverviewActionTypes;

export const setAdminSeniorTelecallerArray = array => ({
	type: SET_SENIOR_TELECALLER_ARRAY,
	payload: array
});

export const setAdminOverviewFilter = filter => ({
	type: SET_OVERVIEW_FILTER,
	payload: filter
});

export const setJrView = visible => ({
	type: SET_JR_VIEW,
	payload: visible
});

export const setJuniorLogArray = array => ({
	type: SET_JUNIOR_LOG_ARRAY,
	payload: array
});

export const setJuniorLogView = visible => ({
	type: SET_JUNIOR_LOG_VIEW,
	payload: visible
});