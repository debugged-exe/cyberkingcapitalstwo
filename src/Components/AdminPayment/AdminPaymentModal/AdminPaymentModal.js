import React,{Component} from 'react';
import FormInput from '../../FormInput/FormInput.js';
import CustomButton from '../../CustomButton/CustomButton.js';
import * as ImIcons from 'react-icons/im';
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
		const {visible, toggleModalVisibility, modalInfo} = this.props;
		const {paying, bonus_paying} = this.state;
		return (
			<div className={`${visible?'visible admin-payment-modal-container':'hidden'}`}>
				<div className="form-container">
					<p className="form-header b">Payment Portal</p>
					<div className="telecaller-info">
						<div className="ma2"><label className="f3 b">TeleCaller ID:</label><span className="ma1 f4">{modalInfo.telecaller_id}</span></div>
						<div className="ma2"><label className="f3 b">TeleCaller Name:</label><span className="ma1 f4">{modalInfo.telecaller_name}</span></div>
						<div className="ma2"><label className="f3 b">Designation:</label><span className="ma1 f4">{modalInfo.designation}</span></div>
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
						onClick={() => toggleModalVisibility(false)}
						style={{ marginLeft:'0%'}}
						>Cancel</CustomButton>
					</form>
				</div>
			</div>
		);
	}
	
}

export default AdminPaymentModal;