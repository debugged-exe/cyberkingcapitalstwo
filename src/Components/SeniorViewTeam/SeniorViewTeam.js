import React from 'react';
import './SeniorViewTeam.scss';
import SeniorLogTable from "./SeniorLogTable/SeniorLogTable";
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
            {tableData.map((item, index) => {
                return (
                    <tr className={'team-table-row-container'}>
                        <td className={'team-table-data-container'} data-label={'Sr No.'}>{index + 1}</td>
                        <td className={'team-table-data-container'} data-label={'Telecaller ID'}>{item.telecaller_id}</td>
                        <td className={'team-table-data-container'} data-label={'Telecaller Name'}>{item.telecaller_name}</td>
                        <td className={'team-table-data-container'}><button>View Logs</button></td>
                    </tr>
                )
            })}
            </tbody>
        </table>
    </div>
        <div className={'mt4 mb4'}>
            <h1 className={'flex justify-center '}>View Logs Table</h1>
            <SeniorLogTable />
        </div>
    </div>);
}

export default SeniorViewTeam;