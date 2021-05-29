import {createSelector} from "reselect";

const selectAdminPanel = state => state.admin_panel;

const selectAdminCount = createSelector(
	[selectAdminPanel],
	(admin) => admin.admin_count
);

export const selectAdminCountArray = createSelector(
	[selectAdminCount],
	(count) => count.admin_count_array
);