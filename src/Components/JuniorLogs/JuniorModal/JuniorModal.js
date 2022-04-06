import React from 'react';
import {ToastContainer,toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FiPhoneCall } from 'react-icons/fi';
import { IoLogoWhatsapp } from 'react-icons/io';

//components
import * as AiIcons from 'react-icons/ai';
import FormInput from '../../FormInput/FormInput.js';
import CustomButton from '../../CustomButton/CustomButton.js';

//css
import './JuniorModal.scss';

//redux
import {connect} from 'react-redux';
import {
	setModalLead,
	setModalVisibility,
	reassignLead
} from "../../../redux/junior-panel/junior-logs/junior.logs.actions";

//reselect
import {createStructuredSelector} from "reselect";
import {selectJuniorModalLead, selectJuniorModalVisibility} from "../../../redux/junior-panel/junior-logs/junior.logs.selectors";

const initialState = {
	lead_whatsapp_no: '',
	account_opening_no: '',
	status_1: '',
	status_2: '',
	account_opening_name: '',
	broker_name:''
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
        let payload = this.state[name];
        const {lead_id} = this.props.modal_lead;
        const {reassignLead} = this.props;



		if(name==="account_opening_no"){
			if(payload.length != 10){
				toast.warn("Account Opening Number should be 10 digits", {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 1500,
                });
				return
			}

		}
		if(name==="lead_whatsapp_no"){
			if(payload.length != 10){
				toast.warn("Whatsapp number should be 10 digits", {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 1500,
                });
				return
			}

		}


        fetch('https://aqueous-mesa-28052.herokuapp.com/junior/update', {
        	method: 'post',
        	headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
            	field: name,
            	payload: payload,
            	lead_id: lead_id,

            })
        })
        .then(response => response.json())
        .then(resp => {
        	if(resp[0].lead_id)
        	{
        		reassignLead(resp[0]);
        		toast.success(`${name} updated successfully`, {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 1500,
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
                    autoClose: 1500,
                });
        })
    }

    handleCheck = (event) => {
    	const {name, checked} = event.target
    	const {lead_phone_no} = this.props.modal_lead
    	switch(name){
    		case 'lead_whatsapp_no_check':
    			if(checked){
    				this.setState({lead_whatsapp_no: lead_phone_no})
    				return;
    			}
    			else
    			{
    				this.setState({lead_whatsapp_no: ''})
    				return;
    			}
			break;
			case 'account_opening_no_check':
    			if(checked){
    				this.setState({account_opening_no: lead_phone_no})
    				return;
    			}
    			else
    			{
    				this.setState({account_opening_no: ''})
    				return;
    			}
			break;
			default: return;
    	}
    }

    handleChange = event => {
        const {name, value} = event.target;
        this.setState({[name]: value});

    }


	render() {

		const {lead_whatsapp_no, account_opening_no, status_1, status_2, account_opening_name,broker_name} = this.state;
		const {modal_lead,modal_visibility,setModalVisibility} = this.props;
		return (
			<div className={`${modal_visibility?'visible junior-modal-container':'hidden'}`}>
				<div className="junior-tint"></div>
				<div className='junior-modal'>
				<div className="flex justify-between items-center">
					<h1 className="ml3 junior-modal-header">Update Details</h1>
					<AiIcons.AiOutlineClose size={'2rem'} color={'black'} className="mr3" onClick={() => {setModalVisibility(false)}}/>
				</div>

				<div className="grid-div">
					<div className="flex flex-column justify-center items-center">
						<div className="junior-modal-lead-details">
							<p className="detail-item shadow-4 ma2 pa2">Lead ID: {modal_lead.lead_id}</p>
							<p className="detail-item shadow-4 ma2 pa2">Lead Name: {modal_lead.lead_name}</p>
							<p className="detail-item shadow-4 ma2 pa2">Lead Contact: {modal_lead.lead_phone_no}</p>
							<p className="detail-item shadow-4 ma2 pa2">City: {modal_lead.lead_city}</p>
							<p className="detail-item shadow-4 ma2 pa2">Preferred Language: {modal_lead.preferred_language}</p>
						
						<a className="detail-item shadow-4 ma2 pa2 bg-blue white no-underline" href={`tel:+91${modal_lead.lead_phone_no}`}> Call Now <FiPhoneCall className="ml3"  size="1.6rem"/></a>
					<a className="detail-item shadow-4 ma2 pa2 black no-underline" href={`https://wa.me/${modal_lead.lead_whatsapp_no}`}>Chat Now <IoLogoWhatsapp  className="ml3" size="1.8rem" color="green"/></a>
						</div>
					</div>
					<div className="w-60 junior-modal-form ">
						<div className={'mt2 f3'} style={{marginBottom: "-3%"}}>
							<label >
								Current Value: {modal_lead.lead_whatsapp_no}
							</label>
							<form name="lead_whatsapp_no" className={'junior-modal-form-component'} onSubmit={this.handleSubmit}>
								<span className="flex flex-column justify-center items-center">
									<FormInput
										type="text"
										name="lead_whatsapp_no"
										value={lead_whatsapp_no}
										onChange={this.handleChange}
										label="Whatsapp Number"
										style = {{marginTop: '0px', marginBottom: '-50px'}}
										required
									/>
									<span className="flex justify-center items-center pa0 ma0">
										<input
											type="checkbox"
											name="lead_whatsapp_no_check"
											value=""
											onClick = {this.handleCheck}
										/>
										<p className="f4 ph2">Same as Lead Contact No</p>
									</span>
								</span>
								<div className={'mt4'}>
									<CustomButton type="submit" id={'button-margin-1'}>Update</CustomButton>
								</div>
							</form>
						</div>
						<div className={'mt2 f3'}>
							<label>Current Value: {modal_lead.account_opening_no}</label>
							<form name="account_opening_no" className={'junior-modal-form-component'} onSubmit={this.handleSubmit}>
								<span className="flex flex-column justify-center items-center">
									<FormInput
										type="text"
										name="account_opening_no"
										value={account_opening_no}
										onChange={this.handleChange}
										label="Account Opening No"
										style={{marginTop: '0px', marginBottom: '-50px'}}
										required
									/>
									<span className="flex justify-center items-center pa0 ma0">
										<input
											type="checkbox"
											name="account_opening_no_check"
											value=""
											onClick = {this.handleCheck}
										/>
										<p className="f4 ph2">Same as Lead Contact No</p>
									</span>
								</span>

								<div className={'mt4'}>
									<CustomButton type="submit" id={'button-margin-2'}>Update</CustomButton>
								</div>
							</form>
						</div>
						<div className={'mt2 f3'} style={{marginBottom: "-3%"}}>
							<label >
								Current Value: {modal_lead.account_opening_name}
							</label>
							<form name="account_opening_name" className={'junior-modal-form-component'} onSubmit={this.handleSubmit}>
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
									<CustomButton type="submit" id={'button-margin-1'}>Update</CustomButton>
								</div>
							</form>
						</div>
						<div className={'mt2 f3'}>
							<label>Current Status 1: {modal_lead.status_1}</label>
							<form name="status_1" className={'junior-modal-form-component'} onSubmit={this.handleSubmit}>
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
									<CustomButton type="submit" id={'button-margin-3'}>Update</CustomButton>
								</div>
							</form>
						</div>
						<div className={'mt2 f3'}>
							<label>Current Status 2: {modal_lead.status_2}</label>
							<form name="status_2" className={'junior-modal-form-component'} onSubmit={this.handleSubmit}>
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
									<CustomButton type="submit" id={'button-margin-4'}>Update</CustomButton>
								</div>
							</form>
						</div>
						<div className={'mt2 f3 flex justify-center'} >
							<label>Broker Name: {modal_lead.broker}</label>
							<form  name="broker_name"  onSubmit={this.handleSubmit}  >
								<select type="text" name="broker_name"  className={"f4 ml1 "} onChange={this.handleChange}  >
									<option  value={'not selected'} >--select--</option>
									<option  value={'Angel Broking'} >Angel Broking</option>
									<option  value={'Zerodha'}>Zerodha</option>
									<option  value={'Upstox'}>Upstox</option>
									<option  value={'Paid'}>Paid</option>
								</select>
								<div className={'mt4'}>
										<CustomButton type="submit" id={'button-margin-3'}>Update </CustomButton>
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
	modal_lead: selectJuniorModalLead,
	modal_visibility: selectJuniorModalVisibility
})

const mapDispatchToProps = dispatch => ({
	setModalVisibility: visible => dispatch(setModalVisibility(visible)),
	reassignLead: obj => dispatch(reassignLead(obj))
})

export default connect(mapStateToProps, mapDispatchToProps)(JuniorModal);
