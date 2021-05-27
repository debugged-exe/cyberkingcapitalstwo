const INITIAL_STATE = {
    junior_payment_array: []
}
const juniorPaymentReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case 'SET_JUNIOR_PAYMENT_ARRAY':
            return {
                ...state,
                junior_payment_array: action.payload
            }
        default:
            return state;
    }
}

export default juniorPaymentReducer;