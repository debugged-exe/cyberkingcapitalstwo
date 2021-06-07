import {AdminOverviewActionTypes} from "./admin.overview.types";

//destructing the action types
const {SET_SENIOR_TELECALLER_ARRAY, SET_OVERVIEW_FILTER} = AdminOverviewActionTypes;

const initialState = {
	senior_telecaller_array: [],
	overview_filter: 'hindi'
}

const  adminOverviewReducer = (state = initialState, { type, payload }) => {
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

	default:
		return state
	}
}

export default adminOverviewReducer;