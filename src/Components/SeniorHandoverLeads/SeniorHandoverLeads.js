import React,{useEffect, useState} from 'react';
import SeniorHandoverModal from './SeniorHandoverModal/SeniorHandoverModal';
import PuffLoader from "react-spinners/PuffLoader";
import FormInput from '../FormInput/FormInput.js';
import CustomButton from '../CustomButton/CustomButton.js';
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

    const [loader, setLoader] = useState(true)

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
            setLoader(false);
    		setHandoverLeadArray(resp)
        })
		.catch(err => {
			console.log(err);
            setLoader(false);
			toast.warn('Error loading handover requests.Please Refresh', {
				position: toast.POSITION.TOP_CENTER,
                autoClose: 1500,
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
        	toast.warn('Failed to fetch page count.Please Refresh', {
				position: toast.POSITION.TOP_CENTER,
                autoClose: 1500,
			});
        })
	}, [])

    const [filter, setFilter] = useState('*')
    const [filterValue, setFilterValue] = useState('');
    const [filterLabel , setFilterLabel] = useState('Select Filter');
    const [disable, setDisable] = useState(null);

    const filterHandler = (event) => {
        setFilter(event.target.value);
        switch(event.target.value){
            case '*':
                setFilterLabel('Select Filter');
                setDisable(true);
                break;
            case 'lead_id':
                setFilterLabel('Enter Lead Id')
                setDisable(null);
                break;
            case 'lead_name':
                setFilterLabel('Enter Lead Name')
                setDisable(null);
                break;
            case 'lead_phone_no':
                setFilterLabel('Enter Lead Phone No')
                setDisable(null);
                break;
            case 'assigned_to':
                setFilterLabel('Enter Jr Caller Id')
                setDisable(null);
                break;
            default:
                setFilterLabel('Select Filter');
                setDisable(true);
        }
    }

    const filterValueHandler = (event) => {
        setFilterValue(event.target.value);
    }

    const searchHandoverLeads = () => {
        const {telecaller_id} = currentUser;
        setLoader(true);
        if(filter!='*')
        {
            fetch('https://aqueous-mesa-28052.herokuapp.com/senior/fetch_handover_pgcount_by_filter', {
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    field: filter,
                    payload: filterValue,
                    pgNo: 0,
                    telecaller_id: telecaller_id
                })
            })
            .then(response => response.json())
            .then(response => {
                // console.log(response);
                var arr = [];
                for (let i = 1; i <= Math.ceil(response.count / perPage); i++) {
                    arr.push(i);
                }
                setPageNumbers(arr);
            })
            .catch(err => {
                console.log(err);
                toast.warn('Error loading page count.', {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 1500,
                });
            })

            fetch('https://aqueous-mesa-28052.herokuapp.com/senior/fetch_handover_leads_by_filter', {
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    field: filter,
                    payload: filterValue,
                    pgNo: 0,
                    telecaller_id: telecaller_id
                })
            })
            .then(response => response.json())
            .then(response => {
                setLoader(false);
                setHandoverLeadArray(response)
            })
            .catch(err => {
                console.log(err);
                setLoader(false);
                toast.warn('Error loading leads.Please try again.', {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 1500,
                });
            })
        }
        else{
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
                setLoader(false);
                setHandoverLeadArray(resp)
            })
            .catch(err => {
                console.log(err);
                setLoader(false);
                toast.warn('Error loading handover requests.Please Refresh', {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 1500,
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
                toast.warn('Failed to fetch page count.Please Refresh', {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 1500,
                });
            })
        }
    }

    const fetchNewPage = (pgNo) => {
        const {telecaller_id} = currentUser;
        setLoader(true);
        if(filter=='*'){
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
                setLoader(false);
                setHandoverLeadArray(resp)
            })
            .catch(err => {
                console.log(err);
                setLoader(false);
                toast.warn('Error loading handover requests.Please Refresh', {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 1500,
                });
            })
        }
        else
        {
            fetch('https://aqueous-mesa-28052.herokuapp.com/senior/fetch_handover_leads_by_filter',{
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    telecaller_id: telecaller_id,
                    pgNo: pgNo,
                    field: filter,
                    payload: filterValue
                })
            })
            .then(response => response.json())
            .then(resp => {
                setLoader(false);
                setHandoverLeadArray(resp)
            })
            .catch(err => {
                console.log(err);
                setLoader(false);
                toast.warn('Error loading handover requests.Please Refresh', {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 1500,
                });
            })
        }
    }

	return (
		<div className="senior-handover-leads">
			<p className="senior-handover-leads-header">Handed Over Leads</p>
            <label className={'b mr3 f3'}>Select Filter: </label>
            <div className={'flex flex-column justify-center items-center center mb4 f3 w-100 mt4'}>
                <select name="lang" className={'f3 ml1'} onChange={(event) => filterHandler(event)}>
                    <option value="*">None</option>
                    <option value="lead_id">Lead Id</option>
                    <option value="lead_name">Lead Name</option>
                    <option value="lead_phone_no">Lead Phone No</option>
                    <option value="assigned_to">Assigned To</option>
                </select>
                <FormInput
                    type="text"
                    name="filter_name"
                    value={filterValue}
                    label={filterLabel}
                    style={{marginTop: '0px', marginBottom: '0px'}}
                    onChange={(event) => filterValueHandler(event)}
                />
                <button
                className='search-button'
                onClick={() => searchHandoverLeads()}
                >
                Search
                </button>
            </div>
			<SeniorHandoverTable />
            <SeniorHandoverModal />
			<div className="senior-handover-pagination-container pb4">
                <p>. . </p>
                {pageNumbers.map((number, index) => (
                    <button key={index} onClick={() => fetchNewPage(number-1)} className="junior-log-page-btn">{number}</button>
                ))}
                <p>. . </p>
            </div>
            <div className="senior-puff-loader" style={{display: `${loader?'flex': 'none'}`}}>
                <PuffLoader loading={true} size={200} color={"red"}/>
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
