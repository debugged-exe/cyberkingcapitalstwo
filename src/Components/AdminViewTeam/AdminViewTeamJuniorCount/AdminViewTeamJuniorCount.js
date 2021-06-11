import React from 'react';
import './AdminViewTeamJuniorCount.scss';
import * as AiIcons from "react-icons/ai";
import * as IoIcons from 'react-icons/io';

// redux
import {connect} from "react-redux";
import {setJuniorCountView, setJuniorLogView} from "../../../redux/admin-panel/admin-overview/admin.overview.actions";

// reselect
import {createStructuredSelector} from "reselect";
import {
    selectJuniorLogView,
    selectJuniorLogArray,
    selectJuniorCountView
} from "../../../redux/admin-panel/admin-overview/admin.overview.selectors";

const header = [
    'Handed Over leads',
    'Status 1',
    'Status 2',
    'Unattended',
    'Coded',
    'Pending'
]

const LogStatArray = [
    {
        handed_over_leads: 70,
        status_1_updated: 70,
        status_2_updated: 70,
        unattended: 70,
        coded: 70,
        pending: 70
    }
]

const AdminViewTeamJuniorCount = ({jrCount, setJuniorCountView}) => {
    return (
        <div className={`${jrCount ? 'admin-view-junior-count-view-container' : 'hidden'} pb4`}>
            <div className={'tintCountView'}>
            </div>
            <div className={'flex justify-between items-end w-100 pointer-divCountView'}>
                <div className="pointer-count-back ma3 ba br3">
                    <IoIcons.IoMdArrowRoundBack
                        size={'3rem'}
                        color={''}
                        onClick={() => {
                            setJuniorCountView(false);
                        }}
                    />
                </div>
                <h3 className={''}></h3>
            </div>
            <div className={'count-view-container-responsive'}>
                <table cellSpacing="1" className={'admin-view-junior-count-view-box'}>
                    <thead className={'admin-view-junior-count-view-head-container'}>
                    <tr>
                        {header.map((item, index) => {
                            return (
                                <th className={'admin-view-junior-count-view-header-container'}>{item}</th>
                            );
                        })}
                    </tr>
                    </thead>
                    <tbody className={'admin-view-junior-count-view-body-container'}>
                    {LogStatArray.map((item, index) => {
                        return (
                            <tr className="admin-view-junior-count-view-row-container">
                                <td className={'admin-view-junior-count-view-data-container'}
                                    data-label={'Handover Status'}>{item.handed_over_leads}
                                </td>
                                <td className={'admin-view-junior-count-view-data-container'}
                                    data-label={'Status 1'}>{item.status_1_updated}
                                </td>
                                <td className={'admin-view-junior-count-view-data-container'}
                                    data-label={'Status 2'}>{item.status_2_updated}
                                </td>
                                <td className={'admin-view-junior-count-view-data-container'}
                                    data-label={'Unattended'}>{item.unattended}
                                </td>
                                <td className={'admin-view-junior-count-view-data-container'}
                                    data-label={'Coded'}>{item.coded}
                                </td>
                                <td className={'admin-view-junior-count-view-data-container'}
                                    data-label={'Pending'}>{item.pending}
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
    jrCount: selectJuniorCountView
});

const mapDispatchToProps = dispatch => ({
    setJuniorCountView: visible => dispatch(setJuniorCountView(visible))
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminViewTeamJuniorCount);