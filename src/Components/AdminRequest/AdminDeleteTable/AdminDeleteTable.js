import React from 'react';

// redux
import { connect } from 'react-redux';

// reselect
import {createStructuredSelector} from 'reselect';
import {selectAdminDeleteRequestArray} from '../../../redux/admin-panel/admin-request/admin.request.selectors.js';

// components
import * as AiIcons from 'react-icons/ai';
import * as ImIcons from 'react-icons/im';

// css
import './AdminDeleteTable.scss';

const header = [
    "Sr.No",
    "Telecaller Id",
    "Telecaller Name",
    "Lead Id",
    "Lead Name"
]

const AdminDeleteTable = ({admin_delete_request_array}) => {
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
                {admin_delete_request_array.map((item, index) => {
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

const mapStateToProps = createStructuredSelector({
    admin_delete_request_array: selectAdminDeleteRequestArray
});

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps)(AdminDeleteTable);