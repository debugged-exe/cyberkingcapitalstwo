import {AdminPaymentActionTypes} from "./admin.payment.types";

//destructing the action types
const {SET_ADMIN_PAYMENT_TEAM_ARRAY, SET_ADMIN_MODAL_LEAD, SET_ADMIN_MODAL_VISIBILITY, UPDATE_POINTS} = AdminPaymentActionTypes;

const initialState = {
	admin_payment_team_array: [],
	admin_modal_lead: {},
	admin_modal_visibility: false
}

const adminPaymentReducer =  (state = initialState, { type, payload }) => {
	switch (type) {
		case SET_ADMIN_PAYMENT_TEAM_ARRAY:
			return {
				...state,
				admin_payment_team_array: payload
			}
		case SET_ADMIN_MODAL_LEAD:
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
		case SET_ADMIN_MODAL_VISIBILITY:
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
		case UPDATE_POINTS:
			if(payload.name==='points')
			{
				const updated = []
				state.admin_payment_team_array.map(item => {
					if(item.telecaller_id===payload.telecaller_id)
					{
						item.points_earned = item.points_earned-parseInt(payload.amount);
						item.points_paid = item.points_paid+parseInt(payload.amount);
						updated.push(item);
					}
					else
					{
						updated.push(item);
					}
				})
				return {
					...state,
					admin_payment_team_array: updated
				}
			}
			else if(payload.name==='bonus')
			{
				const updated = []
				state.admin_payment_team_array.map(item => {
					if(item.telecaller_id===payload.telecaller_id)
					{
						item.bonus_earned = item.bonus_earned+parseInt(payload.amount);
						updated.push(item);
					}
					else
					{
						updated.push(item);
					}
				})
				return {
					...state,
					admin_payment_team_array: updated
				}
			}
		default:
			return state
	}
}

export default adminPaymentReducer;