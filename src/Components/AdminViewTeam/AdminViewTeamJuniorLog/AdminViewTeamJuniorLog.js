import React from 'react';
import './AdminViewTeamJuniorLog.scss';
import * as AiIcons from "react-icons/ai";
import * as IoIcons from 'react-icons/io';

// redux
import {connect} from "react-redux";
import {setJuniorLogView} from "../../../redux/admin-panel/admin-overview/admin.overview.actions";

// reselect
import {createStructuredSelector} from "reselect";
import {selectJuniorLogView, selectJuniorLogArray} from "../../../redux/admin-panel/admin-overview/admin.overview.selectors";

const header = [
    'Sr No',
    'Lead ID',
    'Lead Name',
    'Status 1',
    'Status 2',
    'Handover Update'
]

const AdminViewTeamJuniorLog = ({juniorLogView, junior_log_array, setJuniorLogView}) => {
    return (

        <div className={`${juniorLogView ? 'admin-view-junior-log-container' : 'hidden'} pb4`}>
            <div className={'tintLog'}>
            </div>
            <div className={'flex justify-between items-end w-100 pointer-divLog'}>
                <IoIcons.IoMdArrowRoundBack 
                size={'3rem'} 
                color={'white'}
                className="pointer ma3 ba br3" 
                onClick={() => {
                    setJuniorLogView({visible: false, array: []})
                }}
                />
                <h3 className={''}></h3>
            </div>
            <div className={'log-container-responsive'} >
                <table cellSpacing="1" className={'admin-view-junior-log-box'}>
                    <thead className={'admin-view-junior-log-head-container'}>
                    <tr>
                        {header.map((item, index) => {
                            return (
                                <th className={'admin-view-junior-log-header-container'}>{item}</th>
                            );
                        })}
                    </tr>
                    </thead>
                    <tbody className={'admin-view-junior-log-body-container'}>
                    {junior_log_array.map((item, index) => {
                        return (
                            <tr className="admin-view-junior-log-row-container">
                                <td className={'admin-view-junior-log-data-container'}
                                    data-label={'Sr.No'}>{index + 1}
                                </td>
                                <td className={'admin-view-junior-log-data-container'}
                                    data-label={'Lead Id'}>{item.lead_id}
                                </td>
                                <td className={'admin-view-junior-log-data-container'}
                                    data-label={'Lead Name'}>{item.lead_name}
                                </td>
                                <td className={'admin-view-junior-log-data-container'}
                                    data-label={'Status 1'}>{item.status_1}
                                </td>
                                <td className={'admin-view-junior-log-data-container'}
                                    data-label={'Status 2'}>{item.status_2}
                                </td>
                                <td className={'admin-view-junior-log-data-container'}
                                    data-label={'Handover'}>{item.handover_status}
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
    juniorLogView: selectJuniorLogView,
    junior_log_array: selectJuniorLogArray
});

const mapDispatchToProps = dispatch => ({
    setJuniorLogView: visible => dispatch(setJuniorLogView(visible))
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminViewTeamJuniorLog);