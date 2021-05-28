import React from 'react';

// redux
import { connect } from 'react-redux';

// css
import './SeniorHandoverTable.scss';

const SeniorHandoverTable = ({handover_leads_array}) => {
	const header = ["Lead Id", "Assigned to", "Lead Name", "Lead contact", "Whatsapp No.",
    "Account Opening No.", "City", "Trading knowledge", "Preferred Language",
    "status 1", "status 2", "Handover status", "Coded"];

	return (
		<div className="senior-handover-table-container">
			<table cellSpacing="1" className={'senior-handover-table-box'}>
            <thead className={'senior-handover-table-head-container'}>
            <tr>
                {header.map((item, index) => {
                    return (
                        <th className={'senior-handover-table-header-container'}>{item}</th>
                    );
                })}
            </tr>
            </thead>
            <tbody className={'senior-handover-table-body-container'}>
            {handover_leads_array.map((item, index) => {
                return (
                    <tr className="senior-handover-table-row-container">
                        <td className={'senior-handover-table-data-container'} data-label={'Lead ID'}>{item.lead_id}</td>
                        <td className={'senior-handover-table-data-container'} data-label={'Assigned to'}>{item.assigned_to}</td>
                        <td className={'senior-handover-table-data-container'} data-label={'Lead Name'}>{item.lead_name}</td>
                        <td className={'senior-handover-table-data-container'} data-label={'Lead Contact'}>{item.lead_contact}</td>
                        <td className={'senior-handover-table-data-container'} data-label={'Whatsapp Number'}>{item.whatsapp_no}</td>
                        <td className={'senior-handover-table-data-container'} data-label={'Account Opening Number'}>{item.account_opening_no}</td>
                        <td className={'senior-handover-table-data-container'} data-label={'City'}>{item.city}</td>
                        <td className={'senior-handover-table-data-container'} data-label={'Trading Knowledge'}>{item.trading_knowledge}</td>
                        <td className={'senior-handover-table-data-container'} data-label={'Preferred Language'}>{item.preferred_language}</td>
                        <td className={'senior-handover-table-data-container'} data-label={'Status 1'}>{item.status_1}</td>
                        <td className={'senior-handover-table-data-container'} data-label={'Status 2'}>{item.status_2}</td>
                        <td className={'senior-handover-table-data-container'} data-label={'Handover Status'}>{item.handover_status}</td>
                        <td className={'senior-handover-table-data-container'} data-label={'Coded'}>{item.coded}</td>
                       	<td className={'senior-handover-table-data-container senior-button-center'}>
							<button className={'ma1'}>Update</button>
							<button className={'ma1'}>Done</button>
                       	</td>
                    </tr>
                )
            })}
            </tbody>
        </table>
		</div>
	)
}

const mapStateToProps = ({senior_panel: {senior_handover}}) => ({
	handover_leads_array: senior_handover.handover_leads_array
});

export default connect(mapStateToProps)(SeniorHandoverTable);