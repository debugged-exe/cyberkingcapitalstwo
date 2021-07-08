import React,{useEffect, useState} from 'react';
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

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

const AdminPayment = ({setAdminCountArray, setAdminPaymentTeamArray, setAdminModalLead, admin_count_array, admin_payment_team_array}) => {

	const [pages, setPages] = useState(0);
    const [pageNumbers, setPageNumbers] = useState([]);
    const perPage = 10;

    const [filter, setFilter] = useState('marathi');

	useEffect(() => {
		fetch('https://aqueous-mesa-28052.herokuapp.com/admin/processed_counts')
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
		fetch('https://aqueous-mesa-28052.herokuapp.com/admin/fetch_telecallers_count')
		.then(response => response.json())
		.then(resp => {
			var arr = [];
			for (let i = 1; i <= Math.ceil(resp.count / perPage); i++) {
                arr.push(i);
            }
            setPageNumbers(arr);
		})
		.catch(err => {
            console.log(err);
            toast.error("Failed to fetch telecaller count.", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 2500,
            });
        })
		fetch('https://aqueous-mesa-28052.herokuapp.com/admin/fetch_telecallers',{
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                pgNo: 0
            })
        })
        .then(response => response.json())
        .then(resp => {
        	setAdminPaymentTeamArray(resp);
        })
        .catch(err => {
        	console.log(err);
            toast.error("Failed to fetch telecallers.", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 2500,
            });
        })
	}, []);

	const fetchNewPage = (pgNo) => {
		fetch('https://aqueous-mesa-28052.herokuapp.com/admin/fetch_telecallers',{
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                pgNo: pgNo
            })
        })
        .then(response => response.json())
        .then(resp => {
        	setAdminPaymentTeamArray(resp);
        })
        .catch(err => {
        	console.log(err);
            toast.error("Failed to fetch telecallers.", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 2500,
            });
        })
	}

	return (
		<div className="admin-payment-container">
			<div className="admin-payment-disection">
				{
					admin_count_array.map((item,index) => {
						return(
							<PaymentCard key={index} Heading={item.Heading} numeric={item.numeric} icon={<FaIcons.FaLanguage size={'5rem'} color={item.color}/>}/>
						);
					})
				}
			</div>
			<hr color={'grey'} className={'mt4 mb4'}/>
			<div className="admin-payment-details">
				<div className={'flex justify-center items-center center mb4 w-100'}>
					<label className={'b f3 mr3'}>Select Language: </label>
					<select name="lang" className={'f4 ml1'} onChange={(event) => setFilter(event.target.value)}>
						<option value="marathi">Marathi</option>
						<option value="hindi">Hindi</option>
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
							{admin_payment_team_array.filter(item => item.preferred_language===filter)
								.map((item, index) => {
								return (
									<tr className="admin-payment-table-row-container">
										<td className={'admin-payment-table-data-container'} data-label={'Sr.No'}>{index + 1}</td>
										<td className={'admin-payment-table-data-container'} data-label={'Telecaller ID'}>{item.telecaller_id}</td>
										<td className={'admin-payment-table-data-container'} data-label={'Telecaller Name'}>{item.telecaller_name}</td>
										<td className={'admin-payment-table-data-container'} data-label={'Designation'}>{item.designation}</td>
										<td className={'admin-payment-table-data-container'} data-label={'Points'}>{item.points_earned}</td>
										<td className={'admin-payment-table-data-container'} data-label={'Paid'}>{item.points_paid}</td>
										<td className={'admin-payment-table-data-container'} data-label={'Bonus Paid'}>{item.bonus_earned}</td>
										<td className={'admin-payment-table-data-container pay-button-center'}><button onClick={() => setAdminModalLead(item)}>Pay</button></td>
									</tr>
								)
							})}
						</tbody>
					</table>
					<div className="admin-payment-pagination-container w-100 pb4">
			            <p>. . </p>
			            {pageNumbers.map((number, index) => (
			                <button key={index} onClick={() => fetchNewPage(number)} className="admin-payment-page-btn">{number}</button>
			            ))}
			            <p>. . </p>
			        </div>
					<AdminPaymentModal />
				</div>
			</div>
			<ToastContainer />
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