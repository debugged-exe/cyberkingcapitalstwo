import { createSelector } from 'reselect'

const selectAdminPanel = state => state.admin_panel;

const selectAdminPayment = createSelector(
	[selectAdminPanel],
	(payment) => payment.admin_payment
);

export const selectAdminPaymentTeamArray = createSelector(
	[selectAdminPayment],
	(team) => team.admin_payment_team_array
);

export const selectAdminModalLead = createSelector(
	[selectAdminPayment],
	(team) => team.admin_modal_lead
);

export const selectAdminModalVisibility = createSelector(
	[selectAdminPayment],
	(visible) => visible.admin_modal_visibility
);