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

export const selectCurrentJuniorCallerId = createSelector(
    [selectSeniorViewTeam],
    (team) => team.current_junior_caller_id
);

export const selectJuniorCountArray = createSelector(
    [selectSeniorViewTeam],
    (team) => team.junior_count_array
);

export const selectJuniorCountVisibility = createSelector(
    [selectSeniorViewTeam],
    (team) => team.junior_count_visibility
);