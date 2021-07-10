import {AdminOverviewActionTypes} from "./admin.overview.types";

//destructing the action types
const {
	SET_SENIOR_TELECALLER_ARRAY,
	SET_OVERVIEW_FILTER,
	SET_JR_VIEW,
	SET_JUNIOR_LOG_ARRAY,
	SET_JUNIOR_LOG_VIEW,
	SET_JUNIOR_COUNT_VIEW,
	SET_ASSIGNED_JUNIOR_ARRAY,
	SET_JR_COUNT_ARRAY,
	SET_PG_COUNT,
	SET_JUNIOR_ID,
	SET_UPDATE_MODAL_VISIBILITY,
	SET_UPDATE_MODAL_LEAD,
	REASSIGN_JR_LOG_ARRAY
} = AdminOverviewActionTypes;

export const setAdminSeniorTelecallerArray = array => ({
	type: SET_SENIOR_TELECALLER_ARRAY,
	payload: array
});

export const setAdminOverviewFilter = filter => ({
	type: SET_OVERVIEW_FILTER,
	payload: filter
});

export const setJrView = visible => ({
	type: SET_JR_VIEW,
	payload: visible
});

export const setJuniorLogArray = array => ({
	type: SET_JUNIOR_LOG_ARRAY,
	payload: array
});

export const setJuniorLogView = visible => ({
	type: SET_JUNIOR_LOG_VIEW,
	payload: visible
});

export const setJuniorCountView = visible => ({
	type: SET_JUNIOR_COUNT_VIEW,
	payload: visible
});

export const setAssignedJuniorArray = array => ({
	type: SET_ASSIGNED_JUNIOR_ARRAY,
	payload: array
})

export const setJrCountArray = array => ({
	type: SET_JR_COUNT_ARRAY,
	payload: array
})

export const setPgCount = number => ({
	type: SET_PG_COUNT,
	payload: number
})

export const setJuniorId = id => ({
	type: SET_JUNIOR_ID,
	payload: id
})

export const setUpdateModalVisibility = visible => ({
	type: SET_UPDATE_MODAL_VISIBILITY,
	payload: visible
});

export const setUpdateModalLead = obj => ({
	type: SET_UPDATE_MODAL_LEAD,
	payload: obj
});

export const reassignJrLogArray = obj => ({
	type: REASSIGN_JR_LOG_ARRAY,
	payload: obj
});