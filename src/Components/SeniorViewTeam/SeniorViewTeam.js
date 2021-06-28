import React, {useEffect, useState} from 'react';

// redux
import {connect} from 'react-redux';
import {
    setTeamArray,
    setJuniorLeadArray,
    setJuniorLeadTableVisibility, setCurrentJuniorCallerId
} from '../../redux/senior-panel/senior-view-team/senior.view.team.actions.js'

//reselect
import {createStructuredSelector} from "reselect";
import {selectSeniorTeamArray} from "../../redux/senior-panel/senior-view-team/senior.view.team.selectors";

// components
import SeniorLogTable from "./SeniorLogTable/SeniorLogTable";

// css
import './SeniorViewTeam.scss';
import {toast} from "react-toastify";
import {selectCurrentUser} from "../../redux/user/user.selectors";

// table header data
const header = ["Sr No.", "Telecaller ID", "Telecaller Name", "Designation"];

const tableLogs = [
    {
        lead_id: 1,
        assigned_to: "xyz",
        lead_name: "abcde",
        lead_contact: 9087389032,
        whatsapp_no: 8903221111,
        account_opening_no: 123,
        city: "pune",
        trading_knowledge: "no",
        preferred_language: "hindi",
        status_1: "complete",
        status_2: "uncomplete",
        handover_status: "complete",
        coded: "---"
    },
    {
        lead_id: 2,
        assigned_to: "mmmmm",
        lead_name: "oooooo",
        lead_contact: 9000001222,
        whatsapp_no: 9090912121,
        account_opening_no: 8011,
        city: "pune",
        trading_knowledge: "no",
        preferred_language: "marathi",
        status_1: "complete",
        status_2: "uncomplete",
        handover_status: "complete",
        coded: "---"
    }
]

const SeniorViewTeam = ({currentUser,setTeamArray, setJuniorLeadArray, team_array, setJuniorLeadTableVisibility,setCurrentJuniorCallerId}) => {

    const [pgCount, setPgCount] = useState(0);

    useEffect(() => {
        const { telecaller_id }  = currentUser;
        fetch('https://aqueous-mesa-28052.herokuapp.com/senior/fetch_assigned_to_junior_caller', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                telecaller_id: telecaller_id
            })
        })
            .then(response => response.json())
            .then(resp => {
                console.log(resp);
                setTeamArray(resp);
            })
            .catch(err => {
                console.log(err);
                toast.error("Error Loading Table", {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 4000,
                });
            })
    }, [])

    const fetchJuniorLogsData = (telecaller_id,pgNo) => {
        setCurrentJuniorCallerId(telecaller_id);
        fetch('https://aqueous-mesa-28052.herokuapp.com/senior/fetch_junior_logs_pg_count',{
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                 telecaller_id: telecaller_id
            })
        })
            .then(resp => resp.json())
            .then( response => {
                console.log(response);
                setPgCount(response.count);
            })
            .catch(err => {
                console.log(err);
            })
        fetch('https://aqueous-mesa-28052.herokuapp.com/senior/fetch_junior_logs', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                telecaller_id: telecaller_id,
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
    return (<div>
        <div className={'team-table-container'}>
            <h1>My Team</h1>
            <table cellspacing="1" className={'team-table-box'}>
                <thead className={'team-table-head-container'}>
                <tr>
                    {header.map((item, index) => {
                        return (
                            <th className={'team-table-header-container'}>{item}</th>
                        );
                    })}
                </tr>
                </thead>
                <tbody className={'team-table-body-container'}>
                {team_array.map((item, index) => {
                    return (
                        <tr className={'team-table-row-container'}>
                            <td className={'team-table-data-container'} data-label={'Sr No.'}>{index + 1}</td>
                            <td className={'team-table-data-container'}
                                data-label={'Telecaller ID'}>{item.telecaller_id}</td>
                            <td className={'team-table-data-container'}
                                data-label={'Telecaller Name'}>{item.telecaller_name}</td>
                            <td className={'team-table-data-container'}
                                data-label={'Designation'}>{item.designation}</td>
                            <td className={'team-table-data-container'}>
                                <button onClick={() => {
                                    fetchJuniorLogsData(item.telecaller_id,0);
                                    setJuniorLeadTableVisibility(true)
                                }}>View Logs
                                </button>
                            </td>
                        </tr>
                    )
                })}
                    </tbody>
                    </table>
                    </div>
                    <div className={'mt4 mb4'}>
                        <SeniorLogTable pgCount={pgCount} setPgCount={setPgCount} />
                    </div>
                    </div>);
                }

const mapStateToProps = createStructuredSelector(
{
    team_array: selectSeniorTeamArray,
    currentUser: selectCurrentUser
}
);

const mapDispatchToProps = dispatch => ({
        setTeamArray: array => dispatch(setTeamArray(array)),
        setJuniorLeadArray: array => dispatch(setJuniorLeadArray(array)),
        setJuniorLeadTableVisibility: visible => dispatch(setJuniorLeadTableVisibility(visible)),
        setCurrentJuniorCallerId: id => dispatch(setCurrentJuniorCallerId(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(SeniorViewTeam);