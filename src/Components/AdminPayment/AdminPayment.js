import React,{useEffect} from 'react';

// redux
import { connect } from 'react-redux';
import {setAdminCountArray} from '../../redux/admin-panel/admin-count/admin.count.actions.js';
import {setAdminPaymentTeamArray, setAdminModalLead} from '../../redux/admin-panel/admin-payment/admin.payment.actions.js';

// reselect
import {createStructuredSelector} from 'reselect';
import {selectAdminCountArray} from '../../redux/admin-panel/admin-count/admin.count.selectors.js';
import {selectAdminPaymentTeamArray} from '../../redux/admin-panel/admin-payment/admin.payment.selectors.js';

// component
import PaymentCard from '../PaymentCard/PaymentCard.js';
import AdminPaymentModal from './AdminPaymentModal/AdminPaymentModal.js';
import * as FaIcons from 'react-icons/fa';

// css
import './AdminPayment.scss';

const header = ['Sr No', 'Telecaller ID', 'Telecaller Name', 'Designation', 'Points', 'Paid', 'Bonus Paid'];

const tableData = [
	{
		telecaller_id: 'SR001',
		telecaller_name: 'Soham Khade',
		designation: 'SrCaller',
		points: 50,
		paid: 10,
		bonus_paid: 100,
		
	},
	{
		telecaller_id: 'JR001',
		telecaller_name: 'Tanmay Jagtap',
		designation: 'JrCaller',
		points: 50,
		paid: 10,
		bonus_paid: 100,
	},
	{
		telecaller_id: 'AD001',
		telecaller_name: 'Tejas Machkar',
		designation: 'Admin',
		points: 50,
		paid: 10,
		bonus_paid: 100
	}
]

const countArray =[
	{
		Heading: 'Hindi Count',
		numeric: 500,
		color: 'rgb(57, 73, 171)'
	},
	{
		Heading: 'Marathi Count',
		numeric: 500,
		color: 'rgb(67, 160, 71)'
	}
]

const AdminPayment = ({setAdminCountArray, setAdminPaymentTeamArray, setAdminModalLead, admin_count_array, admin_payment_team_array}) => {

	useEffect(() => {
		setAdminCountArray(countArray);
		setAdminPaymentTeamArray(tableData);
	}, []);

	return (
		<div className="admin-payment-container">
			<div className="admin-payment-disection">
				{
					admin_count_array.map((item,index) => {
						return(
							<PaymentCard Heading={item.Heading} numeric={item.numeric} icon={<FaIcons.FaLanguage size={'5rem'} color={item.color}/>}/>
						);
					})
				}
			</div>
			<hr color={'grey'} className={'mt4 mb4'}/>
			<div className="admin-payment-details">
				<div className={'flex justify-center items-center center mb4 w-100'}>
					<label className={'b f3 mr3'}>Select Language: </label>
					<select name="lang" className={'f4 ml1'}>
						<option value="hindi">Hindi</option>
						<option value="marathi">Marathi</option>
					</select>
				</div>
				
				<div className="admin-payment-table-container">
					<table cellspacing="1" className={'admin-payment-table-box'} >
						<thead className={'admin-payment-table-head-container'}>
							<tr>
							{header.map((item, index) => {
								return (
									<th className={'admin-payment-table-header-container'}>{item}</th>
								);
							})}
							</tr>
						</thead>
						<tbody className={'admin-payment-table-body-container'}>
							{admin_payment_team_array.map((item, index) => {
								return (
									<tr className="admin-payment-table-row-container">
										<td className={'admin-payment-table-data-container'} data-label={'Sr.No'}>{index + 1}</td>
										<td className={'admin-payment-table-data-container'} data-label={'Telecaller ID'}>{item.telecaller_id}</td>
										<td className={'admin-payment-table-data-container'} data-label={'Telecaller Name'}>{item.telecaller_name}</td>
										<td className={'admin-payment-table-data-container'} data-label={'Designation'}>{item.designation}</td>
										<td className={'admin-payment-table-data-container'} data-label={'Points'}>{item.points}</td>
										<td className={'admin-payment-table-data-container'} data-label={'Paid'}>{item.paid}</td>
										<td className={'admin-payment-table-data-container'} data-label={'Bonus Paid'}>{item.bonus_paid}</td>
										<td className={'admin-payment-table-data-container pay-button-center'}><button onClick={() => setAdminModalLead(item)}>Pay</button></td>
									</tr>
								)
							})}
						</tbody>
					</table>
					<AdminPaymentModal />
				</div>
			</div>
		</div>
	)
}

const mapStateToProps = createStructuredSelector({
	admin_count_array: selectAdminCountArray,
	admin_payment_team_array: selectAdminPaymentTeamArray
});

const mapDispatchToProps = dispatch => ({
	setAdminCountArray: array => dispatch(setAdminCountArray(array)),
	setAdminPaymentTeamArray: array => dispatch(setAdminPaymentTeamArray(array)),
	setAdminModalLead: lead => dispatch(setAdminModalLead(lead))
})

export default connect(mapStateToProps, mapDispatchToProps)(AdminPayment);