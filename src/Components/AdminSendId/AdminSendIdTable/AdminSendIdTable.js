import React from 'react';
import 'react-toastify/dist/ReactToastify.css';

// components
// css
import './AdminSendIdTable.scss';

const header = [
    "Sr.No",
    "Lead Id",
    "Lead Name",
    "Lead Phone No.",
    "Lead Whatsapp No.",
    "Account Opening Number",
    "Remove",
    "Send"
]

const AdminSendIdTable = ({data}) => {

    return(
        <div className={'admin-sendid-container'}>
            {/*<button className="accept-all">Accept All</button>*/}
            <table cellSpacing="1" className={'admin-sendid-box'}>
                <thead className={'admin-sendid-head-container'}>
                <tr>
                    {header.map((item, index) => {
                        return (
                            <th className={'admin-sendid-header-container'}>{item}</th>
                        );
                    })}
                </tr>
                </thead>
                <tbody className={'admin-sendid-body-container'}>
                {data.map((item, index) => {
                    return (
                        <tr key={index} className="admin-sendid-row-container">
                            <td className={'admin-sendid-data-container'} data-label={'Sr.No'}>{index+1}</td>
                            <td className={'admin-sendid-data-container'} data-label={'Lead Id'}>{item.lead_id}</td>
                            <td className={'admin-sendid-data-container'} data-label={'Lead Name'}>{item.lead_name}</td>
                            <td className={'admin-sendid-data-container'} data-label={'Lead Phone No.'}>{`${item.lead_phone_no?item.lead_phone_no:'NULL'}`}</td>
                            <td className={'admin-sendid-data-container'} data-label={'Lead Whatsapp No.'}>{`${item.lead_whatsapp_no?item.lead_whatsapp_no:'NULL'}`}</td>
                            <td className={'admin-sendid-data-container'} data-label={'Account Opening No.'}>{`${item.account_opening_no?item.account_opening_no:'NULL'}`}</td>
                            <td className={'admin-sendid-data-container'} data-label={'Account Opening No.'}><a class="f6 link dim ph3 pv2 mb2 dib white bg-red" href="#0">Remove</a></td>
                            <td className={'admin-sendid-data-container'} data-label={'Account Opening No.'}><a class="f6 link dim ph3 pv2 mb2 dib white bg-dark-green" href={`https://wa.me/91${item.lead_whatsapp_no}`}>Send</a></td>
                        </tr>
                    )
                })}
                </tbody>
                
            </table>
        </div>
    );
}

export default AdminSendIdTable;