import React, {Component} from 'react';
import CustomButton from '../CustomButton/CustomButton.js';
import FormInput from '../FormInput/FormInput.js';
import PaymentCard from '../PaymentCard/PaymentCard.js';
import * as GrIcons from 'react-icons/gr';
import './TelecallerAnalytics.scss';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// redux
import { connect } from 'react-redux';
import {setAdminAnalyticsCount} from '../../redux/admin-panel/admin-analytics/admin.analytics.actions.js'

// reselect
import {createStructuredSelector} from 'reselect';
import {selectAdminAnalyticsCount} from '../../redux/admin-panel/admin-analytics/admin.analytics.selectors.js';

const initialState = {
	'telecaller_id': '',
	'start_date': '',
	'end_date': ''
}

toast.configure();

class TelecallerAnalytics extends Component {
	constructor(props){
		super(props);
		this.state = initialState
	}

	handleChange(event){
		const {name, value} = event.target;
		this.setState({[name]: value});
	}

	handleSubmit(event){
		event.preventDefault()
		const {setAdminAnalyticsCount,counts} = this.props;
		const {start_date, end_date} = this.state;
		if(start_date && end_date)
		{
			if(start_date>end_date)
			{
				toast.error('Please enter valid combination of start and end date',{
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 4000
                });
			}
		}
		let bodyObject = {};
		for(var key of Object.keys(this.state)){
			if(this.state[key])
			{
				bodyObject[key] = this.state[key]
			}
		}
		fetch('https://aqueous-mesa-28052.herokuapp.com/admin/logs/count', {
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify(bodyObject)
		})
		.then(response => response.json())
		.then(resp => {
			setAdminAnalyticsCount(resp)
		})
		.catch(err => {
			console.log(err)
			toast.error('Failed to fetch analysis.Please try again',{
                position: toast.POSITION.TOP_CENTER,
                autoClose: 4000
            });
		})
	}

	capitalizeFirstLetter(string) {
  		return string.charAt(0).toUpperCase() + string.slice(1);
	}

	handleLogs(event){
		const {name} = event.target;
		let bodyObject = {};
		for(var key of Object.keys(this.state)){
			if(this.state[key])
			{
				bodyObject[key] = this.state[key]
			}
		}
		bodyObject['log_type'] = name
		bodyObject['pgNo'] = 0
		fetch('https://aqueous-mesa-28052.herokuapp.com/admin/logs', {
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify(bodyObject)
		})
		.then(response => response.json())
		.then(console.log)
		.catch(err => {
			console.log(err)
			toast.error('Failed to fetch analysis.Please try again',{
                position: toast.POSITION.TOP_CENTER,
                autoClose: 4000
            });	
		})
	}

	render(){
		const {telecaller_id, start_date, end_date} = this.state;
		const {counts} = this.props
		return (
			<div className="telecaller-analytics">
				<p className="telecaller-analytics-header">Telecaller Analytics</p>
				<form className='telecaller-analytics-form' onSubmit={this.handleSubmit.bind(this)}>
					<FormInput
		                type="text"
		                name="telecaller_id"
		                value={telecaller_id}
		                onChange={this.handleChange.bind(this)}
		                label="Enter Telecaller Id"
		                style={{marginTop: '0px', marginBottom: '0px'}}
	                />
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
								<PaymentCard key={index} Heading={title} numeric={counts[0][item]} icon={<GrIcons.GrAnalytics size={'4rem'} color={'black'}/>}/>
							)
						})
						: null
					}
				</div>
				<ToastContainer />
			</div>
		)
	}
}

const mapStateToProps = createStructuredSelector({
	counts: selectAdminAnalyticsCount
})

const mapDispatchToProps = dispatch => ({
	setAdminAnalyticsCount: array =>  dispatch(setAdminAnalyticsCount(array))	
})

export default connect(mapStateToProps, mapDispatchToProps)(TelecallerAnalytics);