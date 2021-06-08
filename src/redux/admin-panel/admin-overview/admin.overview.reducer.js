import {AdminOverviewActionTypes} from "./admin.overview.types";

//destructing the action types
const {SET_SENIOR_TELECALLER_ARRAY, SET_OVERVIEW_FILTER, SET_JR_VIEW} = AdminOverviewActionTypes;

const initialState = {
    senior_telecaller_array: [],
    overview_filter: 'hindi',
    jrView: false
}

const adminOverviewReducer = (state = initialState, {type, payload}) => {
    switch (type) {

        case SET_SENIOR_TELECALLER_ARRAY:
            return {
                ...state,
                senior_telecaller_array: payload
            }

        case SET_OVERVIEW_FILTER:
            return {
                ...state,
                overview_filter: payload
            }

        case SET_JR_VIEW:
            return {
                ...state,
                jrView: payload
            }

        default:
            return state
    }
}

export default adminOverviewReducer;