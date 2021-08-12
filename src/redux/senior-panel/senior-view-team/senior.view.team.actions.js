import {SeniorViewTeamActionTypes} from "./senior.view.team.types";

//destructing the action types
const {
	SET_JUNIOR_LEAD_ARRAY,
	SET_TEAM_ARRAY,
	SET_JUNIOR_LEAD_TABLE_VISIBILITY,
	SET_CURRENT_JUNIOR_CALLER_ID,
	SET_JUNIOR_COUNT_ARRAY,
	SET_JUNIOR_COUNT_VISIBILITY
} = SeniorViewTeamActionTypes;

export const setJuniorLeadArray = array => ({
	type: SET_JUNIOR_LEAD_ARRAY,
	payload: array
});

export const setTeamArray = array => ({
	type: SET_TEAM_ARRAY,
	payload: array
});

export const setJuniorLeadTableVisibility = visible => ({
	type: SET_JUNIOR_LEAD_TABLE_VISIBILITY,
	payload: visible
});

export const setCurrentJuniorCallerId = id => ({
	type: SET_CURRENT_JUNIOR_CALLER_ID,
	payload: id
});

export const setJuniorCountArray = array => ({
	type: SET_JUNIOR_COUNT_ARRAY,
	payload: array
})

export const setJuniorCountVisibility = visibility => ({
	type: SET_JUNIOR_COUNT_VISIBILITY,
	payload: visibility
})