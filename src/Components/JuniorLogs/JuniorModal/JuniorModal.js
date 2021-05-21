import React from 'react';
import * as AiIcons from 'react-icons/ai';
import FormInput from '../../FormInput/FormInput.js';
import CustomButton from '../../CustomButton/CustomButton.js';
import './JuniorModal.scss';

export default class JuniorModal extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			whatsapp_no: '',
			account_opening_no: '',
			status_1: '',
			status_2: ''
		}
	}

	handleSubmit = (event) => {
        event.preventDefault();
        console.log(this.state);
    }

    handleChange = event => {
        const {name, value} = event.target;
        this.setState({[name]: value});
    }

	render() {
		const {whatsapp_no, account_opening_no, status_1, status_2} = this.state;
		const {lead, modal, modalHandler} = this.props;
		return (
			<div className={`${modal?'visible junior-modal':'hidden'}`}>
				<div className="flex justify-between items-center">
					<h1 className="ml3 junior-modal-header">Update Details</h1>
					<AiIcons.AiOutlineClose size={'2rem'} color={'black'} className="mr3" onClick={() => modalHandler(false)}/>
				</div>
				
				<div className="grid-div">
					<div className="flex flex-column justify-center items-center">
						<div className="junior-modal-lead-details">
							<p className="detail-item shadow-4 ma2 pa2">Lead ID: {lead.lead_id}</p>
							<p className="detail-item shadow-4 ma2 pa2">Lead Name: {lead.lead_name}</p>
							<p className="detail-item shadow-4 ma2 pa2">Lead Contact: {lead.lead_contact}</p>
							<p className="detail-item shadow-4 ma2 pa2">City: {lead.city}</p>
							<p className="detail-item shadow-4 ma2 pa2">Preferred Language: {lead.preferred_language}</p>
						</div>
					</div>
					<form onSubmit={this.handleSubmit} className="w-60 junior-modal-form">
						<FormInput
						type="tel"
						name="whatsapp_no"
						value={whatsapp_no}
						onChange={this.handleChange}
						label="WhatsApp No(eg: 9998879999)"
						style={{marginTop: '0px', marginBottom: '0px'}}
						pattern="[0-9]{10}"
						required
						/>
						<FormInput
						type="text"
						name="account_opening_no"
						value={account_opening_no}
						onChange={this.handleChange}
						label="Account Opening No"
						style={{marginTop: '0px', marginBottom: '0px'}}
						required
						/>
						<FormInput
						type="text"
						name="status_1"
						value={status_1}
						onChange={this.handleChange}
						label="Status 1"
						style={{marginTop: '0px', marginBottom: '0px'}}
						required
						/>
						<FormInput
						type="text"
						name="status_2"
						value={status_2}
						onChange={this.handleChange}
						label="Status 2"
						style={{marginTop: '0px', marginBottom: '0px'}}
						required
						/>
						<CustomButton type='submit' style={{marginLeft: '0%'}}>
							Update
						</CustomButton>
					</form>
				</div>
				
				
			</div>
		)
	}
}

	// whatsapp_no: this.props.item.whatsapp_no,
	// 		account_opening_no: this.props.item.account_opening_no,
	// 		status_1: this.props.item.status_1,
	// 		status_2: this.props.item.status_2