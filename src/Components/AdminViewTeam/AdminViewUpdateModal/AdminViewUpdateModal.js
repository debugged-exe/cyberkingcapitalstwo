import React from 'react';
import {ToastContainer,toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//components
import * as AiIcons from 'react-icons/ai';
import FormInput from '../../FormInput/FormInput.js';
import CustomButton from '../../CustomButton/CustomButton.js';

//css
import './AdminViewUpdateModal.scss';

//redux
import {connect} from 'react-redux';
import {
	setUpdateModalLead,
	setUpdateModalVisibility,
	reassignJrLogArray
} from "../../../redux/admin-panel/admin-overview/admin.overview.actions";

//reselect
import {createStructuredSelector} from "reselect";
import {selectUpdateModalLead, selectUpdateModalVisibility} from "../../../redux/admin-panel/admin-overview/admin.overview.selectors";

const initialState = {
	lead_whatsapp_no: '',
	account_opening_no: '',
	status_1: '',
	status_2: '',
	account_opening_name: ''
}

toast.configure();

class JuniorModal extends React.Component {
	constructor(props){
		super(props);
		this.state = initialState;
	}

	handleSubmit = (event) => {
        event.preventDefault();
        const {name} = event.target;
        let payload = this.state.[name];
        const {lead_id} = this.props.update_modal_lead;
        const {reassignJrLogArray} = this.props;
        fetch('https://aqueous-mesa-28052.herokuapp.com/junior/update', {
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
        		reassignJrLogArray(resp[0]);
        		toast.success(`${name} updated successfully`, {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 2500,
                });
	        	this.setState(initialState, () => {
	        		// console.log('')
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

		const {lead_whatsapp_no, account_opening_no, status_1, status_2, account_opening_name} = this.state;
		const {update_modal_lead,update_modal_visibility,setUpdateModalVisibility,setUpdateModalLead} = this.props;
		return (
			<div className={`${update_modal_visibility?'visible admin-modal-container':'hidden'}`}>
				<div className="admin-tint"></div>
				<div className='admin-modal'>
				<div className="flex justify-between items-center">
					<h1 className="ml3 admin-modal-header">Update Details</h1>
					<AiIcons.AiOutlineClose size={'2rem'} color={'black'} className="mr3" onClick={() => {setUpdateModalLead({})}}/>
				</div>
				
				<div className="admin-grid-div">
					<div className="flex flex-column justify-center items-center">
						<div className="admin-modal-lead-details">
							<p className="admin-detail-item shadow-4 ma2 pa2">Lead ID: {update_modal_lead.lead_id}</p>
							<p className="admin-detail-item shadow-4 ma2 pa2">Lead Name: {update_modal_lead.lead_name}</p>
							<p className="admin-detail-item shadow-4 ma2 pa2">Lead Contact: {update_modal_lead.lead_phone_no}</p>
						</div>
					</div>
					<div className="w-60 admin-modal-form ">
						<div className={'mt2 f3'} style={{marginBottom: "-3%"}}>
							<label >
								Current Value: {update_modal_lead.lead_whatsapp_no}
							</label>
							<form name="lead_whatsapp_no" className={'admin-modal-form-component'} onSubmit={this.handleSubmit}>
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
									<CustomButton type="submit" id={'admin-button-margin-1'}>Update</CustomButton>
								</div>
							</form>
						</div>
						<div className={'mt2 f3'}>
							<label>Current Value: {update_modal_lead.account_opening_no}</label>
							<form name="account_opening_no" className={'admin-modal-form-component'} onSubmit={this.handleSubmit}>
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
									<CustomButton type="submit" id={'admin-button-margin-2'}>Update</CustomButton>
								</div>
							</form>
						</div>
						<div className={'mt2 f3'} style={{marginBottom: "-3%"}}>
							<label >
								Current Value: {update_modal_lead.account_opening_name}
							</label>
							<form name="account_opening_name" className={'admin-modal-form-component'} onSubmit={this.handleSubmit}>
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
									<CustomButton type="submit" id={'admin-button-margin-3'}>Update</CustomButton>
								</div>
							</form>
						</div>
						<div className={'mt2 f3'}>
							<label>Current Status 1: {update_modal_lead.status_1}</label>
							<form name="status_1" className={'admin-modal-form-component'} onSubmit={this.handleSubmit}>
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
									<CustomButton type="submit" id={'admin-button-margin-4'}>Update</CustomButton>
								</div>
							</form>
						</div>
						<div className={'mt2 f3'}>
							<label>Current Status 2: {update_modal_lead.status_2}</label>
							<form name="status_2" className={'admin-modal-form-component'} onSubmit={this.handleSubmit}>
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
									<CustomButton type="submit" id={'admin-button-margin-5'}>Update</CustomButton>
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
	update_modal_lead: selectUpdateModalLead,
	update_modal_visibility: selectUpdateModalVisibility
})

const mapDispatchToProps = dispatch => ({
	setUpdateModalVisibility: visible => dispatch(setUpdateModalVisibility(visible)),
	setUpdateModalLead: obj => dispatch(setUpdateModalLead(obj)),
	reassignJrLogArray: lead => dispatch(reassignJrLogArray(lead))
})

export default connect(mapStateToProps, mapDispatchToProps)(JuniorModal);