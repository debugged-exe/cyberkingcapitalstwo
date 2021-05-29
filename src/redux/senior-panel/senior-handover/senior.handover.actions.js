import {SeniorHandoverActionTypes} from "./senior.handover.types";

//destructing the action types
const {SET_HANDOVER_LEAD_ARRAY} = SeniorHandoverActionTypes;

export const setHandoverLeadArray = array => ({
	type: SET_HANDOVER_LEAD_ARRAY,
	payload: array
});