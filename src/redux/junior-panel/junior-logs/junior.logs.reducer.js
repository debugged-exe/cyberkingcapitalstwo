import {JuniorLogsAcitonTypes} from "./junior.logs.types";

//destructing the actiontypes
const {
	SET_LOG_STAT_ARRAY, 
	SET_JUNIOR_TABLE_LOG_ARRAY,
	SET_MODAL_LEAD,SET_MODAL_VISIBILITY, 
	REASSIGN_LEAD,
	REASSIGN_HANDOVER_FLAG,
	REASSIGN_CODED_FLAG,
	REASSIGN_REFERRED
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
			case REASSIGN_HANDOVER_FLAG:
				const handover = [];
				state.junior_table_logs.map(item => {
					if(item.lead_id===action.payload.lead_id)
					{
						item.handover_flag = action.payload.flag;
						handover.push(item)
					}
					else
					{
						handover.push(item);
					}
				})
				return {
					...state,
					junior_table_logs: handover
				}
			case REASSIGN_CODED_FLAG:
				const codedRequest = [];
				state.junior_table_logs.map(item => {
					if(item.lead_id!==action.payload.lead_id)
					{
						codedRequest.push(item)
					}
				})
				return {
					...state,
					junior_table_logs: codedRequest
				}
			case REASSIGN_REFERRED:
				const tempArr = [];
				state.junior_table_logs.filter(item => item.lead_id!== action.payload)
				.map(item => {
					tempArr.push(item);
				})
				return {
					...state,
					junior_table_logs: tempArr
				}
		default:
		return state;
	}
}

export default juniorLogsReducer;