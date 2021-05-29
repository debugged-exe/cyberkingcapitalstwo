import React from 'react';
//redux
import {connect} from 'react-redux';
//reselect
import {createStructuredSelector} from "reselect";
import {selectAdminLeadTableArray} from "../../../redux/admin-panel/admin-logs/admin.logs.selectors";
//css
import './AdminViewLogsTable.scss';

const header = [
    "Lead Id",
    "Assigned to",
    "Lead Name",
    "Lead contact",
    "Whatsapp number",
    "Account opening number",
    "status 1",
    "status 2",
    "Handover status",
    "Preffered Language",
    "Coded",
    "Payment"
];

const AdminViewLogsTable = ({lead_table_array}) => {
    return (
        <div className={'admin-view-log-table-container'}>
            <table cellSpacing="1" className={'admin-view-log-table-box'}>
                <thead className={'admin-view-log-table-head-container'}>
                <tr>
                    {header.map((item, index) => {
                        return (
                            <th className={'admin-view-log-table-header-container'}>{item}</th>
                        );
                    })}
                </tr>
                </thead>
                <tbody className={'admin-view-log-table-body-container'}>
                {lead_table_array.map((item, index) => {
                    return (
                        <tr className="admin-view-log-table-row-container">
                            <td className={'admin-view-log-table-data-container'} data-label={'Lead ID'}>{item.lead_id}</td>
                            <td className={'admin-view-log-table-data-container'} data-label={'Assigned to'}>{item.assigned_to}</td>
                            <td className={'admin-view-log-table-data-container'} data-label={'Lead Name'}>{item.lead_name}</td>
                            <td className={'admin-view-log-table-data-container'} data-label={'Lead Contact'}>{item.lead_contact}</td>
                            <td className={'admin-view-log-table-data-container'} data-label={'Whatsapp Number'}>{item.whatsapp_no}</td>
                            <td className={'admin-view-log-table-data-container'} data-label={'Account Opening Number'}>{item.account_opening_no}</td>
                            <td className={'admin-view-log-table-data-container'} data-label={'Status 1'}>{item.status_1}</td>
                            <td className={'admin-view-log-table-data-container'} data-label={'Status 2'}>{item.status_2}</td>
                            <td className={'admin-view-log-table-data-container'} data-label={'Handover Status'}>{item.handover_status}</td>
                            <td className={'admin-view-log-table-data-container'} data-label={'Preferred Language'}>{item.preferred_language}</td>
                            <td className={'admin-view-log-table-data-container'} data-label={'Coded'}>{item.coded}</td>
                            <td className={'admin-view-log-table-data-container'} data-label={'Payment'}>{item.payment}</td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
        </div>
    );
}

const mapStateToProps = createStructuredSelector({
    lead_table_array: selectAdminLeadTableArray
});

export default connect(mapStateToProps,null)(AdminViewLogsTable);