const initialState = {
	admin_count_array: []
}

const adminCountReducer =  (state = initialState, { type, payload }) => {
	switch (type) {
		case 'SET_ADMIN_COUNT_ARRAY':
			return {
				...state,
				admin_count_array: payload
			}
		default:
			return state
	}
}

export default adminCountReducer;