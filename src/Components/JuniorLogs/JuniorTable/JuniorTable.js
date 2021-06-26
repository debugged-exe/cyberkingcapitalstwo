import React from 'react';
import {ToastContainer,toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//css
import './JuniorTable.scss';
//redux
import {connect} from "react-redux";
import {
    setModalLead,
    reassignHandoverFlag,
    reassignCodedFlag
} from "../../../redux/junior-panel/junior-logs/junior.logs.actions";

//reselect
import {createStructuredSelector} from "reselect";
import {selectJuniorTableLogs} from "../../../redux/junior-panel/junior-logs/junior.logs.selectors";
import {selectCurrentUser} from "../../../redux/user/user.selectors";

const header = ["Lead Id", "Assigned to", "Lead Name", "Lead contact", "Whatsapp No.",
                "Account Opening No.", "City", "Trading knowledge", "Preferred Language",
                "status 1", "status 2", "Handover status", "Coded"];

toast.configure();

const JuniorTable = ({ junior_table_logs,setModalLead,currentUser,reassignHandoverFlag,reassignCodedFlag}) => {

    const handoverHandler = (lead_id, lead_phone_no) => {
        const {telecaller_id, assigned_to} = currentUser;
        fetch('https://aqueous-mesa-28052.herokuapp.com/junior/handover', {
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    lead_id: lead_id,
                    lead_phone_no: lead_phone_no,
                    telecaller_id: telecaller_id,
                    senior_id: assigned_to
                })
        })
        .then(response => response.json())
        .then(resp => {
            console.log(resp)
            reassignHandoverFlag({lead_id: resp.lead_id, flag: 'yes'});
            toast.success("Handed over successfully", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 2500,
            });
        })
        .catch(err => {
            console.log(err);
            toast.error("Unable to handover.Please try again.", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 2500,
            });
        })
    }

    const requestHandler = (lead_id, lead_phone_no) => {
        const {telecaller_id, username} = currentUser;
        fetch('https://aqueous-mesa-28052.herokuapp.com/junior/request_coded', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                lead_id: lead_id,
                lead_phone_no: lead_phone_no,
                telecaller_id: telecaller_id,
                telecaller_name: username
            })
        })
        .then(response => response.json())
        .then(resp => {
            reassignCodedFlag({lead_id: lead_id})
            toast.success(" Coded Request Successful", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 4000,
            });
        })
        .catch(err => {
            console.log(err);
            toast.error("Error during Coded Request.Please try again.", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 4000,
            });
        })
    }

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
                var flag;
                if(item.handover_flag==='yes')
                {
                    flag = true;
                }
                else
                {
                    flag = null;
                }
                return (
                    <tr className={`junior-table-row-container`}>
                        <td className={`junior-table-data-container ${item.handover_flag==='yes'?'bg-moon-gray fw5':'bg-white'}`} data-label={'Lead ID'}>{item.lead_id}</td>
                        <td className={`junior-table-data-container ${item.handover_flag==='yes'?'bg-moon-gray fw5':'bg-white'}`} data-label={'Assigned to'}>{item.assigned_to}</td>
                        <td className={`junior-table-data-container ${item.handover_flag==='yes'?'bg-moon-gray fw5':'bg-white'}`} data-label={'Lead Name'}>{item.lead_name}</td>
                        <td className={`junior-table-data-container ${item.handover_flag==='yes'?'bg-moon-gray fw5':'bg-white'}`} data-label={'Lead Contact'}>{item.lead_phone_no}</td>
                        <td className={`junior-table-data-container ${item.handover_flag==='yes'?'bg-moon-gray fw5':'bg-white'}`} data-label={'Whatsapp Number'}>{`${item.lead_whatsapp_no?item.lead_whatsapp_no:"NULL"}`}</td>
                        <td className={`junior-table-data-container ${item.handover_flag==='yes'?'bg-moon-gray fw5':'bg-white'}`} data-label={'Account Opening Number'}>{`${item.account_opening_no?item.account_opening_no:"NULL"}`}</td>
                        <td className={`junior-table-data-container ${item.handover_flag==='yes'?'bg-moon-gray fw5':'bg-white'}`} data-label={'City'}>{item.lead_city}</td>
                        <td className={`junior-table-data-container ${item.handover_flag==='yes'?'bg-moon-gray fw5':'bg-white'}`} data-label={'Trading Knowledge'}>{item.prior_knowledge}</td>
                        <td className={`junior-table-data-container ${item.handover_flag==='yes'?'bg-moon-gray fw5':'bg-white'}`} data-label={'Preferred Language'}>{item.preferred_language}</td>
                        <td className={`junior-table-data-container ${item.handover_flag==='yes'?'bg-moon-gray fw5':'bg-white'}`} data-label={'Status 1'}>{`${item.status_1?item.status_1:"NULL"}`}</td>
                        <td className={`junior-table-data-container ${item.handover_flag==='yes'?'bg-moon-gray fw5':'bg-white'}`} data-label={'Status 2'}>{`${item.status_2?item.status_2:"NULL"}`}</td>
                        <td className={`junior-table-data-container ${item.handover_flag==='yes'?'bg-moon-gray fw5':'bg-white'}`} data-label={'Handover Status'}>{`${item.handover_status?item.handover_status:"NULL"}`}</td>
                        <td className={`junior-table-data-container ${item.handover_flag==='yes'?'bg-moon-gray fw5':'bg-white'}`} data-label={'Coded'}>{`${item.coded?item.coded:"NULL"}`}</td>
                        <td className={`junior-table-data-container request-button-center ${item.handover_flag==='yes'?'bg-moon-gray fw5':'bg-white'}`}>
                                <button className="ma1" disabled={flag} onClick={() => {setModalLead(item)}}>Update</button>
                                <button className="ma1" disabled={flag} onClick={() => handoverHandler(item.lead_id, item.lead_phone_no)}>Handover</button>
                                <button className="ma1" disabled={flag} onClick={() => requestHandler(item.lead_id, item.lead_phone_no)}>Request</button>
                        </td>
                    </tr>
                )
            })}
            </tbody>
        </table>
    </div>);
}
const mapStateToProps = createStructuredSelector({
    junior_table_logs: selectJuniorTableLogs,
    currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
    setModalLead: lead => dispatch(setModalLead(lead)),
    reassignHandoverFlag: flag => dispatch(reassignHandoverFlag(flag)),
    reassignCodedFlag: flag => dispatch(reassignCodedFlag(flag))
})
export default connect(mapStateToProps, mapDispatchToProps)(JuniorTable);