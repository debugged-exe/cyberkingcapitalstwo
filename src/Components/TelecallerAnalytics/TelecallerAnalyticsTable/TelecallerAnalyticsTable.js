import React from 'react';
import {ToastContainer,toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//css
import './TelecallerAnalyticsTable.scss';
//redux
import {connect} from "react-redux";
// import {} from "../../../redux/junior-panel/junior-logs/junior.logs.actions";

//reselect
import {createStructuredSelector} from "reselect";
import {selectAdminAnalyticsLogs} from '../../../redux/admin-panel/admin-analytics/admin.analytics.selectors.js';

const header = [
    "Lead Id",
    "Assigned to",
    "Lead Name",
    "Lead contact",
    "Form Filled At",
    "Fetched At",
    "Handedover At",
    "Handover Retrieved",
    "Coded At",
    "Status 1",
    "Status 2",
    "Referral Request",
    "Referral Accepted"
];

toast.configure();

const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

const TelecallerAnalyticsTable = ({analytics_logs}) => {
    return (<div className={'telecaller-analytics-table-container'}>
        <table cellSpacing="1" className={'telecaller-analytics-table-box'}>
            <thead className={'telecaller-analytics-table-head-container'}>
            <tr>
                {header.map((item, index) => {
                    return (
                        <th className={'telecaller-analytics-table-header-container'}>{item}</th>
                    );
                })}
            </tr>
            </thead>
            <tbody className={'telecaller-analytics-table-body-container'}>
            { analytics_logs.map((item, index) => {
                return (
                    <tr className={`telecaller-analytics-table-row-container`}>
                        {
                            Object.keys(item).map(key => {
                                let labelArr = key.split('_');
                                let label = ''
                                labelArr.map(i => {
                                    label = label + i;
                                })
                                label = capitalizeFirstLetter(label)
                                if(item[key]===null){
                                     return(
                                        <td className={`telecaller-analytics-table-data-container bg-white`} data-label={label}>{'NULL'}</td>
                                    );
                                }
                                else if(key==='lead_id' || key==="assigned_to" || key==="lead_name" || key==="lead_phone_no"){
                                    return(
                                        <td className={`telecaller-analytics-table-data-container bg-white`} data-label={label}>{item[key]}</td>
                                    );
                                }
                                else
                                {
                                    let time = new Date(item[key])
                                    let date = time.getDate() + '-' + (time.getMonth()+1) + '-' + time.getFullYear()
                                    return(
                                        <td className={`telecaller-analytics-table-data-container bg-white`} data-label={label}>{date}</td>
                                    );
                                }
                            })
                        }
                    </tr>
                )
            })}
            </tbody>
        </table>
        <ToastContainer />
    </div>);
}
const mapStateToProps = createStructuredSelector({
    analytics_logs: selectAdminAnalyticsLogs
});

// const mapDispatchToProps = dispatch => ({

// })
export default connect(mapStateToProps)(TelecallerAnalyticsTable);
