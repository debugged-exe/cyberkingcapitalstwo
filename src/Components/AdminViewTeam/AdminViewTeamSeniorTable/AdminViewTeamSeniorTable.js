import React from 'react';
import './AdminViewTeamSeniorTable.scss';

const header = [
	'Sr No',
	'Sr Caller ID',
	'Sr Caller Name'
]

const tableLogs = [
	{
		telecaller_id: 'SR001',
		telecaller_name: 'Tejas'
	},
	{
		telecaller_id: 'SR002',
		telecaller_name: 'Soham'
	},
	{
		telecaller_id: 'SR003',
		telecaller_name: 'mahos'
	},
	{
		telecaller_id: 'SR004',
		telecaller_name: 'Sajet'
	}
]

const AdminViewTeamSeniorTable = ({setJrViewField}) => {
	return (
		<div className="admin-view-senior-table-container">
			<table cellSpacing="1" className={'admin-view-senior-table-box'}>
	                <thead className={'admin-view-senior-table-head-container'}>
	                <tr>
	                    {header.map((item, index) => {
	                        return (
	                            <th className={'admin-view-senior-table-header-container'}>{item}</th>
	                        );
	                    })}
	                </tr>
	                </thead>
	                <tbody className={'admin-view-senior-table-body-container'}>
	                {tableLogs.map((item, index) => {
	                    return (
	                        <tr className="admin-view-senior-table-row-container">
	                            <td className={'admin-view-senior-table-data-container'} data-label={'Sr.No'}>{index+1}</td>
	                            <td className={'admin-view-senior-table-data-container'} data-label={'Sr Caller Id'}>{item.telecaller_id}</td>
	                            <td className={'admin-view-senior-table-data-container'} data-label={'Sr Caller Name'}>{item.telecaller_name}</td>
	                            <td className={'admin-view-senior-table-data-container'}><button onClick={() => setJrViewField()}>View Team</button></td>
	                        </tr>
	                    )
	                })}
	                </tbody>
	            </table>
		</div>
	)
}

export default AdminViewTeamSeniorTable;