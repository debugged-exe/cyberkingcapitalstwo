import React, {useEffect, useState} from 'react';

// redux
import { connect } from 'react-redux';

//reselect
import {createStructuredSelector} from "reselect";
import {
    selectCurrentJuniorCallerId,
    selectSeniorJuniorLeadArray,
    selectSeniorJuniorLeadTableVisibility
} from "../../../redux/senior-panel/senior-view-team/senior.view.team.selectors";

//css
import './SeniorLogTable.scss';
import * as AiIcons from "react-icons/ai";
import {
    setJuniorLeadArray,
    setJuniorLeadTableVisibility,
    setTeamArray
} from "../../../redux/senior-panel/senior-view-team/senior.view.team.actions";
import {toast} from "react-toastify";

//table header data
const header = ["Lead Id", "Assigned to", "Lead Name", "Lead contact", "Whatsapp No.",
    "Account Opening No.", "City", "Trading knowledge", "Preferred Language",
    "status 1", "status 2", "Handover status"];

const SeniorLogTable = ({current_junior_caller_id, pgCount, setPgCount,junior_lead_array, junior_lead_table_visibility,setJuniorLeadTableVisibility, setJuniorLeadArray}) => {
    const [pages, setPages] = useState(0);
    const [pageNumbers, setPageNumbers] = useState([]);
    const perPage = 10;

    useEffect(()=> {
        setPages(pgCount);
        var arr = [];
        for (let i = 1; i <= Math.ceil(pgCount / perPage); i++) {
            arr.push(i);
        }
        setPageNumbers(arr);
    },[pgCount])
    const fetchJuniorLogsNewPage = (pgNo) => {
        fetch('https://aqueous-mesa-28052.herokuapp.com/senior/fetch_junior_logs', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                telecaller_id: current_junior_caller_id,
                pgNo: pgNo
            })
        })
            .then(response => response.json())
            .then(resp => {
                console.log(resp);
                setJuniorLeadArray(resp);
            })
            .catch(err => {
                console.log(err);
                toast.error("Error to check junior logs Table", {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 2500,
                });
            })
    }
    return (<div className={`${junior_lead_table_visibility?'senior-table-container':'hidden'}`}>
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
                        setJuniorLeadTableVisibility(false);
                    }}
                />
            </div>
        </div>
        <div className={'senior-view-table-container-responsive bg-white'} >
        <table cellSpacing="1" className={'senior-table-box bg-white'}>
            <thead className={'senior-table-head-container'}>
            <tr>
                {header.map((item, index) => {
                    return (
                        <th className={'senior-table-header-container'}>{item}</th>
                    );
                })}
            </tr>
            </thead>
            <tbody className={'senior-table-body-container'}>
            {junior_lead_array.map((item, index) => {
                return (
                    <tr className="senior-table-row-container">
                        <td className={'senior-table-data-container'} data-label={'Lead ID'}>{item.lead_id}</td>
                        <td className={'senior-table-data-container'} data-label={'Assigned to'}>{item.assigned_to}</td>
                        <td className={'senior-table-data-container'} data-label={'Lead Name'}>{item.lead_name}</td>
                        <td className={'senior-table-data-container'} data-label={'Lead Contact'}>{item.lead_phone_no}</td>
                        <td className={'senior-table-data-container'} data-label={'Whatsapp Number'}>{`${item.lead_whatsapp_no?item.lead_whatsapp_no:"NULL"}`}</td>
                        <td className={'senior-table-data-container'} data-label={'Account Opening Number'}>{`${item.account_opening_no?item.account_opening_no:"NULL"}`}</td>
                        <td className={'senior-table-data-container'} data-label={'City'}>{item.lead_city}</td>
                        <td className={'senior-table-data-container'} data-label={'Trading Knowledge'}>{item.prior_knowledge}</td>
                        <td className={'senior-table-data-container'} data-label={'Preferred Language'}>{item.preferred_language}</td>
                        <td className={'senior-table-data-container'} data-label={'Status 1'}>{`${item.status_1?item.status_1:"NULL"}`}</td>
                        <td className={'senior-table-data-container'} data-label={'Status 2'}>{`${item.status_2?item.status_2:"NULL"}`}</td>
                        <td className={'senior-table-data-container'} data-label={'Handover Status'}>{`${item.handover_status?item.handover_status:"NULL"}`}</td>
                    </tr>
                )
            })}
            </tbody>
        </table>
        </div>
        <div className="senior-view-log-pagination-container w-100 pb4">
            <p>. . </p>
            {pageNumbers.map((number, index) => (
                <button key={index} onClick={() => fetchJuniorLogsNewPage(number-1)} className="senior-view-log-page-btn">{number}</button>
            ))}
            <p>. . </p>
        </div>
    </div>);
}

const mapStateToProps = createStructuredSelector({
    junior_lead_array: selectSeniorJuniorLeadArray,
    junior_lead_table_visibility: selectSeniorJuniorLeadTableVisibility,
    current_junior_caller_id: selectCurrentJuniorCallerId
});

const mapDispatchToProps = dispatch => ({
        setJuniorLeadTableVisibility: visible => dispatch(setJuniorLeadTableVisibility(visible)),
        setJuniorLeadArray: array => dispatch(setJuniorLeadArray(array))
    }
);

export default connect(mapStateToProps, mapDispatchToProps)(SeniorLogTable);