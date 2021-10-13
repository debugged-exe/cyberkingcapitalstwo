import {AdminRequestActionTypes} from "./admin.request.types";

//destructing the action types
const {
	SET_ADMIN_CODED_REQUEST_ARRAY, 
	SET_ADMIN_DELETE_REQUEST_ARRAY,
	SET_ADMIN_REQUEST_LANGUAGE,
	REASSIGN_DELETE_REQUEST_ARRAY,
	REASSIGN_CODED_REQUEST_ARRAY,
	SET_ADMIN_REFERRAL_REQUEST_ARRAY,
	REASSIGN_REFERRAL_REQUEST_ARRAY
} = AdminRequestActionTypes;

export const setAdminCodedRequestArray = array => ({
	type: SET_ADMIN_CODED_REQUEST_ARRAY,
	payload: array
});

export const setAdminDeleteRequestArray = array => ({
	type: SET_ADMIN_DELETE_REQUEST_ARRAY,
	payload: array
});

export const setAdminRequestLanguage = lang => ({
	type: SET_ADMIN_REQUEST_LANGUAGE,
	payload: lang
});

export const reassignDeleteRequestArray = lead_id => ({
	type: REASSIGN_DELETE_REQUEST_ARRAY,
	payload: lead_id
});

export const reassignCodedRequestArray = lead_id => ({
	type: REASSIGN_CODED_REQUEST_ARRAY,
	payload: lead_id
});

export const setAdminReferralRequestArray = array => ({
	type: SET_ADMIN_REFERRAL_REQUEST_ARRAY,
	payload: array
})

export const reassignReferralRequestArray = lead_id => ({
	type: REASSIGN_REFERRAL_REQUEST_ARRAY,
	payload: lead_id
});