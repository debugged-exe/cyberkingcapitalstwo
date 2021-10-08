import {createSelector} from "reselect";

const selectAdminPanel = state => state.admin_panel;

const selectAdminBlockTelecaller = createSelector(
    [selectAdminPanel],
    (admin) => admin.admin_block_telecaller
);

export const selectAdminBlockTelecallerLanguage = createSelector(
    [selectAdminBlockTelecaller],
    (language) => language.admin_block_telecaller_language
);

export const selectAdminBlockTelecallerTable = createSelector(
    [selectAdminBlockTelecaller],
    (table) => table.admin_block_telecaller_table
)