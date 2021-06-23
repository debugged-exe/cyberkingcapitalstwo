import {JuniorLogsAcitonTypes} from "./junior.logs.types";

//destructing the actiontypes
const {
	SET_LOG_STAT_ARRAY, 
	SET_JUNIOR_TABLE_LOG_ARRAY,
	SET_MODAL_LEAD,SET_MODAL_VISIBILITY, 
	REASSIGN_LEAD
	} = JuniorLogsAcitonTypes;

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
		case SET_LOG_STAT_ARRAY:
			return {
				...state,
				log_stat_array: action.payload
			}
		case SET_JUNIOR_TABLE_LOG_ARRAY:
			return {
				...state,
				junior_table_logs: action.payload
			}
		case SET_MODAL_LEAD:
			return {
				...state,
				modal_lead: action.payload,
				modal_visibility: true
			}
		case SET_MODAL_VISIBILITY:
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
			case REASSIGN_LEAD:
				const reassigned = [];
				state.junior_table_logs.map(item => {
					if(item.lead_id===action.payload.lead_id)
					{
						reassigned.push(action.payload)
					}
					else
					{
						reassigned.push(item);
					}
				})
				return {
					...state,
					junior_table_logs: reassigned
				}
		default:
		return state;
	}
}

export default juniorLogsReducer;