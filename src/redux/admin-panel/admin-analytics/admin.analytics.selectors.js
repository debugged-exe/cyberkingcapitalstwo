import {createSelector} from "reselect";

const selectAdminPanel = state => state.admin_panel;

const selectAdminAnalytics = createSelector(
	[selectAdminPanel],
	(admin) => admin.admin_analytics
);

export const selectAdminAnalyticsCount = createSelector(
	[selectAdminAnalytics],
	(count) => count.admin_analytics_count
);