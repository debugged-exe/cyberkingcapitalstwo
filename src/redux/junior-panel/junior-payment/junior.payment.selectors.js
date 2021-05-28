import {createSelector} from "reselect";

const selectJuniorPanel = state => state.junior_panel;

const selectJuniorPayment = createSelector(
    [selectJuniorPanel],
    (panel) => panel.junior_payment
);
export const selectJuniorPaymentArray = createSelector(
    [selectJuniorPayment],
    (payment)=> payment.junior_payment_array
)
