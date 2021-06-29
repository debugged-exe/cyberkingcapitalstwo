import React, {useEffect, useState} from 'react';
import './AdminViewTeamJuniorLog.scss';
import * as AiIcons from "react-icons/ai";
import * as IoIcons from 'react-icons/io';

// redux
import {connect} from "react-redux";
import {
    setJuniorId,
    setJuniorLogArray,
    setJuniorLogView,
    setPgCount
} from "../../../redux/admin-panel/admin-overview/admin.overview.actions";

// reselect
import {createStructuredSelector} from "reselect";
import {
    selectJuniorLogView,
    selectJuniorLogArray,
    selectPgCount, selectJuniorId
} from "../../../redux/admin-panel/admin-overview/admin.overview.selectors";
import {toast} from "react-toastify";

const header = [
    'Sr No',
    'Lead ID',
    'Lead Name',
    'Status 1',
    'Status 2',
    'Handover Update'
]

const AdminViewTeamJuniorLog = ({setJuniorId,junior_id,pg_count,setJuniorLogArray,setPgCount,juniorLogView, junior_log_array, setJuniorLogView}) => {
    const [pages, setPages] = useState(0);
    const [pageNumbers, setPageNumbers] = useState([]);
    const perPage = 10;

    useEffect(() => {
        fetch('')
        setPages(pg_count);
        var arr = [];
        for (let i = 1; i <= Math.ceil( pg_count/perPage); i++) {
        arr.push(i);
        }
    setPageNumbers(arr);
    },[pg_count])

    const fetchJuniorLogsNewPage = (pgNo) => {
        fetch('https://aqueous-mesa-28052.herokuapp.com/admin/senior/junior/logs',{
            method: 'post',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                telecaller_id: junior_id,
                pgNo: pgNo
            })
        })
            .then(resp => resp.json())
            .then( resp => {
                setJuniorLogArray(resp);
            })
            .catch( err => {
                console.log(err);
                toast.error('log error. try again',{
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 2500
                });
            })
    }

    return (
        <div className={`${juniorLogView ? 'admin-view-junior-log-container' : 'hidden'} pb4`}>
            <div className={'tintLog'}>
            </div>
            <div className={'flex justify-between items-end w-100 pointer-divLog'}>
                <div className="pointer-back-button ma3 ba br3 white">
                    <IoIcons.IoMdArrowRoundBack
                        size={'3rem'}
                        color={''}
                        onClick={() => {
                            setJuniorLogView({visible: false, array: []});
                            setPgCount(0);
                            setJuniorId('');
                        }}
                    />
                </div>

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
                                    data-label={'Status 1'}>{`${item.status_1?item.status_1:"NULL"}`}
                                </td>
                                <td className={'admin-view-junior-log-data-container'}
                                    data-label={'Status 2'}>{`${item.status_2?item.status_2:"NULL"}`}
                                </td>
                                <td className={'admin-view-junior-log-data-container'}
                                    data-label={'Handover'}>{`${item.handover_status?item.handover_status:"NULL"}`}
                                </td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            </div>
            <div className="admin-view-junior-log-pagination-container w-100 pb4">
                <p>. . </p>
                {pageNumbers.map((number, index) => (
                    <button key={index} onClick={() => fetchJuniorLogsNewPage(number-1)} className="admin-view-junior-log-page-btn">{number}</button>
                ))}
                <p>. . </p>
            </div>
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    juniorLogView: selectJuniorLogView,
    junior_log_array: selectJuniorLogArray,
    pg_count: selectPgCount,
    junior_id: selectJuniorId
});

const mapDispatchToProps = dispatch => ({
    setJuniorLogView: visible => dispatch(setJuniorLogView(visible)),
    setPgCount: number => dispatch(setPgCount(number)),
    setJuniorLogArray: array => dispatch(setJuniorLogArray(array)),
    setJuniorId: id => dispatch(setJuniorId(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminViewTeamJuniorLog);