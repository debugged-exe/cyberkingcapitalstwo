import React from 'react';

// redux
import { connect } from 'react-redux';

// reselect
import {createStructuredSelector} from 'reselect';
import {
	selectAdminSeniorTelecallerArray,
	selectAdminOverviewFilter,
	selectAdminJrView
} from '../../../redux/admin-panel/admin-overview/admin.overview.selectors.js';

// css
import './AdminViewTeamSeniorTable.scss';
import {setJrView} from "../../../redux/admin-panel/admin-overview/admin.overview.actions";

const header = [
	'Sr No',
	'Sr Caller ID',
	'Sr Caller Name'
]

const AdminViewTeamSeniorTable = ({setJrView, senior_telecaller_array, overview_filter}) => {
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
	                {senior_telecaller_array.filter(item => item.preferred_language===overview_filter)
	                	.map((item, index) => {
	                    return (
	                        <tr className="admin-view-senior-table-row-container">
	                            <td className={'admin-view-senior-table-data-container'} data-label={'Sr.No'}>{index+1}</td>
	                            <td className={'admin-view-senior-table-data-container'} data-label={'Sr Caller Id'}>{item.telecaller_id}</td>
	                            <td className={'admin-view-senior-table-data-container'} data-label={'Sr Caller Name'}>{item.telecaller_name}</td>
	                            <td className={'admin-view-senior-table-data-container'}><button onClick={() => setJrView(true)}>View Team</button></td>
	                        </tr>
	                    )
	                })}
	                </tbody>
	            </table>
		</div>
	)
}

const mapStateToProps = createStructuredSelector({
	senior_telecaller_array: selectAdminSeniorTelecallerArray,
	overview_filter: selectAdminOverviewFilter,
});

const mapDispatchToProps = dispatch => ({
	setJrView: visible => dispatch(setJrView(visible))
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminViewTeamSeniorTable);