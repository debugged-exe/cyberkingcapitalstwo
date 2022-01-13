import React, {useEffect} from 'react';
import './AdminViewTeamJuniorCount.scss';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as AiIcons from "react-icons/ai";
import * as IoIcons from 'react-icons/io';

// redux
import {connect} from "react-redux";
import {
    setJrCountArray,
    setJuniorCountView,

    setJuniorId,
    setJuniorLogArray,
    setJuniorLogView,
    setPgCount,
    setUpdateModalLead
} from "../../../redux/admin-panel/admin-overview/admin.overview.actions";

// reselect
import {createStructuredSelector} from "reselect";
import {
    selectJuniorLogView,
    selectJuniorLogArray,
    selectJuniorCountView, selectJrCountArray,
    selectJuniorId
} from "../../../redux/admin-panel/admin-overview/admin.overview.selectors";

toast.configure();

const header = [
    'Status 1',
    'Status 2',
    'Unattended',
    'Coded',
    'Handed Over leads',
    'Pending',
    'Request Cancelled',
    'Referral Pending Request',
    'Referral Rejected'
]

const LogStatArray = [
    {
        status_1: 0,
        status_2: 0,
        unattended: 0,
        coded: 0,
        handover: 0,
        pending: 0,
        request_cancelled: 0,
        referral_pending:0,
        referral_rejected: 0,

    }
]

const AdminViewTeamJuniorCount = ({setJuniorId,junior_id,jr_count_array, setJrCountArray,jrCount, setJuniorCountView, junior_log_array,setJuniorLogArray,setPgCount,pg_count}) => {



    const fetchCountLogs =(count_number) => {


        let countType=count_number;
      {/*  fetch('https://aqueous-mesa-28052.herokuapp.com/admin/senior/junior/pg',{
            method: 'post',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                telecaller_id: junior_id,
            })
        })
            .then( resp => resp.json())
            .then( resp => {
                setPgCount(resp.count);
            })
            .catch( err => {
                console.log(err);
            })*/}

        if (countType === 'status1updated' || countType === 'status2updated') {
            fetch('https://aqueous-mesa-28052.herokuapp.com/junior/logs_by_count', {
                    method: 'post',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                         telecaller_id: junior_id,
                        pgNo: 0,
                        count_type: countType
                    })
                })
                    .then(response => response.json())
                    .then(resp => {
                        setPgCount((resp.length)/10);
                        setJuniorCountView(false);
                        setJuniorLogArray(resp)
                        window.scrollBy(0, 760);
                    })
                    .catch(err => {
                        console.log(err);

                        toast.warn("Error Loading Table", {
                            position: toast.POSITION.TOP_CENTER,
                            autoClose: 1500,
                        });
                    })
        }
        else{
            fetch('https://aqueous-mesa-28052.herokuapp.com/junior/logs_by_count', {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                     telecaller_id: junior_id,
                    pgNo: 0,
                    count_type: countType
                })
            })
                .then(response => response.json())
                .then(resp => {
                    setPgCount((resp.length)/10);
                    setJuniorCountView(false);
                    setJuniorLogArray(resp);
                    window.scrollBy(0, 760);
                })
                .catch(err => {
                    console.log(err);

                    toast.warn("Error Loading Table", {
                        position: toast.POSITION.TOP_CENTER,
                        autoClose: 1500,
                    });
                })
        }

    }


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
                            setJuniorId('');
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
                                <td className={'admin-view-junior-count-view-data-container pointer'}
                                    data-label={'Status 1'} onClick={()=>fetchCountLogs('status1updated')}>{item.status_1}
                                </td>
                                <td className={'admin-view-junior-count-view-data-container pointer'}
                                    data-label={'Status 2'} onClick={()=>fetchCountLogs('status2updated')} > {item.status_2}
                                </td>
                                <td className={'admin-view-junior-count-view-data-container pointer'}
                                    data-label={'Unattended'} onClick={()=>fetchCountLogs('unattended')} >{item.unattended}
                                </td>
                                <td className={'admin-view-junior-count-view-data-container pointer'}
                                    data-label={'Coded'} onClick={()=>fetchCountLogs('coded')}>{item.coded}
                                </td>
                                <td className={'admin-view-junior-count-view-data-container pointer'}
                                    data-label={'Handover Status'} onClick={()=>fetchCountLogs('handedoverleads')}>{item.handover}
                                </td>
                                <td className={'admin-view-junior-count-view-data-container pointer'}
                                    data-label={'Pending Requests'} onClick={()=>fetchCountLogs('pendingrequests')}>{item.pending}
                                </td>
                                <td className={'admin-view-junior-count-view-data-container pointer'}
                                    data-label={'Request Cancelled'} onClick={()=>fetchCountLogs('requestcancelled')} > {item.request_cancelled}
                                </td>
                                <td className={'admin-view-junior-count-view-data-container pointer'}
                                    data-label={'Referral Pending Request'} onClick={()=>fetchCountLogs('referralpendingrequests')}>{item.referral_pending}
                                </td>
                                <td className={'admin-view-junior-count-view-data-container pointer'}
                                    data-label={'Referral Rejected'} onClick={()=>fetchCountLogs('referralcoded')}>{item.referral_rejected}
                                </td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            </div>
            <ToastContainer />
        </div>
    );
}

const mapStateToProps = createStructuredSelector({
    jrCount: selectJuniorCountView,
    junior_id: selectJuniorId,
    junior_log_array: selectJuniorLogArray,
    jr_count_array: selectJrCountArray
});

const mapDispatchToProps = dispatch => ({
    setJuniorCountView: visible => dispatch(setJuniorCountView(visible)),
    setJrCountArray: array => dispatch(setJrCountArray(array)),
    setJuniorId: id => dispatch(setJuniorId(id)),
    setPgCount: number => dispatch(setPgCount(number)),
    setJuniorLogArray: array => dispatch(setJuniorLogArray(array))

});

export default connect(mapStateToProps, mapDispatchToProps)(AdminViewTeamJuniorCount);
