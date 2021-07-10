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

const initialState = {
    senior_telecaller_array: [],
    overview_filter: 'hindi',
    jrView: false,
    senior_telecaller_id: '',
    juniorLogView: false,
    junior_log_array: [],
    jrCount: false,
    assigned_junior_array: [],
    jr_count_array: [],
    pg_count: 0,
    junior_id: '',
    update_modal_visibility: false,
    update_modal_lead: {}
}

const adminOverviewReducer = (state = initialState, {type, payload}) => {
    switch (type) {

        case SET_SENIOR_TELECALLER_ARRAY:
            return {
                ...state,
                senior_telecaller_array: payload
            }

        case SET_OVERVIEW_FILTER:
            return {
                ...state,
                overview_filter: payload
            }

        case SET_JR_VIEW:
            return {
                ...state,
                jrView: payload.visible,
                senior_telecaller_id: payload.senior_telecaller_id
            }
        case SET_JUNIOR_LOG_ARRAY:
            if(payload.length)
            {
                return {
                    ...state,
                    junior_log_array: payload,
                    juniorLogView: true,
                    jrView: false
                }
            }else{
                return {
                    ...state,
                    junior_log_array: [],
                    juniorLogView: true,
                    jrView: false
                }
            }
        case SET_JUNIOR_LOG_VIEW:
            if(payload.visible)
            {
                return {
                    ...state,
                    juniorLogView: payload.visible,
                    junior_log_array: payload.array
                }
            }
            else
            {
                return {
                    ...state,
                    juniorLogView: payload.visible,
                    junior_log_array: payload.array,
                    jrView: true
                }
            }
        case SET_JUNIOR_COUNT_VIEW:
            if(payload)
            {
                return {
                    ...state,
                    jrCount: payload,
                    jrView: false
                }
            }
            else
            {
                return {
                    ...state,
                    jrCount: payload,
                    jrView: true
                }
            }
        case SET_ASSIGNED_JUNIOR_ARRAY:
            return {
                ...state,
                assigned_junior_array: payload
            }
        case SET_JR_COUNT_ARRAY:
            return {
                ...state,
                jr_count_array: payload
            }
        case SET_PG_COUNT:
            return {
                ...state,
                pg_count: payload
            }
        case SET_JUNIOR_ID:
            return {
                ...state,
                junior_id: payload
            }
        case SET_UPDATE_MODAL_VISIBILITY:
            return {
                ...state,
                update_modal_visibility: payload
            }
        case SET_UPDATE_MODAL_LEAD:
            if(payload.lead_id)
            {
                 return{
                    ...state,
                    update_modal_lead: payload,
                    update_modal_visibility: true
                }
            }
            else
            {
                return{
                    ...state,
                    update_modal_lead: payload,
                    update_modal_visibility: false
                }
            }
        case REASSIGN_JR_LOG_ARRAY:
            const reassigned = [];
            state.junior_log_array.map(item => {
                if(item.lead_id===payload.lead_id)
                {
                    reassigned.push(payload)
                }
                else
                {
                    reassigned.push(item);
                }
            })
            return {
                ...state,
                junior_log_array: reassigned
            }
        default:
            return state
    }
}

export default adminOverviewReducer;