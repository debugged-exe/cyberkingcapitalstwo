import React from 'react';
import './SeniorPaymentTable.scss';
const header = ["Sr No.", "Telecaller ID", "Telecaller Name", "Points earned"];
const tableData = [
    {
        telecaller_id: "Jr001",
        telecaller_name: "xyz",
        points_earned: 50
    },
    {
        telecaller_id: "Jr002",
        telecaller_name: "abc",
        points_earned: 60
    },
    {
        telecaller_id: "Jr003",
        telecaller_name: "lmn",
        points_earned: 70
    }
]
const SeniorPaymentTable = () => {
    return (<div className={'table-container'}>
        <h1>Payment Records</h1>
        <table cellspacing="1" className={'table-box'} >
            <thead className={'table-head-container'}>
            <tr>
                {header.map((item, index) => {
                    return (
                        <th className={'table-header-container'}>{item}</th>
                    );
                })}
            </tr>
            </thead>
            <tbody className={'table-body-container'}>
            {tableData.map((item, index) => {
                return (
                    <tr className="table-row-container">
                        <td className={'table-data-container'} data-label={'Sr.No'}>{index + 1}</td>
                        <td className={'table-data-container'} data-label={'Telecaller ID'}>{item.telecaller_id}</td>
                        <td className={'table-data-container'} data-label={'Telecaller Name'}>{item.telecaller_name}</td>
                        <td className={'table-data-container'} data-label={'Points Earned'}>{item.points_earned}</td>
                    </tr>
                )
            })}
            </tbody>
        </table>
    </div>);
}

export default SeniorPaymentTable;