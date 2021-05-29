import {createSelector} from "reselect";

const selectAdminPanel = state => state.admin_panel;

const selectAdminLogs = createSelector(
    [selectAdminPanel],
    (admin) => admin.admin_logs
);

export const selectAdminLeadTableArray = createSelector(
    [selectAdminLogs],
    (logs) => logs.lead_table_array
);