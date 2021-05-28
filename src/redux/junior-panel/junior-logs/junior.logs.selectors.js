import {createSelector} from "reselect";

const selectJuniorPanel = state => state.junior_panel;

const selectJuniorLogs = createSelector(
    [selectJuniorPanel],
    (junior) => junior.junior_logs
);

export const selectJuniorLogStatArray = createSelector(
    [selectJuniorLogs],
    (logs)=>logs.log_stat_array
);

export const selectJuniorTableLogs = createSelector(
    [selectJuniorLogs],
    (logs)=> logs.junior_table_logs
);

export const selectJuniorModalLead = createSelector(
    [selectJuniorLogs],
    (logs)=> logs.modal_lead
);

export const selectJuniorModalVisibility = createSelector(
    [selectJuniorLogs],
    (logs)=> logs.modal_visibility
);