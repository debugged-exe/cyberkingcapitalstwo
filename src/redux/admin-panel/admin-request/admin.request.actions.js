import {AdminRequestActionTypes} from "./admin.request.types";

//destructing the action types
const {SET_ADMIN_CODED_REQUEST_ARRAY, SET_ADMIN_DELETE_REQUEST_ARRAY} = AdminRequestActionTypes;

export const setAdminCodedRequestArray = array => ({
	type: SET_ADMIN_CODED_REQUEST_ARRAY,
	payload: array
});

export const setAdminDeleteRequestArray = array => ({
	type: SET_ADMIN_DELETE_REQUEST_ARRAY,
	payload: array
});