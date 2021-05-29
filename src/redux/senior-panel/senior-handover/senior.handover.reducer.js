import {SeniorHandoverActionTypes} from "./senior.handover.types";

//destructing the action types
const {SET_HANDOVER_LEAD_ARRAY} = SeniorHandoverActionTypes;

const initialState = {
	handover_leads_array: []
}

const seniorHandoverReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case SET_HANDOVER_LEAD_ARRAY:
			return {
				...state,
				handover_leads_array: payload
			}
		default:
			return state
	}
}

export default seniorHandoverReducer;