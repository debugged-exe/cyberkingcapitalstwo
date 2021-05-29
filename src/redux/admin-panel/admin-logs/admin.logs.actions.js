import {AdminLogsActionTypes} from "./admin.logs.types";

//destructing the actiontypes
const {SET_ADMIN_LOGS_ARRAY} = AdminLogsActionTypes;

export const setAdminLogsArray = array => ({
    type: SET_ADMIN_LOGS_ARRAY,
    payload: array
});