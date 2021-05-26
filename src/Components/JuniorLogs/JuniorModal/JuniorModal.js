import React from 'react';
import * as AiIcons from 'react-icons/ai';
import FormInput from '../../FormInput/FormInput.js';
import CustomButton from '../../CustomButton/CustomButton.js';
import './JuniorModal.scss';
import {connect} from 'react-redux';
import {
	setModalLead,
	setModalVisibility
} from "../../../redux/junior-panel/junior-logs/junior.logs.actions";
class JuniorModal extends React.Component {
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
		const {modal_lead,modal_visibility,setModalVisibility} = this.props;
		return (
			<div className={`${modal_visibility?'visible junior-modal':'hidden'}`}>
				<div className="flex justify-between items-center">
					<h1 className="ml3 junior-modal-header">Update Details</h1>
					<AiIcons.AiOutlineClose size={'2rem'} color={'black'} className="mr3" onClick={() => {setModalVisibility(false)}}/>
				</div>
				
				<div className="grid-div">
					<div className="flex flex-column justify-center items-center">
						<div className="junior-modal-lead-details">
							<p className="detail-item shadow-4 ma2 pa2">Lead ID: {modal_lead.lead_id}</p>
							<p className="detail-item shadow-4 ma2 pa2">Lead Name: {modal_lead.lead_name}</p>
							<p className="detail-item shadow-4 ma2 pa2">Lead Contact: {modal_lead.lead_contact}</p>
							<p className="detail-item shadow-4 ma2 pa2">City: {modal_lead.city}</p>
							<p className="detail-item shadow-4 ma2 pa2">Preferred Language: {modal_lead.preferred_language}</p>
						</div>
					</div>
					<div className="w-60 junior-modal-form ">
						<div className={'mt2 f3'} style={{marginBottom: "-3%"}}>
							<label >
								Current Value: {modal_lead.whatsapp_no}
							</label>
							<div className={'junior-modal-form-component'}>
								<FormInput
									type="text"
									name="Whatsapp_no"
									value={account_opening_no}
									onChange={this.handleChange}
									label="Whatsapp Number"
									style = {{marginTop: '0px', marginBottom: '0px'}}
									required
								/>
								<div className={'mt4'}>
									<CustomButton id={'button-margin-1'}>Update</CustomButton>
								</div>
							</div>
						</div>
						<div className={'mt2 f3'}>
							<label>Current Value: {modal_lead.account_opening_no}</label>
							<div className={'junior-modal-form-component'}>
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
									<CustomButton id={'button-margin-2'}>Update</CustomButton>
								</div>
							</div>
						</div>
						<div className={'mt2 f3'}>
							<label>Current Status 1: {modal_lead.status_1}</label>
							<div className={'junior-modal-form-component'}>
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
									<CustomButton id={'button-margin-3'}>Update</CustomButton>
								</div>
							</div>
						</div>
						<div className={'mt2 f3'}>
							<label>Current Status 2: {modal_lead.status_2}</label>
							<div className={'junior-modal-form-component'}>
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
									<CustomButton id={'button-margin-4'}>Update</CustomButton>
								</div>
							</div>
						</div>
					</div>
				</div>
				
				
			</div>
		)
	}
}

const mapStateToProps = ({junior_panel: {junior_logs}}) => ({
	modal_lead: junior_logs.modal_lead,
	modal_visibility: junior_logs.modal_visibility
})
const mapDispatchToProps = dispatch => ({
	setModalVisibility: visible => dispatch(setModalVisibility(visible))
})
export default connect(mapStateToProps, mapDispatchToProps)(JuniorModal);


	// whatsapp_no: this.props.item.whatsapp_no,
	// 		account_opening_no: this.props.item.account_opening_no,
	// 		status_1: this.props.item.status_1,
	// 		status_2: this.props.item.status_2