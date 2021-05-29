import { createSelector } from 'reselect'

const selectAdminPanel = state => state.admin_panel;

const selectAdminRequest = createSelector(
	[selectAdminPanel],
	(request) => request.admin_request
);

export const selectAdminCodedRequestArray = createSelector(
	[selectAdminRequest],
	(coded) => coded.admin_coded_request_array
);

export const selectAdminDeleteRequestArray = createSelector(
	[selectAdminRequest],
	(delete1) => delete1.admin_delete_request_array
);