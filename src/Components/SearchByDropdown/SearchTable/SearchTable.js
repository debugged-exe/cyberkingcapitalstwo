import React, {useEffect} from 'react';
//css
import './SearchTable.scss';
//redux
import {connect} from "react-redux";

//reselect
import {createStructuredSelector} from "reselect";
import {selectSeniorSearchTableArray} from "../../../redux/senior-panel/senior-search/senior.search.selectors";
import {setSeniorSearchTableArray} from "../../../redux/senior-panel/senior-search/senior.search.actions";
import {ToastContainer} from "react-toastify";

const header = ["Lead Id", "Assigned to", "Lead Name", "Lead contact", "Whatsapp No.",
    "Account Opening No.","Account Opening Name", "City", "Trading knowledge", "Preferred Language",
    "status 1", "status 2", "Handover status"];

const SearchTable = ({search_table_logs,setSeniorSearchTableArray}) => {

    return (<div className={'senior-search-table-container'}>
        <table cellSpacing="1" className={'senior-search-table-box'}>
            <thead className={'senior-search-table-head-container'}>
            <tr>
                {header.map((item, index) => {
                    return (
                        <th className={'senior-search-table-header-container'}>{item}</th>
                    );
                })}
            </tr>
            </thead>
            <tbody className={'senior-search-table-body-container'}>
            {search_table_logs.map((item, index) => {
                return (
                    <tr className={`senior-search-table-row-container`}>
                        <td className={`senior-search-table-data-container`} data-label={'Lead ID'}>{item.lead_id}</td>
                        <td className={`senior-search-table-data-container`} data-label={'Assigned to'}>{`${item.assigned_to?item.assigned_to:"NULL"}`}</td>
                        <td className={`senior-search-table-data-container`} data-label={'Lead Name'}>{item.lead_name}</td>
                        <td className={`senior-search-table-data-container`} data-label={'Lead Contact'}>{item.lead_phone_no}</td>
                        <td className={`senior-search-table-data-container`} data-label={'Whatsapp Number'}>{`${item.lead_whatsapp_no?item.lead_whatsapp_no:"NULL"}`}</td>
                        <td className={`senior-search-table-data-container`} data-label={'Account Opening Number'}>{`${item.account_opening_no?item.account_opening_no:"NULL"}`}</td>
                        <td className={`senior-search-table-data-container`} data-label={'Account Opening Name'}>{`${item.account_opening_name?item.account_opening_name:"NULL"}`}</td>
                        <td className={`senior-search-table-data-container`} data-label={'City'}>{item.lead_city}</td>
                        <td className={`senior-search-table-data-container`} data-label={'Trading Knowledge'}>{item.prior_knowledge}</td>
                        <td className={`senior-search-table-data-container`} data-label={'Preferred Language'}>{item.preferred_language}</td>
                        <td className={`senior-search-table-data-container`} data-label={'Status 1'}>{`${item.status_1?item.status_1:"NULL"}`}</td>
                        <td className={`senior-search-table-data-container`} data-label={'Status 2'}>{`${item.status_2?item.status_2:"NULL"}`}</td>
                        <td className={`senior-search-table-data-container`} data-label={'Handover Status'}>{`${item.handover_status?item.handover_status:"NULL"}`}</td>
                    </tr>
                );
            })}
            </tbody>
        </table>
        <ToastContainer/>
    </div>);
}

const mapStateToProps = createStructuredSelector({
    search_table_logs: selectSeniorSearchTableArray
});

const mapDispatchToProps = dispatch => ({
    setSeniorSearchTableArray: array => dispatch(setSeniorSearchTableArray(array))
});
export default connect(mapStateToProps, mapDispatchToProps)(SearchTable);