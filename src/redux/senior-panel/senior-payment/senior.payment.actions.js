import {SeniorPaymentActionTypes} from "./senior.payment.types";

//destructing the action types
const {SET_SENIOR_PAYMENT_ARRAY, SET_SENIOR_PAYMENT_TABLE_LOG} = SeniorPaymentActionTypes;

export const setSeniorPaymentArray = array => ({
	type: SET_SENIOR_PAYMENT_ARRAY,
	payload: array
});

export const setSeniorPaymentTableLog = array => ({
	type: SET_SENIOR_PAYMENT_TABLE_LOG,
	payload: array
});