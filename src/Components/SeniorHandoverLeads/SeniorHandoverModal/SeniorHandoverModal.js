import React from 'react';
import {ToastContainer,toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//components
import * as AiIcons from 'react-icons/ai';
import FormInput from '../../FormInput/FormInput.js';
import CustomButton from '../../CustomButton/CustomButton.js';

//css
import './SeniorHandoverModal.scss';

//redux
import {connect} from 'react-redux';
import {
    setSeniorModalVisibility,
    reassignHandoverLead
} from '../../../redux/senior-panel/senior-handover/senior.handover.actions.js';

//reselect
import {createStructuredSelector} from "reselect";
import {
	selectSeniorHandoverLead,
	selectSeniorHandoverLeadVisibility
} from "../../../redux/senior-panel/senior-handover/senior.handover.selectors";

const initialState = {
	lead_whatsapp_no: '',
	account_opening_no: '',
	status_1: '',
	status_2: '',
	handover_status: '',
	account_opening_name: ''
}

toast.configure();

class SeniorHandoverModal extends React.Component {
	constructor(props){
		super(props);
		this.state = initialState;
	}

	handleSubmit = (event) => {
        event.preventDefault();
        const {name} = event.target;
        let payload = this.state.[name];
        const {lead_id} = this.props.senior_modal_lead;
        const {reassignHandoverLead} = this.props;
        fetch('https://aqueous-mesa-28052.herokuapp.com/senior/update', {
        	method: 'post',
        	headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
            	field: name,
            	payload: payload,
            	lead_id: lead_id
            })
        })
        .then(response => response.json())
        .then(resp => {
        	if(resp[0].lead_id)
        	{
        		reassignHandoverLead(resp[0]);
        		toast.success(`${name} updated successfully`, {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 2500,
                });
	        	this.setState(initialState, () => {
	        		console.log('')
	        	})
        	}
        })
        .catch(err => {
        	console.log(err);
        	toast.warn("Unable to update.Please try again", {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 2500,
                });
        })
    }

    handleChange = event => {
        const {name, value} = event.target;
        this.setState({[name]: value});
    }

	render() {

		const {lead_whatsapp_no, account_opening_no, status_1, status_2,handover_status, account_opening_name} = this.state;
		const {senior_modal_lead, senior_modal_visibility,setSeniorModalVisibility} = this.props;

		return (
			<div style={{display: `${senior_modal_visibility?'block':'none'}`}}>
				<div className="senior-handover-tint"></div>
				<div className='senior-handover-modal'>
				<div className="flex justify-between items-center">
					<h1 className="ml3 senior-handover-modal-header">Update Details</h1>
					<AiIcons.AiOutlineClose size={'2rem'} color={'black'} className="mr3" onClick={() => {setSeniorModalVisibility(false)}}/>
				</div>
				
				<div className="senior-handover-grid-div">
					<div className="flex flex-column justify-center items-center">
						<div className="senior-handover-modal-lead-details">
							<p className="senior-handover-detail-item shadow-4 ma2 pa2">Lead ID: {senior_modal_lead.lead_id}</p>
							<p className="senior-handover-detail-item shadow-4 ma2 pa2">Lead Name: {senior_modal_lead.lead_name}</p>
							<p className="senior-handover-detail-item shadow-4 ma2 pa2">Lead Contact: {senior_modal_lead.lead_phone_no}</p>
							<p className="senior-handover-detail-item shadow-4 ma2 pa2">City: {senior_modal_lead.lead_city}</p>
							<p className="senior-handover-detail-item shadow-4 ma2 pa2">Preferred Language: {senior_modal_lead.preferred_language}</p>
						</div>
					</div>
					<div className="w-60 senior-handover-modal-form ">
						<div className={'mt2 f3'} style={{marginBottom: "-3%"}}>
							<label >
								Current Value: {senior_modal_lead.lead_whatsapp_no}
							</label>
							<form name="lead_whatsapp_no" className={'senior-handover-modal-form-component'} onSubmit={this.handleSubmit}>
								<FormInput
									type="text"
									name="lead_whatsapp_no"
									value={lead_whatsapp_no}
									onChange={this.handleChange}
									label="Whatsapp Number"
									style = {{marginTop: '0px', marginBottom: '0px'}}
									required
								/>
								<div className={'mt4'}>
									<CustomButton type="submit" id={'senior-button-margin-1'}>Update</CustomButton>
								</div>
							</form>
						</div>
						<div className={'mt2 f3'}>
							<label>Current Value: {senior_modal_lead.account_opening_no}</label>
							<form name="account_opening_no" className={'senior-handover-modal-form-component'} onSubmit={this.handleSubmit}>
								<FormInput
									type="text"
									name="account_opening_no"
									value={account_opening_no}
									onChange={this.handleChange}
									label="Account Opening No"
									style={{marginTop: '0px', marginBottom: '0px'}}
									required
								/>
								<div className={'mt4'}>
									<CustomButton type="submit" id={'senior-button-margin-2'}>Update</CustomButton>
								</div>
							</form>
						</div>
						<div className={'mt2 f3'} style={{marginBottom: "-3%"}}>
							<label >
								Current Value: {senior_modal_lead.account_opening_name}
							</label>
							<form name="account_opening_name" className={'senior-handover-modal-form-component'} onSubmit={this.handleSubmit}>
								<FormInput
									type="text"
									name="account_opening_name"
									value={account_opening_name}
									onChange={this.handleChange}
									label="Account Opening Name"
									style = {{marginTop: '0px', marginBottom: '0px'}}
									required
								/>
								<div className={'mt4'}>
									<CustomButton type="submit" id={'senior-button-margin-1'}>Update</CustomButton>
								</div>
							</form>
						</div>
						<div className={'mt2 f3'}>
							<label>Current Status 1: {senior_modal_lead.status_1}</label>
							<form name="status_1" className={'senior-handover-modal-form-component'} onSubmit={this.handleSubmit}>
								<FormInput
									type="text"
									name="status_1"
									value={status_1}
									onChange={this.handleChange}
									label="Status 1"
									style={{marginTop: '0px', marginBottom: '0px'}}
									required
								/>
								<div className={'mt4'}>
									<CustomButton type="submit" id={'senior-button-margin-3'}>Update</CustomButton>
								</div>
							</form>
						</div>
						<div className={'mt2 f3'}>
							<label>Current Status 2: {senior_modal_lead.status_2}</label>
							<form name="status_2" className={'senior-handover-modal-form-component'} onSubmit={this.handleSubmit}>
								<FormInput
									type="text"
									name="status_2"
									value={status_2}
									onChange={this.handleChange}
									label="Status 2"
									style={{marginTop: '0px', marginBottom: '0px'}}
									required
								/>
								<div className={'mt4'}>
									<CustomButton type="submit" id={'senior-button-margin-4'}>Update</CustomButton>
								</div>
							</form>
						</div>
						<div className={'mt2 f3'}>
							<label>Current Handover Status: {senior_modal_lead.handover_status}</label>
							<form name="handover_status" className={'senior-handover-modal-form-component'} onSubmit={this.handleSubmit}>
								<FormInput
									type="text"
									name="handover_status"
									value={handover_status}
									onChange={this.handleChange}
									label="Handover Status"
									style={{marginTop: '0px', marginBottom: '0px'}}
									required
								/>
								<div className={'mt4'}>
									<CustomButton type="submit" id={'senior-button-margin-4'}>Update</CustomButton>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
			<ToastContainer/>
			</div>
		)
	}
}

const mapStateToProps = createStructuredSelector({
	senior_modal_lead: selectSeniorHandoverLead,
	senior_modal_visibility: selectSeniorHandoverLeadVisibility
})

const mapDispatchToProps = dispatch => ({
	setSeniorModalVisibility: visible => dispatch(setSeniorModalVisibility(visible)),
	reassignHandoverLead: obj => dispatch(reassignHandoverLead(obj))
})

export default connect(mapStateToProps, mapDispatchToProps)(SeniorHandoverModal);