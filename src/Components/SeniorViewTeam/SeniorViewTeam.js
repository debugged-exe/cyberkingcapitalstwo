import React from 'react';
import './SeniorViewTeam.scss';
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
const SeniorViewTeam = () => {
    return (<div className={'team-table-container'}>
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
            {tableData.map((item, index) => {
                return (
                    <tr>
                        <td className={'team-table-data-container'}>{index + 1}</td>
                        <td className={'team-table-data-container'}>{item.telecaller_id}</td>
                        <td className={'team-table-data-container'}>{item.telecaller_name}</td>
                        <td className={'team-table-data-container'}><button>View Logs</button></td>
                    </tr>
                )
            })}
            </tbody>
        </table>
    </div>);
}

export default SeniorViewTeam;