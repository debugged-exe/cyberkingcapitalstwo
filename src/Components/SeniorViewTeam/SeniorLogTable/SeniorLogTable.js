import React from 'react';

// redux
import { connect } from 'react-redux';

//reselect
import {createStructuredSelector} from "reselect";
import {selectSeniorJuniorLeadArray, selectSeniorJuniorLeadTableVisibility} from "../../../redux/senior-panel/senior-view-team/senior.view.team.selectors";

//css
import './SeniorLogTable.scss';

//table header data
const header = ["Lead Id", "Assigned to", "Lead Name", "Lead contact", "Whatsapp No.",
    "Account Opening No.", "City", "Trading knowledge", "Preferred Language",
    "status 1", "status 2", "Handover status", "Coded", "Payment"];

const SeniorLogTable = ({junior_lead_array, junior_lead_table_visibility}) => {
    return (<div className={`${junior_lead_table_visibility?'senior-table-container':'hidden'}`}>
        <h1 className={'flex justify-center logHeader'}>View Logs Table</h1>
        <table cellSpacing="1" className={'senior-table-box'}>
            <thead className={'senior-table-head-container'}>
            <tr>
                {header.map((item, index) => {
                    return (
                        <th className={'senior-table-header-container'}>{item}</th>
                    );
                })}
            </tr>
            </thead>
            <tbody className={'senior-table-body-container'}>
            {junior_lead_array.map((item, index) => {
                return (
                    <tr className="senior-table-row-container">
                        <td className={'senior-table-data-container'} data-label={'Lead ID'}>{item.lead_id}</td>
                        <td className={'senior-table-data-container'} data-label={'Assigned to'}>{item.assigned_to}</td>
                        <td className={'senior-table-data-container'} data-label={'Lead Name'}>{item.lead_name}</td>
                        <td className={'senior-table-data-container'} data-label={'Lead Contact'}>{item.lead_contact}</td>
                        <td className={'senior-table-data-container'} data-label={'Whatsapp Number'}>{item.whatsapp_no}</td>
                        <td className={'senior-table-data-container'} data-label={'Account Opening Number'}>{item.account_opening_no}</td>
                        <td className={'senior-table-data-container'} data-label={'City'}>{item.city}</td>
                        <td className={'senior-table-data-container'} data-label={'Trading Knowledge'}>{item.trading_knowledge}</td>
                        <td className={'senior-table-data-container'} data-label={'Preferred Language'}>{item.preferred_language}</td>
                        <td className={'senior-table-data-container'} data-label={'Status 1'}>{item.status_1}</td>
                        <td className={'senior-table-data-container'} data-label={'Status 2'}>{item.status_2}</td>
                        <td className={'senior-table-data-container'} data-label={'Handover Status'}>{item.handover_status}</td>
                        <td className={'senior-table-data-container'} data-label={'Coded'}>{item.coded}</td>
                        <td className={'senior-table-data-container'} data-label={'Payment'}>{item.payment}</td>
                    </tr>
                )
            })}
            </tbody>
        </table>
    </div>);
}

const mapStateToProps = createStructuredSelector({
    junior_lead_array: selectSeniorJuniorLeadArray,
    junior_lead_table_visibility: selectSeniorJuniorLeadTableVisibility
});

export default connect(mapStateToProps)(SeniorLogTable);