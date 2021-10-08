import {AdminBlockTelecallerActionTypes} from "./admin.block.telecaller.types";

const initialState = {
    admin_block_telecaller_language: 'marathi',
    admin_block_telecaller_table: []
}

//destructing the action types
const {
    SET_ADMIN_BLOCK_TELECALLER_LANGUAGE,
    SET_ADMIN_BLOCK_TELECALLER_TABLE
} = AdminBlockTelecallerActionTypes;

const adminBlockTelecallerReducer = (state = initialState, { type, payload }) => {
    switch (type) {

        case SET_ADMIN_BLOCK_TELECALLER_LANGUAGE:
            return {
                ...state,
                admin_block_telecaller_language: payload
            }
        case SET_ADMIN_BLOCK_TELECALLER_TABLE:
            return {
                ...state,
                admin_block_telecaller_table: payload
            }
        default:
            return state
    }
}

export default adminBlockTelecallerReducer;