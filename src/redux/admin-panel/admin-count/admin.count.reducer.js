import {AdminCountActionTypes} from "./admin.count.types";

//destructing the action types
const {SET_ADMIN_COUNT_ARRAY} = AdminCountActionTypes;

const initialState = {
	admin_count_array: [
		{
			Heading: 'Hindi Count',
			numeric: 500,
			color: 'rgb(57, 73, 171)'
		},
		{
			Heading: 'Marathi Count',
			numeric: 500,
			color: 'rgb(67, 160, 71)'
		}
	]
};
const adminCountReducer =  (state = initialState, { type, payload }) => {
	switch (type) {
		case SET_ADMIN_COUNT_ARRAY:
			return {
				...state,
				admin_count_array: payload
			}
		default:
			return state
	}
}

export default adminCountReducer;