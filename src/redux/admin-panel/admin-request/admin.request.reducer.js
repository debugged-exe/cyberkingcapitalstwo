import {AdminRequestActionTypes} from "./admin.request.types";

//destructing the action types
const {
	SET_ADMIN_CODED_REQUEST_ARRAY, 
	SET_ADMIN_DELETE_REQUEST_ARRAY,
	SET_ADMIN_REQUEST_LANGUAGE,
	REASSIGN_DELETE_REQUEST_ARRAY,
	REASSIGN_CODED_REQUEST_ARRAY
} = AdminRequestActionTypes;

const initialState = {
	admin_coded_request_array: [],
	admin_delete_request_array: [],
	admin_request_language: 'hindi'
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
		case SET_ADMIN_REQUEST_LANGUAGE:
			return{
				...state,
				admin_request_language: payload
			}
		case REASSIGN_DELETE_REQUEST_ARRAY:
			var reassigned = [];
			state.admin_delete_request_array.filter(item => item.lead_id!==payload)
				.map(item => {
					reassigned.push(item);
				})
			return{
				...state,
				admin_delete_request_array: reassigned
			}
		case REASSIGN_CODED_REQUEST_ARRAY:
			var reassigned = [];
			state.admin_coded_request_array.filter(item => item.lead_id!==payload)
				.map(item => {
					reassigned.push(item);
				})
			return{
				...state,
				admin_coded_request_array: reassigned
			}
		default:
			return state
	}
}

export default adminRequestReducer;