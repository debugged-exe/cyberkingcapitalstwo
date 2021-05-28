const initialState = {
	team_array: [],
	junior_lead_array: [],
	junior_lead_table_visibility: false
}

const seniorViewTeamReducer =  (state = initialState, { type, payload }) => {
	switch (type) {
		case 'SET_TEAM_ARRAY':
			return {
				...state,
				team_array: payload
			}
		case 'SET_JUNIOR_LEAD_ARRAY':
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
		case 'SET_JUNIOR_LEAD_TABLE_VISIBILITY':
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
		default:
			return state
	}
}

export default seniorViewTeamReducer;