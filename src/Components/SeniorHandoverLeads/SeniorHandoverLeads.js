import React,{useEffect} from 'react';

// redux
import { connect } from 'react-redux';
import {setHandoverLeadArray} from '../../redux/senior-panel/senior-handover/senior.handover.actions.js';

// components
import SeniorHandoverTable from './SeniorHandoverTable/SeniorHandoverTable.js';

// css
import './SeniorHandoverLeads.scss';

const tableLogs = [
	    {
	        lead_id: 1,
	        assigned_to: "xyz",
	        lead_name: "abcde",
	        lead_contact: 9087389032,
	        whatsapp_no: 8903221111,
	        account_opening_no: 123,
	        city: "pune",
	        trading_knowledge: "no",
	        preferred_language: "hindi",
	        status_1: "complete",
	        status_2: "uncomplete",
	        handover_status: "complete",
	        coded: "---"
	    },
	    {
	        lead_id: 2,
	        assigned_to: "mmmmm",
	        lead_name: "oooooo",
	        lead_contact: 9000001222,
	        whatsapp_no: 9090912121,
	        account_opening_no: 8011,
	        city: "pune",
	        trading_knowledge: "no",
	        preferred_language: "marathi",
	        status_1: "complete",
	        status_2: "uncomplete",
	        handover_status: "complete",
	        coded: "---"
	    }
	]

const SeniorHandoverLeads = ({setHandoverLeadArray}) => {

	useEffect(() => {
		setHandoverLeadArray(tableLogs)
	}, [])

	return (
		<div className="senior-handover-leads">
			<p className="senior-handover-leads-header">Handed Over Leads</p>
			<SeniorHandoverTable />
		</div>
	)
}

const mapDispatchToProps = dispatch => ({
	setHandoverLeadArray: array => dispatch(setHandoverLeadArray(array))
});

export default connect(null, mapDispatchToProps)(SeniorHandoverLeads);