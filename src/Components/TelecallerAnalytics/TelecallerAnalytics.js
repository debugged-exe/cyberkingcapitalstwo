import React, {Component} from 'react';
import PuffLoader from "react-spinners/PuffLoader";
import CustomButton from '../CustomButton/CustomButton.js';
import FormInput from '../FormInput/FormInput.js';
import PaymentCard from '../PaymentCard/PaymentCard.js';
import TelecallerAnalyticsTable from './TelecallerAnalyticsTable/TelecallerAnalyticsTable.js';
import * as GrIcons from 'react-icons/gr';
import './TelecallerAnalytics.scss';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// redux
import { connect } from 'react-redux';
import {setAdminAnalyticsCount, setAdminAnalyticsLogs} from '../../redux/admin-panel/admin-analytics/admin.analytics.actions.js'

// reselect
import {createStructuredSelector} from 'reselect';
import {selectAdminAnalyticsCount, selectAdminAnalyticsLogs} from '../../redux/admin-panel/admin-analytics/admin.analytics.selectors.js';

const initialState = {
	params: {
		'telecaller_id': '',
		'start_date': '',
		'end_date': ''
	},
	'pages': [],
	'perPage': 10,
	'log_type': '',
	loader: false,
	dataCallers: [],
	designation: 'senior'
}

toast.configure();

class TelecallerAnalytics extends Component {
	constructor(props){
		super(props);
		this.state = initialState
	}

	componentDidMount(){
		fetch('https://aqueous-mesa-28052.herokuapp.com/admin/fetch_all_telecallers')
        .then(resp => resp.json())
        .then(response => {
            this.setState({
                dataCallers: response
            })
        })
        .catch(err => {
            console.log(err);
            toast.warn('Callers fetch failed.Please refresh', {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 4000
            });
        })
	}

	handleChange(event){
		const {name, value} = event.target;
		this.setState({params: {
				...this.state.params,
				[name]: value
			}
		});
	}

	handleSelect(event){
		const {name, value} = event.target;
		this.setState({
			designation: value
		})
	}

	handleTelecallerId(event){
		const {value} = event.target
		this.setState({params: {
				...this.state.params,
				telecaller_id: value
			}
		}, () => {
			// console.log(this.state.params)
		});
	}

	handleSubmit(event){
		event.preventDefault()
		const {setAdminAnalyticsCount, setAdminAnalyticsLogs, counts} = this.props;
		const {start_date, end_date} = this.state;
		if(start_date && end_date)
		{
			if(start_date>end_date)
			{
				toast.warn('Please enter valid combination of start and end date',{
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 4000
                });
			}
		}
		let bodyObject = {};
		for(var key of Object.keys(this.state.params)){
			if(this.state.params[key])
			{
				bodyObject[key] = this.state.params[key]
			}
		}
		this.setState({loader: true})
		setAdminAnalyticsCount(null)
		setAdminAnalyticsLogs(null)
		fetch('https://aqueous-mesa-28052.herokuapp.com/admin/logs/count', {
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify(bodyObject)
		})
		.then(response => response.json())
		.then(resp => {
			setAdminAnalyticsCount(resp)
			this.setState({loader: false})
		})
		.catch(err => {
			this.setState({loader: false})
			console.log(err)
			toast.warn('Failed to fetch analysis.Please try again',{
                position: toast.POSITION.TOP_CENTER,
                autoClose: 4000
            });
		})
	}

	capitalizeFirstLetter(string) {
  		return string.charAt(0).toUpperCase() + string.slice(1);
	}

	handleLogs(name, numeric){
		let log_type = name;
		if(log_type==='form_filled')
		{
			log_type = log_type + '_at'
		}
		this.setState({log_type: log_type}, () => {
			console.log()
		})
		this.setState({loader: true})
		const {setAdminAnalyticsLogs} = this.props
		const {perPage} = this.state
		let bodyObject = {};
		for(var key of Object.keys(this.state.params)){
			if(this.state.params[key])
			{
				bodyObject[key] = this.state.params[key]
			}
		}
		bodyObject['log_type'] = log_type
		bodyObject['pgNo'] = 0
		fetch('https://aqueous-mesa-28052.herokuapp.com/admin/logs', {
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify(bodyObject)
		})
		.then(response => response.json())
		.then(resp => {
			setAdminAnalyticsLogs(resp)
			window.scrollBy(0,500);
			let arr = []
		 	for (let i = 1; i <= Math.ceil(numeric / perPage); i++) {
				arr.push(i);
            }
            this.setState({pages: arr});
            this.setState({loader: false})
		})
		.catch(err => {
			this.setState({loader: false})
			console.log(err)
			toast.warn('Failed to fetch analysis.Please try again',{
                position: toast.POSITION.TOP_CENTER,
                autoClose: 4000
            });
		})
	}

