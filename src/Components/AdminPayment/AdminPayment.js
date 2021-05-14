import React from 'react';
import PaymentCard from '../PaymentCard/PaymentCard.js';
import * as FaIcons from 'react-icons/fa';
import './AdminPayment.scss';

const header = ['Sr No', 'Telecaller ID', 'Telecaller Name', 'Designation', 'Points', 'Paid', 'Paying', 'Bonus Paid', 'Bonus Paying'];

const tableData = [
	{
		telecaller_id: 'SR001',
		telecaller_name: 'Soham Khade',
		designation: 'SrCaller',
		points: 50,
		paid: 10,
		paying: 10,
		bonus_paid: 100,
		bonus_paying: 500
	},
	{
		telecaller_id: 'JR001',
		telecaller_name: 'Tanmay Jagtap',
		designation: 'JrCaller',
		points: 50,
		paid: 10,
		paying: 10,
		bonus_paid: 100,
		bonus_paying: 500
	},
	{
		telecaller_id: 'AD001',
		telecaller_name: 'Tejas Machkar',
		designation: 'Admin',
		points: 50,
		paid: 10,
		paying: 10,
		bonus_paid: 100,
		bonus_paying: 500
	}
]

const AdminPayment = () => {
	return (
		<div className="admin-payment-container">
			<div className="admin-payment-disection">
				<PaymentCard Heading={'Hindi Count'} numeric={500} icon={<FaIcons.FaLanguage size={'5rem'} color={'rgb(57, 73, 171)'}/>}/>
				<PaymentCard Heading={'Marathi Count'} numeric={500} icon={<FaIcons.FaLanguage size={'5rem'} color={'rgb(67, 160, 71)'}/>}/>
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
							{tableData.map((item, index) => {
								return (
									<tr className="admin-payment-table-row-container">
										<td className={'admin-payment-table-data-container'} data-label={'Sr.No'}>{index + 1}</td>
										<td className={'admin-payment-table-data-container'} data-label={'Telecaller ID'}>{item.telecaller_id}</td>
										<td className={'admin-payment-table-data-container'} data-label={'Telecaller Name'}>{item.telecaller_name}</td>
										<td className={'admin-payment-table-data-container'} data-label={'Designation'}>{item.designation}</td>
										<td className={'admin-payment-table-data-container'} data-label={'Points'}>{item.points}</td>
										<td className={'admin-payment-table-data-container'} data-label={'Paid'}>{item.paid}</td>
										<td className={'admin-payment-table-data-container'} data-label={'Paying'}>{item.paying}</td>
										<td className={'admin-payment-table-data-container'} data-label={'Bonus Paid'}>{item.bonus_paid}</td>
										<td className={'admin-payment-table-data-container'} data-label={'Bonus Paying'}>{item.bonus_paying}</td>
									</tr>
								)
							})}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	)
}

export default AdminPayment;