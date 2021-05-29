import {SeniorPaymentActionTypes} from "./senior.payment.types";

//destructing the action types
const {SET_SENIOR_PAYMENT_ARRAY, SET_SENIOR_PAYMENT_TABLE_LOG} = SeniorPaymentActionTypes;

const initialState = {
	senior_payment_array: [],
	senior_payment_table_log: []
}

const seniorPaymentReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case SET_SENIOR_PAYMENT_ARRAY:
			return {
				...state,
				senior_payment_array: payload
			}
		case SET_SENIOR_PAYMENT_TABLE_LOG:
			return {
				...state,
				senior_payment_table_log: payload
			}
		default:
			return state;
	}
}

export default seniorPaymentReducer;