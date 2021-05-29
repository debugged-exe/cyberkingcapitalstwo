import React,{Component} from 'react';
import FormInput from '../FormInput/FormInput.js';
import CustomButton from '../CustomButton/CustomButton.js';
import './AdminRegistration.scss';

class AdminRegistration extends Component{
	constructor(){
		super();
		this.state = {
			telecaller_name: '',
			telecaller_id: '',
			password: '',
			confirm_password: '',
			language: '',
			designation: '',
			assigned_to: '',
			srCallerArray: [
				{
					telecaller_id: 'SR001',
					telecaller_name: 'Tejas'
				},
				{
					telecaller_id: 'SR002',
					telecaller_name: 'Soham'
				}
			]
		}
	}

	handleSubmit = (event) => {
		event.preventDefault();
	}

	handleChange = event => {
		const {name, value} = event.target;

		this.setState({[name]: value});
	}

	render(){
		const {telecaller_name, telecaller_id, password, confirm_password, language, designation, assigned_to, srCallerArray} = this.state;
		return (
		<div className={'admin-register-container'}>
			<p className={'admin-register-header b'}>Register new Telecaller</p>
			<form className={'admin-register-form'} onSubmit = {this.handleSubmit}>
				<FormInput
				type="text"
				name="telecaller_name"
				value={telecaller_name}
				onChange={this.handleChange}
				label="UserName"
				style={{marginTop: '0px', marginBottom: '0px'}}
				required
				/>
				<FormInput
				type="text"
				name="telecaller_id"
				value={telecaller_id}
				onChange={this.handleChange}
				label="Telecaller ID"
				style={{marginTop: '0px', marginBottom: '0px'}}
				required
				/>
				<FormInput
				type="password"
				name="password"
				value={password}
				onChange={this.handleChange}
				label="Password"
				style={{marginTop: '0px', marginBottom: '0px'}}
				required
				/>
				<FormInput
				type="password"
				name="confirm_password"
				value={confirm_password}
				onChange={this.handleChange}
				label="Confirm Password"
				style={{marginTop: '0px', marginBottom: '0px'}}
				required
				/>
				<div className={'flex justify-center items-center center mb4 w-100'}>
					<label className={'b f3 mr3'}>Select Language: </label>
					<select name="language" className={'f4 ml1'} onChange={this.handleChange}>
						<option value="hindi">Hindi</option>
						<option value="marathi">Marathi</option>
					</select>
				</div>
				<div className={'flex justify-center items-center center mb4 w-100'}>
					<label className={'b f3 mr3'}>Select Designation: </label>
					<select name="designation" className={'f4 ml1'} onChange={this.handleChange}>
						<option value="SrCaller">SrCaller</option>
						<option value="JrCaller">JrCaller</option>
					</select>
				</div>
				<div className={`${designation==='JrCaller'?'flex justify-center items-center center mb4 w-100':'hidden'}`}>
					<label className={'b f3 mr3'}>Select Senior Caller: </label>
					<select 
					name="assigned_to" 
					className={'f4 ml1'} 
					onChange={this.handleChange}
					>
						<option value="none">--Select SrCaller--</option>
						{
							srCallerArray.map((item,index) => {
								return(
									<option value={item.telecaller_id}>{item.telecaller_name}({item.telecaller_id})</option>
								);
							})
						}
					</select>
				</div>
				<CustomButton 
				type='submit'
				style={{ width:'55%'}}
				>
				Register Caller
				</CustomButton>
			</form>
		</div>
	);
	}
	
}

export default AdminRegistration;