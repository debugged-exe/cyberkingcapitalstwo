import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer, toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
// components
// css
import './AdminSendIdTable.scss';
toast.configure();

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

const AdminSendIdTable = ({data, setData,language}) => {

    const removeFunction = (lead_id) => {
        fetch('https://aqueous-mesa-28052.herokuapp.com/admin/update_removed',{
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                lead_id: lead_id
            })
        })
            .then( resp => resp.json())
            .then(
                resp=>{
                   toast.success("Remove Successful", {
                       position: toast.POSITION.TOP_CENTER,
                       autoClose: 2500
                   });
                }
            )
            .catch(err=>console.log(err));

        fetch('https://aqueous-mesa-28052.herokuapp.com/admin/fetch_processed_removed',{
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                pgNo: 0,
                preferred_language: language
            })
        })
            .then( resp => resp.json())
            .then(
                resp=>{
                    setData(resp);
                }
            )
            .catch(err=>console.log(err));
    }
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
                {
                    data.map((item, index) => {
                    return (
                        <tr key={index} className="admin-sendid-row-container">
                            <td className={'admin-sendid-data-container'} data-label={'Sr.No'}>{index+1}</td>
                            <td className={'admin-sendid-data-container'} data-label={'Lead Id'}>{item.lead_id}</td>
                            <td className={'admin-sendid-data-container'} data-label={'Lead Name'}>{item.lead_name}</td>
                            <td className={'admin-sendid-data-container'} data-label={'Lead Phone No.'}>{`${item.lead_phone_no?item.lead_phone_no:'NULL'}`}</td>
                            <td className={'admin-sendid-data-container'} data-label={'Lead Whatsapp No.'}>{`${item.lead_whatsapp_no?item.lead_whatsapp_no:'NULL'}`}</td>
                            <td className={'admin-sendid-data-container'} data-label={'Account Opening No.'}>{`${item.account_opening_no?item.account_opening_no:'NULL'}`}</td>
                            <td className={'admin-sendid-data-container'} data-label={'Account Opening No.'}><button style={{outLine: "none", border:'none'}} class="f6 link dim ph3 pv2 mb2 dib white bg-red" onClick={() => removeFunction(item.lead_id)}>Remove</button></td>
                            <td className={'admin-sendid-data-container'} data-label={'Account Opening No.'}><a class="f6 link dim ph3 pv2 mb2 dib white bg-dark-green" href={`https://wa.me/91${item.lead_whatsapp_no}`} target={'_blank'}>Send</a></td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
            <ToastContainer/>
        </div>
    );
}

export default AdminSendIdTable;