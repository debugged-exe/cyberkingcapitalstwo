import {createSelector} from "reselect";

const selectSeniorPanel = state => state.senior_panel;

const selectSeniorViewTeam = createSelector(
    [selectSeniorPanel],
    (senior) => senior.senior_view_team
);

export const selectSeniorTeamArray = createSelector(
    [selectSeniorViewTeam],
    (team) => team.team_array
);

export const selectSeniorJuniorLeadArray = createSelector(
    [selectSeniorViewTeam],
    (team) => team.junior_lead_array
);

export const selectSeniorJuniorLeadTableVisibility = createSelector(
    [selectSeniorViewTeam],
    (team) => team.junior_lead_table_visibility
);