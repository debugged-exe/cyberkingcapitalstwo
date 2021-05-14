import React from 'react';
import './AdminViewTeamJuniorTable.scss';

const header = [
	'Sr No',
	'Jr Caller ID',
	'Jr Caller Name'
]

const tableLogs = [
	{
		telecaller_id: 'JR001',
		telecaller_name: 'Tejas'
	},
	{
		telecaller_id: 'JR002',
		telecaller_name: 'Soham'
	},
	{
		telecaller_id: 'JR003',
		telecaller_name: 'mahos'
	},
	{
		telecaller_id: 'JR004',
		telecaller_name: 'Sajet'
	}
]

const AdminViewTeamJuniorTable = ({jrView}) => {
	console.log(jrView);
	return (
		<div className={`${jrView?'admin-view-junior-table-container':'hidden'}`}>
			<table cellSpacing="1" className={'admin-view-junior-table-box'}>
	                <thead className={'admin-view-junior-table-head-container'}>
	                <tr>
	                    {header.map((item, index) => {
	                        return (
	                            <th className={'admin-view-junior-table-header-container'}>{item}</th>
	                        );
	                    })}
	                </tr>
	                </thead>
	                <tbody className={'admin-view-junior-table-body-container'}>
		                {tableLogs.map((item, index) => {
		                    return (
		                        <tr className="admin-view-junior-table-row-container">
		                            <td className={'admin-view-junior-table-data-container'} data-label={'Sr.No'}>{index+1}</td>
		                            <td className={'admin-view-junior-table-data-container'} data-label={'Jr Caller Id'}>{item.telecaller_id}</td>
		                            <td className={'admin-view-junior-table-data-container'} data-label={'Jr Caller Name'}>{item.telecaller_name}</td>
		                            <td className={'admin-view-junior-table-data-container button-center'}><button>View Logs</button></td>
		                            <td className={'admin-view-junior-table-data-container button-center'}><button>View Count</button></td>
		                        </tr>
		                    )
		                })}
	                </tbody>
	            </table>
		</div>
	)
}

export default AdminViewTeamJuniorTable;