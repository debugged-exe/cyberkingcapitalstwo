import React from 'react';

// redux
import { connect } from 'react-redux';

//reselect
import {createStructuredSelector} from "reselect";
import {selectSeniorPaymentTableLogs} from "../../../redux/senior-panel/senior-payment/senior.payment.selectors";

// css
import './SeniorPaymentTable.scss';
const header = ["Sr No.", "Telecaller ID", "Telecaller Name", "Points earned"];

const SeniorPaymentTable = ({senior_payment_table_log}) => {
    return (<div className={'table-container'}>
        <h1>Payment Records</h1>
        <table cellspacing="1" className={'table-box'} >
            <thead className={'table-head-container'}>
            <tr>
                {header.map((item, index) => {
                    return (
                        <th className={'table-header-container'}>{item}</th>
                    );
                })}
            </tr>
            </thead>
            <tbody className={'table-body-container'}>
            {senior_payment_table_log.map((item, index) => {
                return (
                    <tr className="table-row-container">
                        <td className={'table-data-container'} data-label={'Sr.No'}>{index + 1}</td>
                        <td className={'table-data-container'} data-label={'Telecaller ID'}>{item.telecaller_id}</td>
                        <td className={'table-data-container'} data-label={'Telecaller Name'}>{item.telecaller_name}</td>
                        <td className={'table-data-container'} data-label={'Points Earned'}>{item.points_earned}</td>
                    </tr>
                )
            })}
            </tbody>
        </table>
    </div>);
}

const mapStateToProps = createStructuredSelector({
    senior_payment_table_log: selectSeniorPaymentTableLogs
});

export default connect(mapStateToProps)(SeniorPaymentTable);