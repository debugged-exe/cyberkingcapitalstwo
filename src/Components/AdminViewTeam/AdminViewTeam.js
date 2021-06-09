import React,{useState, useEffect} from 'react';

// redux
import { connect } from 'react-redux';
import {setAdminSeniorTelecallerArray, setAdminOverviewFilter} from '../../redux/admin-panel/admin-overview/admin.overview.actions.js';

// component
import PaymentCard from '../PaymentCard/PaymentCard.js';
import AdminViewTeamSeniorTable from './AdminViewTeamSeniorTable/AdminViewTeamSeniorTable.js';
import AdminViewTeamJuniorTable from './AdminViewTeamJuniorTable/AdminViewTeamJuniorTable.js';
import AdminViewTeamJuniorLog from './AdminViewTeamJuniorLog/AdminViewTeamJuniorLog.js';
import * as FaIcons from 'react-icons/fa';

// css
import './AdminViewTeam.scss';

const tableLogs = [
	{
		telecaller_id: 'SR001',
		telecaller_name: 'Tejas',
		assigned_to: '',
		preferred_language: 'hindi',
		designation: 'senior'
	},
	{
		telecaller_id: 'SR002',
		telecaller_name: 'Soham',
		assigned_to: '',
		preferred_language: 'marathi',
		designation: 'senior'
	},
	{
		telecaller_id: 'SR003',
		telecaller_name: 'mahos',
		assigned_to: '',
		preferred_language: 'hindi',
		designation: 'senior'
	},
	{
		telecaller_id: 'SR004',
		telecaller_name: 'Sajet',
		assigned_to: '',
		preferred_language: 'marathi',
		designation: 'senior'
	},
    {
        telecaller_id: 'JR001',
        telecaller_name: 'Tejas',
        assigned_to: 'SR001',
        preferred_language: 'hindi',
        designation: 'junior'
    },
    {
        telecaller_id: 'JR002',
        telecaller_name: 'Soham',
        assigned_to: 'SR001',
        preferred_language: 'hindi',
        designation: 'junior'
    },
    {
        telecaller_id: 'JR003',
        telecaller_name: 'mahos',
        assigned_to: 'SR002',
        preferred_language: 'marathi',
        designation: 'junior'
    },
    {
        telecaller_id: 'JR004',
        telecaller_name: 'Sajet',
        assigned_to: 'SR002',
        preferred_language: 'marathi',
        designation: 'junior'
    },
    {
        telecaller_id: 'JR005',
        telecaller_name: 'Gojo',
        assigned_to: 'SR003',
        preferred_language: 'hindi',
        designation: 'junior'
    },
    {
        telecaller_id: 'JR006',
        telecaller_name: 'Itadori',
        assigned_to: 'SR003',
        preferred_language: 'hindi',
        designation: 'junior'
    },
    {
        telecaller_id: 'JR007',
        telecaller_name: 'Nobara',
        assigned_to: 'SR004',
        preferred_language: 'marathi',
        designation: 'junior'
    },
    {
        telecaller_id: 'JR008',
        telecaller_name: 'Fushiguro',
        assigned_to: 'SR004',
        preferred_language: 'marathi',
        designation: 'junior'
    }
]

const AdminViewTeam = ({setAdminSeniorTelecallerArray, setAdminOverviewFilter}) => {

	const filterHandler = event => {
		setAdminOverviewFilter(event.target.value);
	}

	useEffect(() => {
		setAdminSeniorTelecallerArray(tableLogs);
	}, [])

	return (
		<div className={'admin-view-team-container '}>
			<div className="admin-view-team-count">
				<PaymentCard Heading={'Hindi Count'} numeric={500} icon={<FaIcons.FaLanguage size={'5rem'} color={'rgb(57, 73, 171)'}/>}/>
				<PaymentCard Heading={'Marathi Count'} numeric={500} icon={<FaIcons.FaLanguage size={'5rem'} color={'rgb(67, 160, 71)'}/>}/>
			</div>
			<hr color={'grey'} className={'mt4 mb4'}/>
			<div className=" admin-view-team-table">
				<div className={'flex justify-center items-center center f2 w-90 ma4 w-50-s'}>
	                <label className={'b mr3'}>Select preferred Language: </label>
	                <select name="lang" className={'f3 ml1'} onChange={(event) => filterHandler(event)}>
	                    <option value="hindi">Hindi</option>
	                    <option value="marathi">Marathi</option>
	                </select>
            	</div>
            	<div className="admin-view-team-senior-table w-100">
        			<AdminViewTeamSeniorTable  />
        			<AdminViewTeamJuniorTable  />
        			<AdminViewTeamJuniorLog />
            	</div>
			</div>
		</div>
	)
}

const mapStateToProps = (state) => ({
	
})

const mapDispatchToProps = dispatch => ({
	setAdminSeniorTelecallerArray: array => dispatch(setAdminSeniorTelecallerArray(array)),
	setAdminOverviewFilter: filter => dispatch(setAdminOverviewFilter(filter))
})

export default connect(null, mapDispatchToProps)(AdminViewTeam);