import {AdminRequestActionTypes} from "./admin.request.types";

//destructing the action types
const {SET_ADMIN_CODED_REQUEST_ARRAY, SET_ADMIN_DELETE_REQUEST_ARRAY} = AdminRequestActionTypes;

const initialState = {
	admin_coded_request_array: [],
	admin_delete_request_array: []
}

const adminRequestReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case SET_ADMIN_CODED_REQUEST_ARRAY:
			return {
				...state,
				admin_coded_request_array: payload
			}
		case SET_ADMIN_DELETE_REQUEST_ARRAY:
			return {
				...state,
				admin_delete_request_array: payload
			}
		default:
			return state
	}
}

export default adminRequestReducer;