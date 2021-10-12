import React from 'react';
import {ToastContainer,toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// redux
import { connect } from 'react-redux';
import {} from '../../../redux/admin-panel/admin-request/admin.request.actions.js'

// reselect
import {createStructuredSelector} from 'reselect';
import {selectAdminReferralRequestArray, selectAdminRequestLanguage} from '../../../redux/admin-panel/admin-request/admin.request.selectors.js';
import {selectCurrentUser} from "../../../redux/user/user.selectors";

// components
import * as AiIcons from 'react-icons/ai';
import * as ImIcons from 'react-icons/im';

// css
import './AdminReferralTable.scss';

const header = [
    "Sr.No",
    "Telecaller Id",
    "Lead Id",
    "Account Opening Number",
    "Account Opening Name"
]

toast.configure();

const AdminReferralTable = ({admin_referral_request_array, admin_request_language, currentUser}) => {

    // const cancelCodedRequest = (lead_id) => {
    //     fetch('https://aqueous-mesa-28052.herokuapp.com/admin/cancel_coded', {
    //         method: 'post',
    //         headers: {'Content-Type': 'application/json'},
    //         body: JSON.stringify({
    //             lead_id: lead_id
    //         })
    //     })
    //     .then(response => response.json())
    //     .then(resp => {
    //         if(resp==='Success')
    //         {
    //             reassignCodedRequestArray(lead_id)
    //             toast.success('Coded request cancelled successfully.', {
    //                 position: toast.POSITION.TOP_CENTER,
    //                 autoClose: 2500,
    //             });
    //         }
    //     })
    //     .catch(err => {
    //         console.log(err);
    //         toast.error('Failed.Please try again.', {
    //             position: toast.POSITION.TOP_CENTER,
    //             autoClose: 2500,
    //         });
    //     })
    // }

    // const codedLead = (lead_id,lead_phone_no,telecaller_id) => {
    //     fetch('https://aqueous-mesa-28052.herokuapp.com/admin/code', {
    //         method: 'post',
    //         headers: {'Content-Type': 'application/json'},
    //         body: JSON.stringify({
    //             lead_id: lead_id,
    //             telecaller_id: telecaller_id,
    //             lead_phone_no: lead_phone_no
    //         })
    //     })
    //     .then(response => response.json())
    //     .then(resp => {
    //         if(resp==='Success')
    //         {
    //             reassignCodedRequestArray(lead_id)
    //             toast.success('Coded request accepted successfully.', {
    //                 position: toast.POSITION.TOP_CENTER,
    //                 autoClose: 2500,
    //             });
    //         }
    //     })
    //     .catch(err => {
    //         console.log(err);
    //         toast.error('Failed.Please try again.', {
    //             position: toast.POSITION.TOP_CENTER,
    //             autoClose: 2500,
    //         });
    //     })
    // }

    return(
        <div className={'admin-referral-table-container'}>
            {/*<button className="accept-all">Accept All</button>*/}
            <table cellSpacing="1" className={'admin-referral-table-box'}>
                <thead className={'admin-referral-table-head-container'}>
                <tr>
                    {header.map((item, index) => {
                        return (
                            <th className={'admin-referral-table-header-container'}>{item}</th>
                        );
                    })}
                </tr>
                </thead>
                <tbody className={'admin-referral-table-body-container'}>
                {admin_referral_request_array.filter(item => item.preferred_language===admin_request_language).map((item, index) => {
                    return (
                        <tr key={index} className="admin-referral-table-row-container">
                            <td className={'admin-referral-table-data-container'} data-label={'Sr.No'}>{index+1}</td>
                            <td className={'admin-referral-table-data-container'} data-label={'Telecaller Id'}>{item.telecaller_id}</td>
                            <td className={'admin-referral-table-data-container'} data-label={'Lead Id'}>{item.lead_id}</td>
                            <td className={'admin-referral-table-data-container'} data-label={'Account Opening Number'}>{`${item.account_opening_no?item.account_opening_no:'NULL'}`}</td>
                            <td className={'admin-referral-table-data-container'} data-label={'Account Opening Name'}>{`${item.account_opening_name?item.account_opening_name:'NULL'}`}</td>
                            <td className={'admin-referral-table-data-container pointer'}><AiIcons.AiFillCheckCircle className={'btn-center'} size={'2rem'} color={'green'} /></td>
                            <td className={'admin-referral-table-data-container pointer'}><ImIcons.ImCross className={'btn-center'} size={'1.5rem'} color={'red'} /></td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
            <ToastContainer/>
        </div>
    );
}

const mapStateToProps = createStructuredSelector({
    admin_referral_request_array: selectAdminReferralRequestArray,
    admin_request_language: selectAdminRequestLanguage,
    currentUser: selectCurrentUser
})


export default connect(mapStateToProps)(AdminReferralTable);