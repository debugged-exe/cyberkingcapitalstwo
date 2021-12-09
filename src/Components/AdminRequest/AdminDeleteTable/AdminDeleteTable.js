import React from 'react';
import {ToastContainer,toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// redux
import { connect } from 'react-redux';
import {reassignDeleteRequestArray} from '../../../redux/admin-panel/admin-request/admin.request.actions.js'

// reselect
import {createStructuredSelector} from 'reselect';
import {selectAdminDeleteRequestArray, selectAdminRequestLanguage} from '../../../redux/admin-panel/admin-request/admin.request.selectors.js';

// components
import * as AiIcons from 'react-icons/ai';
import * as ImIcons from 'react-icons/im';

// css
import './AdminDeleteTable.scss';

const header = [
    "Sr.No",
    "Telecaller Id",
    "Lead Id",
    "Lead Name",
    "Lead Phone No.",
    'Handover Status'
]

toast.configure();

const AdminDeleteTable = ({admin_delete_request_array, admin_request_language,reassignDeleteRequestArray}) => {

    const deleteHandler = (lead_id) => {
        fetch('https://aqueous-mesa-28052.herokuapp.com/admin/delete', {
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
                reassignDeleteRequestArray(lead_id)
                toast.error('Delete Successfully.', {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 2500,
                });
            }
        })
        .catch(err => {
            console.log(err);
            toast.warn('Failed.Please try again.', {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 2500,
            });
        })
    }

    const cancelHandler = (lead_id) => {
        fetch('https://aqueous-mesa-28052.herokuapp.com/admin/cancel_delete', {
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
                reassignDeleteRequestArray(lead_id)
                toast.error('Canceled delete request successfully.', {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 2500,
                });
            }
        })
        .catch(err => {
            console.log(err)
            toast.warn('Failed.Please try again.', {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 2500,
            });
        })
    }

	return (
		<div className={'admin-delete-table-container'}>
            {/*<button className="delete-all">Delete All</button>*/}
            <table cellSpacing="1" className={'admin-delete-table-box'}>
                <thead className={'admin-delete-table-head-container'}>
                <tr>
                    {header.map((item, index) => {
                        return (
                            <th className={'admin-delete-table-header-container'}>{item}</th>
                        );
                    })}
                </tr>
                </thead>
                <tbody className={'admin-delete-table-body-container'}>
                {admin_delete_request_array.filter(item => item.preferred_language===admin_request_language).map((item, index) => {
                    return (
                        <tr key={index} className="admin-delete-table-row-container">
                            <td className={'admin-delete-table-data-container '} data-label={'Sr.No'}>{index+1}</td>
                            <td className={'admin-delete-table-data-container'} data-label={'Telecaller Id'}>{item.telecaller_id}</td>
                            <td className={'admin-delete-table-data-container'} data-label={'Lead Id'}>{item.lead_id}</td>
                            <td className={'admin-delete-table-data-container'} data-label={'Lead Name'}>{item.lead_name}</td>
                            <td className={'admin-delete-table-data-container'} data-label={'Lead Contact'}>{item.lead_phone_no}</td>
                            <td className={'admin-delete-table-data-container'} data-label={'Handover Status'}>{`${item.handover_status?item.handover_status:'NULL'}`}</td>
                            <td className={'admin-delete-table-data-container pointer'}><AiIcons.AiFillCheckCircle className={'btn-center'} size={'2rem'} color={'green'} onClick={() => deleteHandler(item.lead_id)}/></td>
                            <td className={'admin-delete-table-data-container pointer'}><ImIcons.ImCross className={'btn-center'} size={'1.5rem'} color={'red'} onClick={() => cancelHandler(item.lead_id)}/></td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
            <ToastContainer />
        </div>
	)
}

const mapStateToProps = createStructuredSelector({
    admin_delete_request_array: selectAdminDeleteRequestArray,
    admin_request_language: selectAdminRequestLanguage
});

const mapDispatchToProps = dispatch => ({
    reassignDeleteRequestArray: lead_id => dispatch(reassignDeleteRequestArray(lead_id))
})

export default connect(mapStateToProps,mapDispatchToProps)(AdminDeleteTable);
