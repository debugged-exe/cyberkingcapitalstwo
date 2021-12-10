import React, {useState} from 'react';

// redux
import {connect} from 'react-redux';

// reselect
import {createStructuredSelector} from 'reselect';
import {
    selectAdminSeniorTelecallerArray,
    selectAdminOverviewFilter,
    selectAdminJrView
} from '../../../redux/admin-panel/admin-overview/admin.overview.selectors.js';

// css
import './AdminViewTeamSeniorTable.scss';
import {
    setAssignedJuniorArray,
    setJrView,
    setJuniorLogArray
} from "../../../redux/admin-panel/admin-overview/admin.overview.actions";
import {toast, ToastContainer} from "react-toastify";

const header = [
    'Sr No',
    'Sr Caller ID',
    'Sr Caller Name',
    'Language',
    'Handover Counts'
]

const AdminViewTeamSeniorTable = ({setJrView, senior_telecaller_array, setAssignedJuniorArray,overview_filter}) => {
    const assignJuniorLogArray = (telecaller_id) => {
        fetch('https://aqueous-mesa-28052.herokuapp.com/admin/senior/junior',{
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                telecaller_id: telecaller_id
            })
        })
            .then(resp => resp.json())
            .then(resp => {
                setAssignedJuniorArray(resp);
            })
            .catch( err => {
                console.log(err);
                toast.warn('Error. Try Again',{
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 1500
                });
            })
    }

    const fetchSeniorHandoverCounts = (telecaller_id) => {
        fetch('https://aqueous-mesa-28052.herokuapp.com/admin/fetch_senior_handover_counts',{
            method: 'post',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                telecaller_id: telecaller_id
            })
        })
            .then( resp => resp.json())
            .then( resp => {
                toast.info(`${telecaller_id} Handover leads: ${resp[0].count} `,{
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 1500
                })
            })
            .catch( err => {
                toast.warn('count not fetched. try again',{
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 1500
                })
            })
    }

    return (
        <div className="admin-view-senior-table-container">
            <table cellSpacing="1" className={'admin-view-senior-table-box'}>
                <thead className={'admin-view-senior-table-head-container'}>
                <tr>
                    {header.map((item, index) => {
                        return (
                            <th className={'admin-view-senior-table-header-container'}>{item}</th>
                        );
                    })}
                </tr>
                </thead>
                <tbody className={'admin-view-senior-table-body-container'}>
                {senior_telecaller_array.filter((item) => {
                    if (overview_filter === item.preferred_language) {
                        return item
                    }
                }).map((item, index) => {
                    return (
                        <tr className="admin-view-senior-table-row-container">
                            <td className={'admin-view-senior-table-data-container'}
                                data-label={'Sr.No'}>{index + 1}</td>
                            <td className={'admin-view-senior-table-data-container'}
                                data-label={'Sr Caller Id'}>{item.telecaller_id}</td>
                            <td className={'admin-view-senior-table-data-container'}
                                data-label={'Sr Caller Name'}>{item.telecaller_name}</td>
                            <td className={'admin-view-senior-table-data-container'}
                                data-label={'Sr Caller Name'}>{item.preferred_language}</td>
                            <td className={'admin-view-senior-table-data-container'}
                                data-label={'Handover'}>
                                <button onClick={() => {
                                    fetchSeniorHandoverCounts(item.telecaller_id);
                                }}>View Counts
                                </button>
                            </td>
                            <td className={'admin-view-senior-table-data-container'}>
                                <button onClick={() =>{ setJrView({
                                    visible: true,
                                    senior_telecaller_id: item.telecaller_id
                                });
                                    assignJuniorLogArray(item.telecaller_id);
                                }}>View Team
                                </button>
                            </td>
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
    senior_telecaller_array: selectAdminSeniorTelecallerArray,
    overview_filter: selectAdminOverviewFilter,
});

const mapDispatchToProps = dispatch => ({
    setJrView: visible => dispatch(setJrView(visible)),
    setAssignedJuniorArray: array => dispatch(setAssignedJuniorArray(array))
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminViewTeamSeniorTable);