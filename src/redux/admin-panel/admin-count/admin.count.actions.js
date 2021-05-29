import {AdminCountActionTypes} from "./admin.count.types";

//destructing the action types
const {SET_ADMIN_COUNT_ARRAY} = AdminCountActionTypes;

export const setAdminCountArray = array => ({
	type: SET_ADMIN_COUNT_ARRAY,
	payload: array
});