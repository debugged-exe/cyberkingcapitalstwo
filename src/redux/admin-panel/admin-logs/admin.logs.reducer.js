import {AdminLogsActionTypes} from "./admin.logs.types";

//destructing the actiontypes
const {SET_ADMIN_LOGS_ARRAY} = AdminLogsActionTypes;

const INITIAL_STATE = {
    filter: '*',
    filterValue: '',
    preferred_language: '',
    lead_table_array: []
}

const adminLogsReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case SET_ADMIN_LOGS_ARRAY:
            return {
                ...state,
                lead_table_array: action.payload
            }
        default:
            return state;
    }
}

export default adminLogsReducer;