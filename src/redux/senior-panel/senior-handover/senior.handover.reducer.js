import {SeniorHandoverActionTypes} from "./senior.handover.types";

//destructing the action types
const {
	SET_HANDOVER_LEAD_ARRAY,
	SET_SENIOR_MODEL_LEAD,
	SET_SENIOR_MODAL_VISIBILITY,
	REASSIGN_HANDOVER_LEAD,
	HANDBACK_LEAD
	} = SeniorHandoverActionTypes;

const initialState = {
	handover_leads_array: [],
	senior_modal_lead: {},
	senior_modal_visibility: false
}

const seniorHandoverReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case SET_HANDOVER_LEAD_ARRAY:
			return {
				...state,
				handover_leads_array: payload
			}
		case SET_SENIOR_MODEL_LEAD:
			return{
				...state,
				senior_modal_lead: payload,
				senior_modal_visibility: true
			}
		case SET_SENIOR_MODAL_VISIBILITY:
			if (!payload)
			{
				return {
					...state,
					senior_modal_lead: {},
					senior_modal_visibility: payload
				}
			}
			else
			{
				return {
					...state,
					senior_modal_visibility: payload
				}
			}
		case REASSIGN_HANDOVER_LEAD:
			const reassigned = [];
			state.handover_leads_array.map(item => {
				if(item.lead_id===payload.lead_id)
				{
					reassigned.push(payload)
				}
				else
				{
					reassigned.push(item);
				}
			})
			return {
				...state,
				handover_leads_array: reassigned
			}
		case HANDBACK_LEAD:
			const handedBack = [];
			state.handover_leads_array.filter(item => item.lead_id!==payload)
			.map(item => {
				handedBack.push(item);
			})
			return{
				...state,
				handover_leads_array: handedBack
			}
		default:
			return state
	}
}

export default seniorHandoverReducer;