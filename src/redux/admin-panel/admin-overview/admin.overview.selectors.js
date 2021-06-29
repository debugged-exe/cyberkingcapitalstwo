import { createSelector } from 'reselect'

const selectAdminPanel = state => state.admin_panel;

const selectAdminOverview = createSelector(
	[selectAdminPanel],
	(overview) => overview.admin_overview
);

export const selectAdminSeniorTelecallerArray = createSelector(
	[selectAdminOverview],
	(senior) => senior.senior_telecaller_array
);

export const selectAdminOverviewFilter = createSelector(
	[selectAdminOverview],
	(filter) => filter.overview_filter
);

export const selectAdminJrView = createSelector(
	[selectAdminOverview],
	(visibility) => visibility.jrView
);

export const selectSeniorTelecallerId = createSelector(
	[selectAdminOverview],
	(senior) => senior.senior_telecaller_id
);

export const selectJuniorLogView = createSelector(
	[selectAdminOverview],
	(juniorLog) => juniorLog.juniorLogView
);

export const selectJuniorLogArray = createSelector(
	[selectAdminOverview],
	(juniorLogArray) => juniorLogArray.junior_log_array
);

export const selectJuniorCountView = createSelector(
	[selectAdminOverview],
	(junior) => junior.jrCount
);

export const selectAssignedJuniorArray = createSelector(
	[selectAdminOverview],
	(juniorArray) => juniorArray.assigned_junior_array
)

export const selectJrCountArray = createSelector(
	[selectAdminOverview],
	(count) => count.jr_count_array
)