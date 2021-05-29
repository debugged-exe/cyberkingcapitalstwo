import {JuniorPaymentActionTypes} from "./junior.payment.types";

//destructing the action types
const {SET_JUNIOR_PAYMENT_ARRAY} = JuniorPaymentActionTypes;

export const setJuniorPaymentArray = array => ({
    type: SET_JUNIOR_PAYMENT_ARRAY,
    payload : array
});