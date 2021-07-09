import React from 'react';
import {ToastContainer,toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// redux
import { connect } from 'react-redux';
import {
    setSeniorModelLead,
    handbackLead
} from '../../../redux/senior-panel/senior-handover/senior.handover.actions.js';

//reselect
import {createStructuredSelector} from "reselect";
import {selectSeniorHandoverLeadsArray} from "../../../redux/senior-panel/senior-handover/senior.handover.selectors";
import {selectCurrentUser} from "../../../redux/user/user.selectors";

// css
import './SeniorHandoverTable.scss';

toast.configure();

const SeniorHandoverTable = ({handover_leads_array,setSeniorModelLead,handbackLead,currentUser}) => {
	const header = ["Lead Id", "Assigned to", "Lead Name", "Lead contact", "Whatsapp No.",
    "Account Opening No.", "Account Opening Name", "City", "Trading knowledge", "Preferred Language",
    "status 1", "status 2", "Handover status", "Coded"];

    const onDoneHandler = (lead_id) => {
        fetch('https://aqueous-mesa-28052.herokuapp.com/senior/reset_handover',{
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                lead_id: lead_id
            })
        })
        .then(response => response.json())
        .then(resp => {
            if(resp==='Success')
            {
                toast.success("Lead handed back to junior telecaller successfully", {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 4000,
                });
                handbackLead(lead_id);
            }
        })
        .catch(err => {
            console.log(err);
            toast.error("Failed to handback.Please try again.", {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 4000,
                });
        })
    }

    const onDeleteHandler = (lead_id, lead_phone_no) => {
        const {telecaller_id, username} = currentUser;
        fetch('https://aqueous-mesa-28052.herokuapp.com/senior/delete_request',{
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
            if(resp==='Success')
            {
                toast.success("Delete request successfull", {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 2500,
                });
                handbackLead(lead_id);
            }
        })
        .catch(err => {
            console.log(err);
            toast.error("Delete request failed.Please try again.", {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 2500,
            });
        })
    }

	return (
		<div className="senior-handover-table-container">
			<table cellSpacing="1" className={'senior-handover-table-box'}>
            <thead className={'senior-handover-table-head-container'}>
            <tr>
                {header.map((item, index) => {
                    return (
                        <th key={index} className={'senior-handover-table-header-container'}>{item}</th>
                    );
                })}
            </tr>
            </thead>
            <tbody className={'senior-handover-table-body-container'}>
            {handover_leads_array.map((item, index) => {
                return (
                    <tr key={index} className="senior-handover-table-row-container">
                        <td className={'senior-handover-table-data-container'} data-label={'Lead ID'}>{item.lead_id}</td>
                        <td className={'senior-handover-table-data-container'} data-label={'Assigned to'}>{item.assigned_to}</td>
                        <td className={'senior-handover-table-data-container'} data-label={'Lead Name'}>{item.lead_name}</td>
                        <td className={'senior-handover-table-data-container'} data-label={'Lead Contact'}>{item.lead_phone_no}</td>
                        <td className={'senior-handover-table-data-container'} data-label={'Whatsapp Number'}>{`${item.lead_whatsapp_no?item.lead_whatsapp_no:"NULL"}`}</td>
                        <td className={'senior-handover-table-data-container'} data-label={'Account Opening Number'}>{`${item.account_opening_no?item.account_opening_no:"NULL"}`}</td>
                        <td className={'senior-handover-table-data-container'} data-label={'Account Opening Name'}>{`${item.account_opening_name?item.account_opening_name:"NULL"}`}</td>
                        <td className={'senior-handover-table-data-container'} data-label={'City'}>{item.lead_city}</td>
                        <td className={'senior-handover-table-data-container'} data-label={'Trading Knowledge'}>{item.prior_knowledge}</td>
                        <td className={'senior-handover-table-data-container'} data-label={'Preferred Language'}>{item.preferred_language}</td>
                        <td className={'senior-handover-table-data-container'} data-label={'Status 1'}>{`${item.status_1?item.status_1:"NULL"}`}</td>
                        <td className={'senior-handover-table-data-container'} data-label={'Status 2'}>{`${item.status_2?item.status_2:"NULL"}`}</td>
                        <td className={'senior-handover-table-data-container'} data-label={'Handover Status'}>{`${item.handover_status?item.handover_status:"NULL"}`}</td>
                        <td className={'senior-handover-table-data-container'} data-label={'Coded'}>{`${item.coded?item.coded:"NULL"}`}</td>
                       	<td className={'senior-handover-table-data-container senior-button-center'}>
							<button className={'ma1'} onClick={() => setSeniorModelLead(item)}>Update</button>
							<button className={'ma1'} onClick={() => onDoneHandler(item.lead_id)}>Done</button>
                            <button className={'ma1'} onClick={() => onDeleteHandler(item.lead_id, item.lead_phone_no)}>Delete</button>
                       	</td>
                    </tr>
                )
            })}
            </tbody>
        </table>
        <ToastContainer/>
		</div>
	)
}

const mapStateToProps = createStructuredSelector({
	handover_leads_array: selectSeniorHandoverLeadsArray,
    currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
    setSeniorModelLead: lead => dispatch(setSeniorModelLead(lead)),
    handbackLead: lead => dispatch(handbackLead(lead))
})

export default connect(mapStateToProps, mapDispatchToProps)(SeniorHandoverTable);