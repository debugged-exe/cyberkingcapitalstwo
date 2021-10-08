import { AdminBlockTelecallerActionTypes } from "./admin.block.telecaller.types";

//destructing the action types
const {
    SET_ADMIN_BLOCK_TELECALLER_LANGUAGE,
    SET_ADMIN_BLOCK_TELECALLER_TABLE,
    TOGGLE_BLOCK_FIELD
} = AdminBlockTelecallerActionTypes;

export const setAdminBlockTelecallerLanguage = language => ({
    type: SET_ADMIN_BLOCK_TELECALLER_LANGUAGE,
    payload: language
})

export const setAdminBlockTelecallerTable = array => ({
    type: SET_ADMIN_BLOCK_TELECALLER_TABLE,
    payload: array
})

export const toggleBlockField = index => ({
    type: TOGGLE_BLOCK_FIELD,
    payload: index
})