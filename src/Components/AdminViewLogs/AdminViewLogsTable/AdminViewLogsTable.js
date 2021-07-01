import React from 'react';
//redux
import {connect} from 'react-redux';
//reselect
import {createStructuredSelector} from "reselect";
import {selectAdminLeadTableArray} from "../../../redux/admin-panel/admin-logs/admin.logs.selectors";
//css
import './AdminViewLogsTable.scss';
import {ToastContainer} from "react-toastify";

const header = [
    "Lead Id",
    "Assigned to",
    "Lead Name",
    "Lead contact",
    "Whatsapp number",
    "Account opening number",
    "City",
    "status 1",
    "status 2",
    "Handover status",
    "Preffered Language",
    "Coded",
];

const AdminViewLogsTable = ({lead_table_array, language}) => {
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
                {lead_table_array.filter((item, i) =>{
                    if(language === item.preferred_language)
                        return item
                    else if (language==='*'){
                        return item
                    }
                }).map((item, index) => {
                    return (
                        <tr className="admin-view-log-table-row-container">
                            <td className={'admin-view-log-table-data-container'} data-label={'Lead ID'}>{item.lead_id}</td>
                            <td className={'admin-view-log-table-data-container'} data-label={'Assigned to'}>{`${item.assigned_to?item.assigned_to:"NULL"}`}</td>
                            <td className={'admin-view-log-table-data-container'} data-label={'Lead Name'}>{item.lead_name}</td>
                            <td className={'admin-view-log-table-data-container'} data-label={'Lead Contact'}>{item.lead_phone_no}</td>
                            <td className={'admin-view-log-table-data-container'} data-label={'Whatsapp Number'}>{`${item.lead_whatsapp_no?item.lead_whatsapp_no:"NULL"}`}</td>
                            <td className={'admin-view-log-table-data-container'} data-label={'Account Opening Number'}>{`${item.account_opening_no?item.account_opening_no:"NULL"}`}</td>
                            <td className={'admin-view-log-table-data-container'} data-label={'City'}>{item.lead_city}</td>
                            <td className={'admin-view-log-table-data-container'} data-label={'Status 1'}>{`${item.status_1?item.status_1:"NULL"}`}</td>
                            <td className={'admin-view-log-table-data-container'} data-label={'Status 2'}>{`${item.status_2?item.status_2:"NULL"}`}</td>
                            <td className={'admin-view-log-table-data-container'} data-label={'Handover Status'}>{`${item.handover_status?item.handover_status:"NULL"}`}</td>
                            <td className={'admin-view-log-table-data-container'} data-label={'Preferred Language'}>{item.preferred_language}</td>
                            <td className={'admin-view-log-table-data-container'} data-label={'Coded'}>{`${item.coded?item.coded:"NULL"}`}</td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
            <ToastContainer />
        </div>
    );
}

const mapStateToProps = createStructuredSelector({
    lead_table_array: selectAdminLeadTableArray
});

export default connect(mapStateToProps,null)(AdminViewLogsTable);