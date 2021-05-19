import React from 'react';
import * as AiIcons from 'react-icons/ai';
import * as ImIcons from 'react-icons/im';
import './AdminDeleteTable.scss';

const header = [
    "Sr.No",
    "Telecaller Id",
    "Telecaller Name",
    "Lead Id",
    "Lead Name"
]

const tableLogs = [
    {
        telecaller_id: "JR0001",
        telecaller_name: "tanmay",
        lead_id: "SR9012",
        lead_name: "tejas"
    },
    {
        telecaller_id: "JR002",
        telecaller_name: "soham",
        lead_id: "SR99283",
        lead_name: "sumedh"
    }
]

const AdminDeleteTable = () => {
	return (
		<div className={'admin-delete-table-container'}>
            <button className="delete-all">Delete All</button>
            <table cellSpacing="1" className={'admin-delete-table-box'}>
                <thead className={'admin-delete-table-head-container'}>
                <tr>
                    {header.map((item, index) => {
                        return (
                            <th className={'admin-delete-table-header-container'}>{item}</th>
                        );
                    })}
                </tr>
                </thead>
                <tbody className={'admin-delete-table-body-container'}>
                {tableLogs.map((item, index) => {
                    return (
                        <tr className="admin-delete-table-row-container">
                            <td className={'admin-delete-table-data-container'} data-label={'Sr.No'}>{index+1}</td>
                            <td className={'admin-delete-table-data-container'} data-label={'Telecaller Id'}>{item.telecaller_id}</td>
                            <td className={'admin-delete-table-data-container'} data-label={'Telecaller Name'}>{item.telecaller_name}</td>
                            <td className={'admin-delete-table-data-container'} data-label={'Lead Id'}>{item.lead_id}</td>
                            <td className={'admin-delete-table-data-container'} data-label={'Lead Name'}>{item.lead_name}</td>
                            <td className={'admin-delete-table-data-container pointer'}><AiIcons.AiFillCheckCircle className={'btn-center'} size={'2rem'} color={'green'}/></td>
                            <td className={'admin-delete-table-data-container pointer'}><ImIcons.ImCross className={'btn-center'} size={'1.5rem'} color={'red'}/></td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
        </div>
	)
}

export default AdminDeleteTable;