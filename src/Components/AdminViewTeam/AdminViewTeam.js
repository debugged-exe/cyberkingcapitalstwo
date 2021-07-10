import React,{useState, useEffect} from 'react';
import { ToastContainer, toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
// redux
import { connect } from 'react-redux';
import {setAdminSeniorTelecallerArray, setAdminOverviewFilter} from '../../redux/admin-panel/admin-overview/admin.overview.actions.js';

// component
import PaymentCard from '../PaymentCard/PaymentCard.js';
import AdminViewTeamSeniorTable from './AdminViewTeamSeniorTable/AdminViewTeamSeniorTable.js';
import AdminViewTeamJuniorTable from './AdminViewTeamJuniorTable/AdminViewTeamJuniorTable.js';
import AdminViewTeamJuniorLog from './AdminViewTeamJuniorLog/AdminViewTeamJuniorLog.js';
import AdminViewUpdateModal from './AdminViewUpdateModal/AdminViewUpdateModal.js';
import * as FaIcons from 'react-icons/fa';

// css
import './AdminViewTeam.scss';
import AdminViewTeamJuniorCount from "./AdminViewTeamJuniorCount/AdminViewTeamJuniorCount";
import {createStructuredSelector} from "reselect";
import {selectJuniorLogStatArray} from "../../redux/junior-panel/junior-logs/junior.logs.selectors";
import {selectCurrentUser} from "../../redux/user/user.selectors";
import {selectAdminCountArray} from "../../redux/admin-panel/admin-count/admin.count.selectors";
import {setAdminCountArray} from "../../redux/admin-panel/admin-count/admin.count.actions";

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

const AdminViewTeam = ({admin_count_array, setAdminSeniorTelecallerArray, setAdminOverviewFilter}) => {

	const filterHandler = event => {
		setAdminOverviewFilter(event.target.value);
	}

	useEffect(() => {
		fetch('https://aqueous-mesa-28052.herokuapp.com/admin/seniors')
			.then( resp => resp.json())
			.then( resp => {
				setAdminSeniorTelecallerArray(resp);
			})
			.catch( err => {
				console.log(err);
			})
		fetch('https://aqueous-mesa-28052.herokuapp.com/admin/processed_counts',{
		})
			.then( resp => resp.json())
			.then( resp => {
				admin_count_array.map( (item, index) => {
					switch (item.Heading){
						case 'Hindi Count':
							item.numeric = resp[0].hindi;
							break;
						case 'Marathi Count':
							item.numeric = resp[0].marathi;
							break;
						default:
							break;
					}
				})
				setAdminCountArray(admin_count_array);
			})
			.catch( err => {
				console.log(err);
				toast.error('counts error',{
					position: toast.POSITION.TOP_CENTER,
					autoClose: 2500
				})
			})
	}, [])

	return (
		<div className={'admin-view-team-container '}>
			<div className="admin-view-team-count">
				{
					admin_count_array.map( (item, index) => (
						<PaymentCard key={index} Heading={item.Heading} numeric={item.numeric} icon={<FaIcons.FaLanguage size={'5rem'} color={item.color}/>}/>
					))
				}
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
            	<div className="admin-view-team-senior-table w-100 pb4-l pb2-m pb2-ns pb2">
        			<AdminViewTeamSeniorTable  />
        			<AdminViewTeamJuniorTable  />
        			<AdminViewTeamJuniorLog />
					<AdminViewTeamJuniorCount />
					<AdminViewUpdateModal />
            	</div>
			</div>
			<ToastContainer/>
		</div>
	)
}

const mapStateToProps = createStructuredSelector({
	admin_count_array: selectAdminCountArray
})

const mapDispatchToProps = dispatch => ({
	setAdminSeniorTelecallerArray: array => dispatch(setAdminSeniorTelecallerArray(array)),
	setAdminOverviewFilter: filter => dispatch(setAdminOverviewFilter(filter))
})

export default connect( mapStateToProps, mapDispatchToProps)(AdminViewTeam);