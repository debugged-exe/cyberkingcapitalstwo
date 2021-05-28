import {createSelector} from "reselect";

const selectSeniorPanel = state => state.senior_panel;

const selectSeniorHandover = createSelector(
    [selectSeniorPanel],
    (senior) => senior.senior_handover
);

export const selectSeniorHandoverLeadsArray = createSelector(
    [selectSeniorHandover],
    (handover) => handover.handover_leads_array
);