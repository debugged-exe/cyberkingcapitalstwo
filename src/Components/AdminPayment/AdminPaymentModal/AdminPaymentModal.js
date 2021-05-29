import React,{Component} from 'react';

// redux
import { connect } from 'react-redux';
import {setAdminModalVisibility} from '../../../redux/admin-panel/admin-payment/admin.payment.actions.js';

// reselect
import {createStructuredSelector} from 'reselect';
import {selectAdminModalLead, selectAdminModalVisibility} from '../../../redux/admin-panel/admin-payment/admin.payment.selectors.js';

// components
import FormInput from '../../FormInput/FormInput.js';
import CustomButton from '../../CustomButton/CustomButton.js';
import * as ImIcons from 'react-icons/im';

// css
import './AdminPaymentModal.scss';

class AdminPaymentModal extends Component{
	constructor(props){
		super(props);
		this.state = {
			paying: '',
			bonus_paying: ''
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

	render(){
		const {admin_modal_lead, setAdminModalVisibility, admin_modal_visibility} = this.props;
		const {paying, bonus_paying} = this.state;
		return (
			<div className={`${admin_modal_visibility?'visible admin-payment-modal-container':'hidden'}`}>
				<div className="payment-form-container">
					<p className="form-header b">Payment Portal</p>
					<div className="telecaller-info">
						<div className="ma2"><label className="f3 b">TeleCaller ID:</label><span className="ma1 f4">{admin_modal_lead.telecaller_id}</span></div>
						<div className="ma2"><label className="f3 b">TeleCaller Name:</label><span className="ma1 f4">{admin_modal_lead.telecaller_name}</span></div>
						<div className="ma2"><label className="f3 b">Designation:</label><span className="ma1 f4">{admin_modal_lead.designation}</span></div>
					</div>
					<form onSubmit={this.handleSubmit}>
						<FormInput
						type="text"
						name="paying"
						value={paying}
						onChange={this.handleChange}
						label="Amount to be Paid"
						required
						/>
						<FormInput
						type="text"
						name="bonus_paying"
						value={bonus_paying}
						onChange={this.handleChange}
						label="Bonus(if any) to be Paid"
						required
						/>
						<CustomButton
						type='submit'
						style={{ marginLeft:'0%'}}
						>Confirm Payment</CustomButton>
						<CustomButton
						onClick={() => setAdminModalVisibility(false)}
						style={{ marginLeft:'0%'}}
						>Cancel</CustomButton>
					</form>
				</div>
			</div>
		);
	}
	
}

const mapStateToProps = createStructuredSelector({
	admin_modal_lead: selectAdminModalLead,
	admin_modal_visibility: selectAdminModalVisibility
});

const mapDispatchToProps = dispatch => ({
	setAdminModalVisibility: visible => dispatch(setAdminModalVisibility(visible))
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminPaymentModal);