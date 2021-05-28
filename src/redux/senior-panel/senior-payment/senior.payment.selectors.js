import {createSelector} from "reselect";

const selectSeniorPanel = state => state.senior_panel;

const selectSeniorPayment = createSelector(
    [selectSeniorPanel],
    (senior) => senior.senior_payment
);

export const selectSeniorPaymentArray = createSelector(
    [selectSeniorPayment],
    (payment) => payment.senior_payment_array
);

export const selectSeniorPaymentTableLogs = createSelector(
    [selectSeniorPayment],
    (payment) => payment.senior_payment_table_log
);