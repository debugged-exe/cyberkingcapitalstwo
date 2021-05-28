const initialState = {
	handover_leads_array: []
}

const seniorHandoverReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case 'SET_HANDOVER_LEAD_ARRAY':
			return {
				...state,
				handover_leads_array: payload
			}
		default:
			return state
	}
}

export default seniorHandoverReducer;