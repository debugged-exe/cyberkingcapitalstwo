import {AdminOverviewActionTypes} from "./admin.overview.types";

//destructing the action types
const {SET_SENIOR_TELECALLER_ARRAY, SET_OVERVIEW_FILTER} = AdminOverviewActionTypes;

export const setAdminSeniorTelecallerArray = array => ({
	type: SET_SENIOR_TELECALLER_ARRAY,
	payload: array
});

export const setAdminOverviewFilter = filter => ({
	type: SET_OVERVIEW_FILTER,
	payload: filter
});