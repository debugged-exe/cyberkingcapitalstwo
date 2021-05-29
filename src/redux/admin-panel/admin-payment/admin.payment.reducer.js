const initialState = {
	admin_payment_team_array: [],
	admin_modal_lead: {},
	admin_modal_visibility: false
}

const adminPaymentReducer =  (state = initialState, { type, payload }) => {
	switch (type) {
		case 'SET_ADMIN_PAYMENT_TEAM_ARRAY':
			return {
				...state,
				admin_payment_team_array: payload
			}
		case 'SET_ADMIN_MODAL_LEAD':
			if(payload.telecaller_id)
			{
				return {
					...state,
					admin_modal_lead: payload,
					admin_modal_visibility: true
				}
			}
			else
			{
				return {
					...state,
					admin_modal_lead: payload
				}
			}
		case 'SET_ADMIN_MODAL_VISIBILITY':
			if(!payload)
			{
				return {
					...state,
					admin_modal_visibility: payload,
					admin_modal_lead: {}
				}
			}
			else
			{
				return {
					...state,
					admin_modal_visibility: payload
				}
			}
		default:
			return state
	}
}

export default adminPaymentReducer;