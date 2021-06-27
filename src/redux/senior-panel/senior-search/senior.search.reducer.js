import {SeniorSearchActionTypes} from "./senior.search.types";

//destructing the action types
const {SEARCH_LOGS} = SeniorSearchActionTypes;

const initialState = {
    search_table_logs: []
}

const seniorSearchReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case SEARCH_LOGS:
            return {
                ...state,
                search_table_logs: payload
            }
        default:
            return state
    }
}

export default seniorSearchReducer;