	fetchNewPage(pgNo){
		const {setAdminAnalyticsLogs} = this.props
		const {perPage, log_type} = this.state
		let bodyObject = {};
		for(var key of Object.keys(this.state.params)){
			if(this.state.params[key])
			{
				bodyObject[key] = this.state.params[key]
			}
		}
		this.setState({loader: true})
		bodyObject['log_type'] = log_type
		bodyObject['pgNo'] = pgNo
		fetch('https://aqueous-mesa-28052.herokuapp.com/admin/logs', {
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify(bodyObject)
		})
		.then(response => response.json())
		.then(resp => {
			setAdminAnalyticsLogs(resp)
			this.setState({loader: false})
		})
		.catch(err => {
			this.setState({loader: false})
			console.log(err)
			toast.warn('Failed to fetch analysis.Please try again',{
                position: toast.POSITION.TOP_CENTER,
                autoClose: 4000
            });
		})	
	}

	render(){
		const {telecaller_id, start_date, end_date} = this.state.params
		const {pages, loader, dataCallers, designation} = this.state;
		const {counts,logs} = this.props
		return (
			<div className="telecaller-analytics">
				<p className="telecaller-analytics-header">Telecaller Analytics</p>
				<form className='telecaller-analytics-form' onSubmit={this.handleSubmit.bind(this)}>
					<div className="telecaller-analytics-select-container">
						<label htmlFor="designation" className="telecaller-analytics-date-label">Select Designation:</label>
						<select 
						name="designation" 
						className="telecaller-analytics-select" 
						onChange={this.handleSelect.bind(this)}
						>
							<option value="senior">Senior</option>
							<option value="junior">Junior</option>
						</select>
					</div>
					<div className="telecaller-analytics-id-container">
						<label htmlFor="telecaller_id" className="telecaller-analytics-date-label">Select Telecaller Id:</label>
						<input 
						type="text" 
						className="telecaller-analytics-id-input"
						onChange={this.handleTelecallerId.bind(this)}
						placeholder="Select Telecaller Id"
						list={"callers"}
						/>
						<datalist id="callers">
							{
								dataCallers
								.filter(item => item.designation === designation)
								.map((item,index) => {
									return(
										<option key={index} value={item.telecaller_id}>{item.telecaller_id}</option>
									)
								})
							}
						</datalist>
					</div>
	                <div className="date-container">
	                	<div className="date">
	                		<label htmlFor="start_date" className="telecaller-analytics-date-label">Start Date</label>
	                		<FormInput
			                type="date"
			                name="start_date"
			                value={start_date}
			                onChange={this.handleChange.bind(this)}
			                style={{marginTop: '0px', marginBottom: '0px'}}
			                required
		                	/>
	                	</div>
	                	<div className="date">
	                		<label htmlFor="end_date" className="telecaller-analytics-date-label">End Date</label>
	                		<FormInput
			                type="date"
			                name="end_date"
			                value={end_date}
			                onChange={this.handleChange.bind(this)}
			                style={{marginTop: '0px', marginBottom: '0px'}}
		                	/>
	                	</div>
	                </div>
	                <CustomButton
                        type='submit'
                        style={{width: '55%', marginLeft: '-5px'}}
                    >
                        Fetch Analysis
                    </CustomButton>
				</form>
				<div className="telecaller-analytics-counts">
					{
						counts
						? Object.keys(counts[0]).map((item,index) => {
							let titleArr = item.split('_')
							let title = ""
							titleArr.map(item => {
								if(item!=="at")
								{
									title = title+item
								}
							})
							title = this.capitalizeFirstLetter(title)
							return(
								<PaymentCard item={item} handleLogs={this.handleLogs.bind(this)} key={index} Heading={title} numeric={counts[0][item]} icon={<GrIcons.GrAnalytics size={'4rem'} color={'black'}/>}/>
							)
						})
						: null
					}
				</div>
				{
					logs
					?<>
						<TelecallerAnalyticsTable />
						<div className="telecaller-analytics-pagination-container pb4">
			                <p>. . </p>
			                {pages.map((number, index) => (
			                    <button key={index} onClick={() => this.fetchNewPage(number-1)}className="telecaller-analytics-page-btn">{number}</button>
			                ))}
			                <p>. . </p>
            			</div>
					</>
					:null
				}
				<div className="telecaller-analytics-puff-loader" style={{display: `${loader?'flex': 'none'}`}}>
                	<PuffLoader loading={true} size={200} color={"red"}/>
            	</div>
				<ToastContainer />
			</div>
		)
	}
}

const mapStateToProps = createStructuredSelector({
	counts: selectAdminAnalyticsCount,
	logs: selectAdminAnalyticsLogs
})

const mapDispatchToProps = dispatch => ({
	setAdminAnalyticsCount: array =>  dispatch(setAdminAnalyticsCount(array)),
	setAdminAnalyticsLogs: array => dispatch(setAdminAnalyticsLogs(array))	
})

export default connect(mapStateToProps, mapDispatchToProps)(TelecallerAnalytics);