import {UserActionTypes} from "./user.types";

//destructing the action types
const {SET_CURRENT_USER} = UserActionTypes;

export const setCurrentUser = user => ({
	type: SET_CURRENT_USER,
	payload: user
})