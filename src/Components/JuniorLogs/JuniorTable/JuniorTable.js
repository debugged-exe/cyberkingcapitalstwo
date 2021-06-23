import React from 'react';
//css
import './JuniorTable.scss';
//redux
import {connect} from "react-redux";
import {
    setModalLead
} from "../../../redux/junior-panel/junior-logs/junior.logs.actions";

//reselect
import {createStructuredSelector} from "reselect";
import {selectJuniorTableLogs} from "../../../redux/junior-panel/junior-logs/junior.logs.selectors";

const header = ["Lead Id", "Assigned to", "Lead Name", "Lead contact", "Whatsapp No.",
                "Account Opening No.", "City", "Trading knowledge", "Preferred Language",
                "status 1", "status 2", "Handover status", "Coded"];

const JuniorTable = ({ junior_table_logs,setModalLead}) => {
    return (<div className={'junior-table-container'}>
        <table cellSpacing="1" className={'junior-table-box'}>
            <thead className={'junior-table-head-container'}>
            <tr>
                {header.map((item, index) => {
                    return (
                        <th className={'junior-table-header-container'}>{item}</th>
                    );
                })}
            </tr>
            </thead>
            <tbody className={'junior-table-body-container'}>
            {junior_table_logs.map((item, index) => {
                return (
                    <tr className="junior-table-row-container">
                        <td className={'junior-table-data-container'} data-label={'Lead ID'}>{item.lead_id}</td>
                        <td className={'junior-table-data-container'} data-label={'Assigned to'}>{item.assigned_to}</td>
                        <td className={'junior-table-data-container'} data-label={'Lead Name'}>{item.lead_name}</td>
                        <td className={'junior-table-data-container'} data-label={'Lead Contact'}>{item.lead_phone_no}</td>
                        <td className={'junior-table-data-container'} data-label={'Whatsapp Number'}>{`${item.lead_whatsapp_no?item.lead_whatsapp_no:"NULL"}`}</td>
                        <td className={'junior-table-data-container'} data-label={'Account Opening Number'}>{`${item.account_opening_no?item.account_opening_no:"NULL"}`}</td>
                        <td className={'junior-table-data-container'} data-label={'City'}>{item.lead_city}</td>
                        <td className={'junior-table-data-container'} data-label={'Trading Knowledge'}>{item.prior_knowledge}</td>
                        <td className={'junior-table-data-container'} data-label={'Preferred Language'}>{item.preferred_language}</td>
                        <td className={'junior-table-data-container'} data-label={'Status 1'}>{`${item.status_1?item.status_1:"NULL"}`}</td>
                        <td className={'junior-table-data-container'} data-label={'Status 2'}>{`${item.status_2?item.status_2:"NULL"}`}</td>
                        <td className={'junior-table-data-container'} data-label={'Handover Status'}>{`${item.handover_status?item.handover_status:"NULL"}`}</td>
                        <td className={'junior-table-data-container'} data-label={'Coded'}>{`${item.coded?item.coded:"NULL"}`}</td>
                        <td className={'junior-table-data-container request-button-center'}>
                                <button className="ma1" onClick={() => {setModalLead(item)}}>Update</button>
                                <button className="ma1">Handover</button>
                                <button className="ma1">Request</button>
                        </td>
                    </tr>
                )
            })}
            </tbody>
        </table>
    </div>);
}
const mapStateToProps = createStructuredSelector({
    junior_table_logs: selectJuniorTableLogs
});

const mapDispatchToProps = dispatch => ({
    setModalLead: lead => dispatch(setModalLead(lead))
})
export default connect(mapStateToProps, mapDispatchToProps)(JuniorTable);