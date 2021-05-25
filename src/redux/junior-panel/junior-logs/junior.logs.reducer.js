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
		default:
		return state;
	}
}

export default juniorLogsReducer;