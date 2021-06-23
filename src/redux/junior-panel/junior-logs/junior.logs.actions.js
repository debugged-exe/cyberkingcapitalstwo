import {JuniorLogsAcitonTypes} from "./junior.logs.types";

//destructing the action types
const {SET_LOG_STAT_ARRAY, SET_JUNIOR_TABLE_LOG_ARRAY,SET_MODAL_LEAD,SET_MODAL_VISIBILITY, APPEND_NEW_LEADS} = JuniorLogsAcitonTypes;

export const setLogStatArray = array => ({
	type: SET_LOG_STAT_ARRAY,
	payload: array
});

export const setJuniorTableLogArray = array => ({
	type: SET_JUNIOR_TABLE_LOG_ARRAY,
	payload: array
});

export const setModalLead = lead => ({
	type: SET_MODAL_LEAD,
	payload: lead
});

export const setModalVisibility = visible => ({
	type: SET_MODAL_VISIBILITY,
	payload: visible
});