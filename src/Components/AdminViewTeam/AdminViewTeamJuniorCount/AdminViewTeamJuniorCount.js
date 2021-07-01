import React, {useEffect} from 'react';
import './AdminViewTeamJuniorCount.scss';
import * as AiIcons from "react-icons/ai";
import * as IoIcons from 'react-icons/io';

// redux
import {connect} from "react-redux";
import {
    setJrCountArray,
    setJuniorCountView,
    setJuniorLogView
} from "../../../redux/admin-panel/admin-overview/admin.overview.actions";

// reselect
import {createStructuredSelector} from "reselect";
import {
    selectJuniorLogView,
    selectJuniorLogArray,
    selectJuniorCountView, selectJrCountArray
} from "../../../redux/admin-panel/admin-overview/admin.overview.selectors";

const header = [
    'Status 1',
    'Status 2',
    'Unattended',
    'Coded',
    'Handed Over leads',
    'Pending'
]

const LogStatArray = [
    {
        status_1: 0,
        status_2: 0,
        unattended: 0,
        coded: 0,
        handover: 0,
        pending: 0
    }
]

const AdminViewTeamJuniorCount = ({jr_count_array,setJrCountArray,jrCount, setJuniorCountView}) => {
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
                            setJrCountArray([]);
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
                    {jr_count_array.map((item, index) => {
                        return (
                            <tr className="admin-view-junior-count-view-row-container">
                                {/*<td className={'admin-view-junior-count-view-data-container'}*/}
                                {/*    data-label={'Handover Status'}>{item.handed_over_leads}*/}
                                {/*</td>*/}
                                <td className={'admin-view-junior-count-view-data-container'}
                                    data-label={'Status 1'}>{item.status_1}
                                </td>
                                <td className={'admin-view-junior-count-view-data-container'}
                                    data-label={'Status 2'}>{item.status_2}
                                </td>
                                <td className={'admin-view-junior-count-view-data-container'}
                                    data-label={'Unattended'}>{item.unattended}
                                </td>
                                <td className={'admin-view-junior-count-view-data-container'}
                                    data-label={'Coded'}>{item.coded}
                                </td>
                                {/*<td className={'admin-view-junior-count-view-data-container'}*/}
                                {/*    data-label={'Pending'}>{item.pending}*/}
                                {/*</td>*/}
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
    jrCount: selectJuniorCountView,
    jr_count_array: selectJrCountArray
});

const mapDispatchToProps = dispatch => ({
    setJuniorCountView: visible => dispatch(setJuniorCountView(visible)),
    setJrCountArray: array => dispatch(setJrCountArray(array))
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminViewTeamJuniorCount);