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

export const selectSeniorHandoverLead = createSelector(
    [selectSeniorHandover],
    (lead) => lead.senior_modal_lead
);

export const selectSeniorHandoverLeadVisibility = createSelector(
    [selectSeniorHandover],
    (lead) => lead.senior_modal_visibility
);