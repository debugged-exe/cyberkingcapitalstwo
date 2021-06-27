import {SeniorHandoverActionTypes} from "./senior.handover.types";

//destructing the action types
const {
	SET_HANDOVER_LEAD_ARRAY,
	SET_SENIOR_MODEL_LEAD,
	SET_SENIOR_MODAL_VISIBILITY,
	REASSIGN_HANDOVER_LEAD
	} = SeniorHandoverActionTypes;

export const setHandoverLeadArray = array => ({
	type: SET_HANDOVER_LEAD_ARRAY,
	payload: array
});

export const setSeniorModelLead = lead => ({
	type: SET_SENIOR_MODEL_LEAD,
	payload: lead
})

export const setSeniorModalVisibility = visible => ({
	type: SET_SENIOR_MODAL_VISIBILITY,
	payload: visible
});

export const reassignHandoverLead = obj => ({
	type: REASSIGN_HANDOVER_LEAD,
	payload: obj
});