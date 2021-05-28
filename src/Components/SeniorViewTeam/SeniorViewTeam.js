import React,{useEffect} from 'react';

// redux
import { connect } from 'react-redux';
import {setTeamArray, setJuniorLeadArray} from '../../redux/senior-panel/senior-view-team/senior.view.team.actions.js'

//reselect
import {createStructuredSelector} from "reselect";
import {selectSeniorTeamArray} from "../../redux/senior-panel/senior-view-team/senior.view.team.selectors";

// components
import SeniorLogTable from "./SeniorLogTable/SeniorLogTable";

// css
import './SeniorViewTeam.scss';

// table header data
const header = ["Sr No.", "Telecaller ID", "Telecaller Name"];

const tableData = [
    {
        telecaller_id: "Jr001",
        telecaller_name: "xyz"
    },
    {
        telecaller_id: "Jr002",
        telecaller_name: "abc"
    },
    {
        telecaller_id: "Jr003",
        telecaller_name: "lmn"
    }
]

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
        coded: "---",
        payment: "done"
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
        coded: "---",
        payment: "no"
    }
]

const SeniorViewTeam = ({setTeamArray, setJuniorLeadArray, team_array}) => {

    useEffect(() => {
       setTeamArray(tableData);
    }, [])

    return (<div>
        <div className={'team-table-container'}>
        <h1>My Team</h1>
        <table cellspacing="1" className={'team-table-box'} >
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
                        <td className={'team-table-data-container'} data-label={'Telecaller ID'}>{item.telecaller_id}</td>
                        <td className={'team-table-data-container'} data-label={'Telecaller Name'}>{item.telecaller_name}</td>
                        <td className={'team-table-data-container'}><button onClick={() => setJuniorLeadArray(tableLogs)}>View Logs</button></td>
                    </tr>
                )
            })}
            </tbody>
        </table>
    </div>
        <div className={'mt4 mb4'}>
            <SeniorLogTable />
        </div>
    </div>);
}

const mapStateToProps = createStructuredSelector({
    team_array: selectSeniorTeamArray
});

const mapDispatchToProps = dispatch => ({
    setTeamArray: array => dispatch(setTeamArray(array)),
    setJuniorLeadArray: array => dispatch(setJuniorLeadArray(array))
});

export default connect(mapStateToProps, mapDispatchToProps)(SeniorViewTeam);