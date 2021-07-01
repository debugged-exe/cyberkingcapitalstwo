import React from 'react';
import {toast, ToastContainer} from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
// css
import './AdminViewTeamJuniorTable.scss';

// components
import * as AiIcons from "react-icons/ai";

// redux
import {connect} from "react-redux";
import {
    setAssignedJuniorArray, setJrCountArray,
    setJrView,
    setJuniorCountView,
    setJuniorLogArray, setJuniorLogView, setPgCount,setJuniorId
} from "../../../redux/admin-panel/admin-overview/admin.overview.actions";


// reselect
import {createStructuredSelector} from "reselect";
import {
    selectAdminJrView,
    selectSeniorTelecallerId,
    selectAdminSeniorTelecallerArray,
    selectJuniorLogArray, selectAssignedJuniorArray
} from "../../../redux/admin-panel/admin-overview/admin.overview.selectors";

toast.configure();
const header = [
    'Sr No',
    'Jr Caller ID',
    'Jr Caller Name',
    'Language'
]

const juniorLog = [
    {
        lead_id: '01',
        lead_name: 'Nanami',
        status_1: 'bahbah bahh',
        status_2: 'ryouiki tenkhai',
        handover_status: 'koros'
    },
    {
        lead_id: '02',
        lead_name: 'Deku',
        status_1: 'oi oi oi',
        status_2: 'gambare gambare',
        handover_status: 'voiiiliin naa..'
    }
]

const AdminViewTeamJuniorTable = ({setJuniorId,setPgCount,jrView, setJrCountArray,setJrView,assigned_junior_array,setAssignedJuniorArray, setJuniorLogArray,setJuniorCountView}) => {
    const fetchJuniorLogs =(telecaller_id, pgNo) => {
        setJuniorId(telecaller_id);
        fetch('https://aqueous-mesa-28052.herokuapp.com/admin/senior/junior/pg',{
            method: 'post',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                telecaller_id: telecaller_id,
            })
        })
            .then( resp => resp.json())
            .then( resp => {
                setPgCount(resp.count);
            })
            .catch( err => {
                console.log(err);
            })
        fetch('https://aqueous-mesa-28052.herokuapp.com/admin/senior/junior/logs',{
            method: 'post',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                telecaller_id: telecaller_id,
                pgNo: pgNo
            })
        })
            .then(resp => resp.json())
            .then( resp => {
                setJuniorLogArray(resp);
            })
            .catch( err => {
                setJuniorLogArray([]);
                console.log(err);
                toast.error('log error. try again',{
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 2500
                });
            })
    }
    const fetchJrCounts = (telecaller_id) => {
        fetch('https://aqueous-mesa-28052.herokuapp.com/admin/senior/junior/counts',{
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                telecaller_id: telecaller_id
            })
        })
            .then(resp => resp.json())
            .then( resp => {
                setJrCountArray(resp);
            })
            .catch( err => {
                console.log(err);
                toast.error('Error count. try again', {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 2500
                })
            })
    }

    return (
        <div className={`${jrView ? 'admin-view-junior-table-container' : 'hidden'} pb4`}>
            <div className={'tint'}>
            </div>
            <div className={'flex justify-between items-end w-100 pointer-div'}>
                <h3 className={''}></h3>
                <div className="pointer-hover ma3 ba br3">
                    <AiIcons.AiOutlineClose
                        size={'3rem'}
                        color={''}
                        className={'close-button'}
                        onClick={() => {
                            setJrView({visible: false, senior_telecaller_id: ''});
                            setAssignedJuniorArray([])
                        }}
                    />
                </div>

            </div>
            <div className={'table-container-responsive'} >
                <table cellSpacing="1" className={'admin-view-junior-table-box'}>
                    <thead className={'admin-view-junior-table-head-container'}>
                    <tr>
                        {header.map((item, index) => {
                            return (
                                <th className={'admin-view-junior-table-header-container'}>{item}</th>
                            );
                        })}
                    </tr>
                    </thead>
                    <tbody className={'admin-view-junior-table-body-container'}>
                    {assigned_junior_array.map((item, index) => {
                        return (
                            <tr className="admin-view-junior-table-row-container">
                                <td className={'admin-view-junior-table-data-container'}
                                    data-label={'Sr.No'}>{index + 1}</td>
                                <td className={'admin-view-junior-table-data-container'}
                                    data-label={'Jr Caller Id'}>{item.telecaller_id}</td>
                                <td className={'admin-view-junior-table-data-container'}
                                    data-label={'Jr Caller Name'}>{item.telecaller_name}</td>
                                <td className={'admin-view-junior-table-data-container button-center'}>
                                    <button onClick={() => {fetchJuniorLogs(item.telecaller_id,0)}}>View Logs</button>
                                </td>
                                <td className={'admin-view-junior-table-data-container button-center'}>
                                    <button onClick={() => {setJuniorCountView(true); fetchJrCounts(item.telecaller_id) }}>View Count</button>
                                </td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            </div>
            <ToastContainer />
        </div>
    )
}
const mapStateToProps = createStructuredSelector({
    jrView: selectAdminJrView,
    senior_telecaller_id: selectSeniorTelecallerId,
    junior_log_array: selectJuniorLogArray,
    assigned_junior_array: selectAssignedJuniorArray
});

const mapDispatchToProps = dispatch => ({
    setJrView :visible => dispatch(setJrView(visible)),
    setJuniorLogArray: array => dispatch(setJuniorLogArray(array)),
    setJuniorCountView : visible => dispatch(setJuniorCountView(visible)),
    setAssignedJuniorArray: array => dispatch(setAssignedJuniorArray(array)),
    setJrCountArray: array => dispatch(setJrCountArray(array)),
    setPgCount: number => dispatch(setPgCount(number)),
    setJuniorId: id => dispatch(setJuniorId(id))
});

export default connect(mapStateToProps,mapDispatchToProps)(AdminViewTeamJuniorTable);