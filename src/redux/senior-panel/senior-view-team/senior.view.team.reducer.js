import {SeniorViewTeamActionTypes} from "./senior.view.team.types";

const initialState = {
	team_array: [],
	junior_lead_array: [],
	junior_lead_table_visibility: false,
	current_junior_caller_id: '',
	junior_count_array: [],
	junior_count_visibility: false
}

//destructing the action types
const {
	SET_JUNIOR_LEAD_ARRAY,
	SET_TEAM_ARRAY,
	SET_JUNIOR_LEAD_TABLE_VISIBILITY,
	SET_CURRENT_JUNIOR_CALLER_ID,
	SET_JUNIOR_COUNT_ARRAY,
	SET_JUNIOR_COUNT_VISIBILITY
} = SeniorViewTeamActionTypes;

const seniorViewTeamReducer =  (state = initialState, { type, payload }) => {
	switch (type) {
		case SET_TEAM_ARRAY:
			return {
				...state,
				team_array: payload
			}
		case SET_JUNIOR_LEAD_ARRAY:
			if (payload.length) {
				return {
					...state,
					junior_lead_array: payload,
					junior_lead_table_visibility: true
				}
			}
			else
			{
				return {
					...state
				}
			}
		case SET_JUNIOR_LEAD_TABLE_VISIBILITY:
			if (!payload) 
			{
				return {
					...state,
					junior_lead_table_visibility: payload,
					junior_lead_array: []
				}
			}
			else
			{
				return{
					...state,
					junior_lead_table_visibility: payload
				}
			}
		case SET_CURRENT_JUNIOR_CALLER_ID:
			return {
				...state,
				current_junior_caller_id: payload
			}
		case SET_JUNIOR_COUNT_ARRAY:
			return {
				...state,
				junior_count_array: payload
			}
		case SET_JUNIOR_COUNT_VISIBILITY:
			return {
				...state,
				junior_count_visibility: payload
			}
		default:
			return state
	}
}

export default seniorViewTeamReducer;