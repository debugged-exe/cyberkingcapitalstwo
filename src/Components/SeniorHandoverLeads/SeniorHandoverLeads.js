import React from 'react';
import SeniorHandoverTable from './SeniorHandoverTable/SeniorHandoverTable.js';
import './SeniorHandoverLeads.scss';

const SeniorHandoverLeads = () => {
	return (
		<div className="senior-handover-leads">
			<p className="senior-handover-leads-header">Handed Over Leads</p>
			<SeniorHandoverTable />
		</div>
	)
}

export default SeniorHandoverLeads;