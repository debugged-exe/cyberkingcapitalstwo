import {AdminPaymentActionTypes} from "./admin.payment.types";

//destructing the action types
const {SET_ADMIN_PAYMENT_TEAM_ARRAY, SET_ADMIN_MODAL_LEAD, SET_ADMIN_MODAL_VISIBILITY} = AdminPaymentActionTypes;

export const setAdminPaymentTeamArray = array => ({
	type: SET_ADMIN_PAYMENT_TEAM_ARRAY,
	payload: array
});

export const setAdminModalLead = lead => ({
	type: SET_ADMIN_MODAL_LEAD,
	payload: lead
});

export const setAdminModalVisibility = visible => ({
	type: SET_ADMIN_MODAL_VISIBILITY,
	payload: visible
});