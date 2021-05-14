import React,{useState} from 'react';
import PaymentCard from '../PaymentCard/PaymentCard.js';
import AdminViewTeamSeniorTable from './AdminViewTeamSeniorTable/AdminViewTeamSeniorTable.js';
import AdminViewTeamJuniorTable from './AdminViewTeamJuniorTable/AdminViewTeamJuniorTable.js';
import * as FaIcons from 'react-icons/fa';
import './AdminViewTeam.scss';

const AdminViewTeam = () => {

	const [jrView, setJrView] = useState(false);
	const setJrViewField = () => {
		setJrView(!jrView);
	}

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
	                <select name="lang" className={'f3 ml1'}>
	                    <option value="hindi">Hindi</option>
	                    <option value="marathi">Marathi</option>
	                </select>
            	</div>
            	<div className="admin-view-team-senior-table w-100">
        			<AdminViewTeamSeniorTable setJrViewField={setJrViewField} />
        			<AdminViewTeamJuniorTable jrView={jrView} />
            	</div>
			</div>
		</div>
	)
}

export default AdminViewTeam;