import React from 'react';

// css
import './AdminViewTeamJuniorTable.scss';

// components
import * as AiIcons from "react-icons/ai";

// redux
import {connect} from "react-redux";
import {
    setAssignedJuniorArray,
    setJrView,
    setJuniorCountView,
    setJuniorLogArray
} from "../../../redux/admin-panel/admin-overview/admin.overview.actions";


// reselect
import {createStructuredSelector} from "reselect";
import {
    selectAdminJrView,
    selectSeniorTelecallerId,
    selectAdminSeniorTelecallerArray,
    selectJuniorLogArray, selectAssignedJuniorArray
} from "../../../redux/admin-panel/admin-overview/admin.overview.selectors";


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

const AdminViewTeamJuniorTable = ({jrView, setJrView,assigned_junior_array,setAssignedJuniorArray, setJuniorLogArray,setJuniorCountView}) => {
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
                                    <button onClick={() => setJuniorLogArray(juniorLog)}>View Logs</button>
                                </td>
                                <td className={'admin-view-junior-table-data-container button-center'}>
                                    <button onClick={() => {setJuniorCountView(true); }}>View Count</button>
                                </td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            </div>

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
    setAssignedJuniorArray: array => dispatch(setAssignedJuniorArray(array))
});

export default connect(mapStateToProps,mapDispatchToProps)(AdminViewTeamJuniorTable);