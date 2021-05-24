const INITIAL_STATE = {
    user: {
        username: '',
        designation: 'client',
        telecaller_id: '',
    }
}
const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type){
        case 'SET_CURRENT_USER':
            return {
                ...state,

            }
    }
}