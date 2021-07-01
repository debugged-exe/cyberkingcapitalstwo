import React,{useEffect, useState} from 'react';
import SeniorHandoverModal from './SeniorHandoverModal/SeniorHandoverModal';
import {ToastContainer,toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// redux
import { connect } from 'react-redux';
import {
    setHandoverLeadArray
} from '../../redux/senior-panel/senior-handover/senior.handover.actions.js';

// reselect
import {createStructuredSelector} from "reselect";
import {selectCurrentUser} from "../../redux/user/user.selectors";

// components
import SeniorHandoverTable from './SeniorHandoverTable/SeniorHandoverTable.js';

// css
import './SeniorHandoverLeads.scss';

toast.configure();

const SeniorHandoverLeads = ({setHandoverLeadArray,currentUser}) => {

	const [pages, setPages] = useState(0);
    const [pageNumbers, setPageNumbers] = useState([]);
    const perPage = 10;

	useEffect(() => {
		const {telecaller_id} = currentUser;
		fetch('https://aqueous-mesa-28052.herokuapp.com/senior/fetch_handover_leads',{
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                telecaller_id: telecaller_id,
                pgNo: 0
            })
        })
        .then(response => response.json())
        .then(resp => {
    		setHandoverLeadArray(resp)
        })
		.catch(err => {
			console.log(err);
			toast.error('Error loading handover requests.Please Refresh', {
				position: toast.POSITION.TOP_CENTER,
                autoClose: 2500,
			});
		})
		fetch('https://aqueous-mesa-28052.herokuapp.com/senior/fetch_handover_pgcount',{
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                telecaller_id: telecaller_id
            })
        })
        .then(response => response.json())
        .then(resp => {
        	setPages(resp.count);
        	var arr = [];
            for (let i = 1; i <= Math.ceil(resp.count / perPage); i++) {
                arr.push(i);
            }
            setPageNumbers(arr);
        })
        .catch(err => {
        	console.log(err);
        	toast.error('Failed to fetch page count.Please Refresh', {
				position: toast.POSITION.TOP_CENTER,
                autoClose: 2500,
			});
        })
	}, [])

	const fetchNewPage = (pgNo) => {
		const {telecaller_id} = currentUser;
		fetch('https://aqueous-mesa-28052.herokuapp.com/senior/fetch_handover_leads',{
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                telecaller_id: telecaller_id,
                pgNo: pgNo
            })
        })
        .then(response => response.json())
        .then(resp => {
        	setHandoverLeadArray(resp)
        })
        .catch(err => {
        	console.log(err);
        	toast.error('Error loading handover requests.Please Refresh', {
				position: toast.POSITION.TOP_CENTER,
                autoClose: 2500,
			});
        })
	}

	return (
		<div className="senior-handover-leads">
			<p className="senior-handover-leads-header">Handed Over Leads</p>
			<SeniorHandoverTable />
            <SeniorHandoverModal />
			<div className="senior-handover-pagination-container pb4">
                <p>. . </p>
                {pageNumbers.map((number, index) => (
                    <button key={index} onClick={() => fetchNewPage(number-1)} className="junior-log-page-btn">{number}</button>
                ))}
                <p>. . </p>
            </div>
            <ToastContainer/>
		</div>
	)
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
	setHandoverLeadArray: array => dispatch(setHandoverLeadArray(array)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SeniorHandoverLeads);