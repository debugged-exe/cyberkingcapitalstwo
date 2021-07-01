import {SeniorSearchActionTypes} from "./senior.search.types";

//destructing the action types
const {SEARCH_LOGS} = SeniorSearchActionTypes;

export const setSeniorSearchTableArray = array => ({
    type: SEARCH_LOGS,
    payload: array
});