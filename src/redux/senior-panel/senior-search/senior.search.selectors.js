import {createSelector} from "reselect";

const selectSeniorPanel = state => state.senior_panel;

const selectSeniorSearch = createSelector(
    [selectSeniorPanel],
    (senior) => senior.senior_search
);

export const selectSeniorSearchTableArray = createSelector(
    [selectSeniorSearch],
    (search) => search.search_table_logs
);