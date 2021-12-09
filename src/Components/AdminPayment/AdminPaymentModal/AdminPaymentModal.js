import React,{Component} from 'react';
import * as AiIcons from 'react-icons/ai';
import {ToastContainer,toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


// redux
import { connect } from 'react-redux';
import {setAdminModalVisibility, updatePoints} from '../../../redux/admin-panel/admin-payment/admin.payment.actions.js';

// reselect
import {createStructuredSelector} from 'reselect';
import {selectAdminModalLead, selectAdminModalVisibility} from '../../../redux/admin-panel/admin-payment/admin.payment.selectors.js';
import {selectCurrentUser} from "../../../redux/user/user.selectors";

// components
import FormInput from '../../FormInput/FormInput.js';
import CustomButton from '../../CustomButton/CustomButton.js';
import * as ImIcons from 'react-icons/im';

// css
import './AdminPaymentModal.scss';

const initialState = {
	paying: '10',
	bonus_paying: '10',
	referral_paying: '10'
}

toast.configure();

class AdminPaymentModal extends Component{
	constructor(props){
		super(props);
		this.state = initialState;
	}

	handleSubmit = (event) => {
		event.preventDefault();
		const {name} = event.target;
		const {updatePoints} = this.props;
		if(name==='points')
		{
			const paying = this.state.paying;
			const {points_earned, telecaller_id} = this.props.admin_modal_lead;
			const {currentUser} = this.props;
			if(paying>points_earned)
			{
				toast.warn("points being paid greater than points earned.", {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 4000,
                });
                this.setState(initialState, () => {
                	document.getElementById('points').reset();
                })
                return;
			}
			fetch('https://aqueous-mesa-28052.herokuapp.com/admin/pay',{
	            method: 'post',
	            headers: {'Content-Type': 'application/json'},
	            body: JSON.stringify({
	                amount: paying,
	                telecaller_id: telecaller_id,
	                field: 'points'
	            })
        	})
        	.then(response => response.json())
        	.then(resp => {
        		if(resp==='Success')
        		{
        			toast.success("Points paid Successfully", {
	                    position: toast.POSITION.TOP_CENTER,
	                    autoClose: 2500,
                	});
                	updatePoints({telecaller_id: telecaller_id, amount: paying, name: 'points'});
        		}
        	})
        	.catch(err => {
        		console.log(err);
        		toast.warn("Points payment failed.Please try again.", {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 4000,
                });
        	})
		}
		else if(name==='bonus')
		{
			const paying = this.state.bonus_paying;
			const {points_earned, telecaller_id} = this.props.admin_modal_lead;
			fetch('https://aqueous-mesa-28052.herokuapp.com/admin/pay',{
	            method: 'post',
	            headers: {'Content-Type': 'application/json'},
	            body: JSON.stringify({
	                amount: paying,
	                telecaller_id: telecaller_id,
	                field: 'bonus'
	            })
        	})
        	.then(response => response.json())
        	.then(resp => {
        		if(resp==='Success')
        		{
        			toast.success("Bonus points paid Successfully", {
	                    position: toast.POSITION.TOP_CENTER,
	                    autoClose: 2500,
                	});
                	updatePoints({telecaller_id: telecaller_id, amount: paying, name: 'bonus'});
        		}
        	})
        	.catch(err => {
        		console.log(err);
        		toast.warn("Bonus points payment failed.Please try again.", {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 4000,
                });
        	})
		}
		else if(name==='referral')
		{
			const paying = this.state.referral_paying;
			const {points_earned, telecaller_id} = this.props.admin_modal_lead;
			fetch('https://aqueous-mesa-28052.herokuapp.com/admin/pay',{
	            method: 'post',
	            headers: {'Content-Type': 'application/json'},
	            body: JSON.stringify({
	                amount: paying,
	                telecaller_id: telecaller_id,
	                field: 'referral'
	            })
        	})
        	.then(response => response.json())
        	.then(resp => {
        		if(resp==='Success')
        		{
        			toast.success("Referral points paid Successfully", {
	                    position: toast.POSITION.TOP_CENTER,
	                    autoClose: 2500,
                	});
                	updatePoints({telecaller_id: telecaller_id, amount: paying, name: 'bonus'});
        		}
        	})
        	.catch(err => {
        		console.log(err);
        		toast.warn("Referral points payment failed.Please try again.", {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 4000,
                });
        	})
		}
	}

	handleChange = event => {
		const {name, value} = event.target;
		this.setState({[name]: value});
	}

	render(){
		const {admin_modal_lead, setAdminModalVisibility, admin_modal_visibility} = this.props;
		const {paying, bonus_paying, referral_paying} = this.state;
		return (
			<div className={`${admin_modal_visibility?'visible admin-payment-modal-container':'hidden'}`}>
				<div className="admin-payment-tint"></div>
				<div className="payment-form-container">
					<div className="flex justify-between items-center">
						<h1 className="ml3 admin-payment-modal-header">Payment Portal</h1>
						<AiIcons.AiOutlineClose size={'2rem'} color={'black'} className="mr3" onClick={() => setAdminModalVisibility(false)}/>
					</div>
					<div className="admin-grid-div">
						<div className="flex flex-column justify-center items-center">
							<div className="admin-payment-modal-lead-details">
								<div className="ma2"><label className="f3 b">TeleCaller ID:</label><span className="ma1 f4">{admin_modal_lead.telecaller_id}</span></div>
								<div className="ma2"><label className="f3 b">TeleCaller Name:</label><span className="ma1 f4">{admin_modal_lead.telecaller_name}</span></div>
								<div className="ma2"><label className="f3 b">Designation:</label><span className="ma1 f4">{admin_modal_lead.designation}</span></div>
								<div className="ma2"><label className="f3 b">Points Earned:</label><span className="ma1 f4">{admin_modal_lead.points_earned}</span></div>
								<div className="ma2"><label className="f3 b">Points Paid:</label><span className="ma1 f4">{admin_modal_lead.points_paid}</span></div>
								<div className="ma2"><label className="f3 b">Referral Points Earned:</label><span className="ma1 f4">{admin_modal_lead.referral_points_earned}</span></div>
								<div className="ma2"><label className="f3 b">Referral Points Paid:</label><span className="ma1 f4">{admin_modal_lead.referral_points_paid}</span></div>
							</div>
						</div>
					</div>
					<div className="w-60 admin-payment-modal-form ">
						<div className={'mt2 f3'} style={{marginBottom: "-3%"}}>
							<form name="points" id="points" className={'admin-payment-modal-form-component'} onSubmit={this.handleSubmit}>
								<FormInput
								type="number"
								name="paying"
								value={paying}
								onChange={this.handleChange}
								label="Amount to be Paid"
								step="1"
								min="0"
								required
								/>
								<div className={'mt4'}>
									<CustomButton type="submit" id={'admin-payment-button-margin-1'} onClick={() => {}}>Pay Points</CustomButton>
								</div>
							</form>
						</div>
					</div>
					<div className="w-60 admin-payment-modal-form ">
						<div className={'mt2 f3'} style={{marginBottom: "-3%"}}>
							<form name="bonus" id="bonus" className={'admin-payment-modal-form-component'} onSubmit={this.handleSubmit}>
								<FormInput
								type="number"
								name="bonus_paying"
								value={bonus_paying}
								onChange={this.handleChange}
								label="Bonus(if any) to be Paid"
								step="1"
								min="0"
								required
								/>
								<div className={'mt4'}>
									<CustomButton type="submit" id={'admin-payment-button-margin-2'}>Pay Bonus</CustomButton>
								</div>
							</form>
						</div>
					</div>
					<div className="w-60 admin-payment-modal-form ">
						<div className={'mt2 f3'} style={{marginBottom: "-3%"}}>
							<form name="referral" id="referral" className={'admin-payment-modal-form-component'} onSubmit={this.handleSubmit}>
								<FormInput
								type="number"
								name="referral_paying"
								value={referral_paying}
								onChange={this.handleChange}
								label="Amount to be Paid"
								step="1"
								min="0"
								required
								/>
								<div className={'mt4'}>
									<CustomButton type="submit" id={'admin-payment-button-margin-2'}>Pay Referral Points</CustomButton>
								</div>
							</form>
						</div>
					</div>
				</div>
				<ToastContainer />
			</div>
		);
	}
	
}

const mapStateToProps = createStructuredSelector({
	admin_modal_lead: selectAdminModalLead,
	admin_modal_visibility: selectAdminModalVisibility,
	currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
	setAdminModalVisibility: visible => dispatch(setAdminModalVisibility(visible)),
	updatePoints: obj => dispatch(updatePoints(obj))
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminPaymentModal);