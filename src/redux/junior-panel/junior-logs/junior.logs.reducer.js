import {setModalLead} from "./junior.logs.actions";

const INITIAL_STATE = {
	log_stat_array: [],
	filter: '*',
	filterValue: '',
	modal_visibility: false,
	modal_lead: {},
	junior_table_logs: []
}

const juniorLogsReducer = (state = INITIAL_STATE, action) => {
	switch(action.type){
		case 'SET_LOG_STAT_ARRAY':
			return {
				...state,
				log_stat_array: action.payload
			}
		case 'SET_JUNIOR_TABLE_LOG_ARRAY':
			return {
				...state,
				junior_table_logs: action.payload
			}
		case 'SET_MODAL_LEAD':
			return {
				...state,
				modal_lead: action.payload,
				modal_visibility: true
			}
		case 'SET_MODAL_VISIBILITY':
			if (!action.payload)
			{
				return {
					...state,
					modal_lead: {},
					modal_visibility: action.payload
				}
			}
			else
			{
				return {
					...state,
					modal_visibility: action.payload
				}
			}
		default:
		return state;
	}
}

export default juniorLogsReducer;