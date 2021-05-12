import React from 'react';
import './SeniorLogTable.scss';
const header = ["Lead Id", "Assigned to", "Lead Name", "Lead contact", "Whatsapp No.",
    "Account Opening No.", "City", "Trading knowledge", "Preferred Language",
    "status 1", "status 2", "Handover status", "Coded", "Payment"];
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
        coded: "---",
        payment: "done"
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
        coded: "---",
        payment: "no"
    }
]
const JuniorTable = () => {
    return (<div className={'senior-table-container'}>
        <table cellSpacing="1" className={'senior-table-box'}>
            <thead className={'senior-table-head-container'}>
            <tr>
                {header.map((item, index) => {
                    return (
                        <th className={'senior-table-header-container'}>{item}</th>
                    );
                })}
            </tr>
            </thead>
            <tbody className={'senior-table-body-container'}>
            {tableLogs.map((item, index) => {
                return (
                    <tr className="senior-table-row-container">
                        <td className={'senior-table-data-container'} data-label={'Lead ID'}>{item.lead_id}</td>
                        <td className={'senior-table-data-container'} data-label={'Assigned to'}>{item.assigned_to}</td>
                        <td className={'senior-table-data-container'} data-label={'Lead Name'}>{item.lead_name}</td>
                        <td className={'senior-table-data-container'} data-label={'Lead Contact'}>{item.lead_contact}</td>
                        <td className={'senior-table-data-container'} data-label={'Whatsapp Number'}>{item.whatsapp_no}</td>
                        <td className={'senior-table-data-container'} data-label={'Account Opening Number'}>{item.account_opening_no}</td>
                        <td className={'senior-table-data-container'} data-label={'City'}>{item.city}</td>
                        <td className={'senior-table-data-container'} data-label={'Trading Knowledge'}>{item.trading_knowledge}</td>
                        <td className={'senior-table-data-container'} data-label={'Preferred Language'}>{item.preferred_language}</td>
                        <td className={'senior-table-data-container'} data-label={'Status 1'}>{item.status_1}</td>
                        <td className={'senior-table-data-container'} data-label={'Status 2'}>{item.status_2}</td>
                        <td className={'senior-table-data-container'} data-label={'Handover Status'}>{item.handover_status}</td>
                        <td className={'senior-table-data-container'} data-label={'Coded'}>{item.coded}</td>
                        <td className={'senior-table-data-container'} data-label={'Payment'}>{item.payment}</td>
                    </tr>
                )
            })}
            </tbody>
        </table>
    </div>);
}

export default JuniorTable;