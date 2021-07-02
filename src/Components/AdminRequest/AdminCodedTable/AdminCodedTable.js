import React from 'react';
import {ToastContainer,toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// redux
import { connect } from 'react-redux';
import {reassignCodedRequestArray} from '../../../redux/admin-panel/admin-request/admin.request.actions.js'

// reselect
import {createStructuredSelector} from 'reselect';
import {selectAdminCodedRequestArray, selectAdminRequestLanguage} from '../../../redux/admin-panel/admin-request/admin.request.selectors.js';
import {selectCurrentUser} from "../../../redux/user/user.selectors";

// components
import * as AiIcons from 'react-icons/ai';
import * as ImIcons from 'react-icons/im';

// css
import './AdminCodedTable.scss';
import {ToastContainer} from "react-toastify";

const header = [
    "Sr.No",
    "Telecaller Id",
    "Telecaller Name",
    "Lead Id",
    "Lead Name"
]

toast.configure();

const AdminCodedTable = ({admin_coded_request_array, admin_request_language, reassignCodedRequestArray, currentUser}) => {

    const cancelCodedRequest = (lead_id) => {
        fetch('https://aqueous-mesa-28052.herokuapp.com/admin/cancel_coded', {
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
                reassignCodedRequestArray(lead_id)
                toast.success('Coded request cancelled successfully.', {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 2500,
                });
            }
        })
        .catch(err => {
            console.log(err);
            toast.error('Failed.Please try again.', {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 2500,
            });
        })
    }

    const codedLead = (lead_id,lead_phone_no,telecaller_id) => {
        fetch('https://aqueous-mesa-28052.herokuapp.com/admin/code', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                lead_id: lead_id,
                telecaller_id: telecaller_id,
                lead_phone_no: lead_phone_no
            })
        })
        .then(response => response.json())
        .then(resp => {
            if(resp==='Success')
            {
                reassignCodedRequestArray(lead_id)
                toast.success('Coded request cancelled successfully.', {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 2500,
                });
            }
        })
        .catch(err => {
            console.log(err);
            toast.error('Failed.Please try again.', {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 2500,
            });
        })
    }

    return(
        <div className={'admin-coded-table-container'}>
            <button className="accept-all">Accept All</button>
            <table cellSpacing="1" className={'admin-coded-table-box'}>
                <thead className={'admin-coded-table-head-container'}>
                <tr>
                    {header.map((item, index) => {
                        return (
                            <th className={'admin-coded-table-header-container'}>{item}</th>
                        );
                    })}
                </tr>
                </thead>
                <tbody className={'admin-coded-table-body-container'}>
                {admin_coded_request_array.filter(item => item.preferred_language===admin_request_language).map((item, index) => {
                    return (
                        <tr key={index} className="admin-coded-table-row-container">
                            <td className={'admin-coded-table-data-container'} data-label={'Sr.No'}>{index+1}</td>
                            <td className={'admin-coded-table-data-container'} data-label={'Telecaller Id'}>{item.telecaller_id}</td>
                            <td className={'admin-coded-table-data-container'} data-label={'Telecaller Name'}>{item.telecaller_name}</td>
                            <td className={'admin-coded-table-data-container'} data-label={'Lead Id'}>{item.lead_id}</td>
                            <td className={'admin-coded-table-data-container'} data-label={'Lead Name'}>{item.lead_name}</td>
                            <td className={'admin-coded-table-data-container pointer'}><AiIcons.AiFillCheckCircle className={'btn-center'} size={'2rem'} color={'green'} onClick={() => codedLead(item.lead_id, item.lead_phone_no, item.telecaller_id)}/></td>
                            <td className={'admin-coded-table-data-container pointer'}><ImIcons.ImCross className={'btn-center'} size={'1.5rem'} color={'red'} onClick={() => cancelCodedRequest(item.lead_id)}/></td>
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
    admin_coded_request_array: selectAdminCodedRequestArray,
    admin_request_language: selectAdminRequestLanguage,
    currentUser: selectCurrentUser
})

const mapDispatchToProps = dispatch => ({
    reassignCodedRequestArray: lead_id => dispatch(reassignCodedRequestArray(lead_id))
})

export default connect(mapStateToProps,mapDispatchToProps)(AdminCodedTable);