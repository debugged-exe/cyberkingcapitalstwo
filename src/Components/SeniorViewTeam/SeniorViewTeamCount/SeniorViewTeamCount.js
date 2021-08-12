import React from 'react';
import './SeniorViewTeamCount.scss';
import * as IoIcons from 'react-icons/io';

// redux
import {connect} from "react-redux";
import {
    setJuniorCountArray,
    setJuniorCountVisibility
} from "../../../redux/senior-panel/senior-view-team/senior.view.team.actions";

// reselect
import {createStructuredSelector} from "reselect";
import {
    selectJuniorCountArray,
    selectJuniorCountVisibility
} from "../../../redux/senior-panel/senior-view-team/senior.view.team.selectors";
import {ToastContainer} from "react-toastify";

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

const SeniorViewTeamCount = ({junior_count_array, setJuniorCountArray, junior_count_visibility, setJuniorCountVisibility}) => {
    return (
        <div className={`${junior_count_visibility ? 'senior-view-junior-count-view-container' : 'hidden'} pb4`}>
            <div className={'tintCountView'}>
            </div>
            <div className={'flex justify-between items-end w-100 pointer-divCountView'}>
                <div className="pointer-count-back ma3 ba br3">
                    <IoIcons.IoMdArrowRoundBack
                        size={'3rem'}
                        color={''}
                        onClick={() => {
                            setJuniorCountVisibility(false);
                            setJuniorCountArray([]);
                        }}
                    />
                </div>
                <h3 className={''}></h3>
            </div>
            <div className={'count-view-container-responsive'}>
                <table cellSpacing="1" className={'senior-view-junior-count-view-box'}>
                    <thead className={'senior-view-junior-count-view-head-container'}>
                    <tr>
                        {header.map((item, index) => {
                            return (
                                <th className={'senior-view-junior-count-view-header-container'} key={index} >{item}</th>
                            );
                        })}
                    </tr>
                    </thead>
                    <tbody className={'senior-view-junior-count-view-body-container'}>
                    {junior_count_array.map((item, index) => {
                        return (
                            <tr className="senior-view-junior-count-view-row-container" key={index}>
                                <td className={'senior-view-junior-count-view-data-container'}
                                    data-label={'Status 1'} >{item.status_1}
                                </td>
                                <td className={'senior-view-junior-count-view-data-container'}
                                    data-label={'Status 2'}>{item.status_2}
                                </td>
                                <td className={'senior-view-junior-count-view-data-container'}
                                    data-label={'Unattended'}>{item.unattended}
                                </td>
                                <td className={'senior-view-junior-count-view-data-container'}
                                    data-label={'Coded'}>{item.coded}
                                </td>
                                <td className={'senior-view-junior-count-view-data-container'}
                                    data-label={'Handover Status'}>{item.handover}
                                </td>
                                <td className={'senior-view-junior-count-view-data-container'}
                                    data-label={'Pending'}>{item.pending}
                                </td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            </div>
            <ToastContainer/>
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    junior_count_visibility: selectJuniorCountVisibility,
    junior_count_array: selectJuniorCountArray
});

const mapDispatchToProps = dispatch => ({
    setJuniorCountVisibility: visible => dispatch(setJuniorCountVisibility(visible)),
    setJuniorCountArray: array => dispatch(setJuniorCountArray(array))
});

export default connect(mapStateToProps, mapDispatchToProps)(SeniorViewTeamCount);