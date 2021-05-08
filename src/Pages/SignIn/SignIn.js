import React, {Component, useState} from 'react';
import FormInput from '../../Components/FormInput/FormInput.js';
import CustomButton from '../../Components/CustomButton/CustomButton.js';
import './SignIn.scss';
const initialState = {
    username: '',
    password: ''
}

class SignIn extends Component{
    constructor(props)
    {
        super(props);
        this.state = initialState;
    }

    handleChange = (event) => {
        const {value, name} = event.target;
        this.setState({[name]: value});
    }

    handleSubmit = () =>
    {
        this.props.setUser(this.state.username, this.state.password);
        this.setState({username: '', password: ''});
    }

    render() {
        return (
            <div className="signin-container">
                <h1 className="signin-header">SIGN IN</h1>
                <div className="form-container">
                    <form>
                        <FormInput
                            label="UserName"
                            name="username"
                            type="text"
                            value={this.state.username}
                            handleChange={this.handleChange}
                            required
                        />
                        <FormInput
                            label="Password"
                            name="password"
                            type="password"
                            value={this.state.password}
                            handleChange={this.handleChange}
                            required
                        />
                        <CustomButton onClick={() => this.handleSubmit()}>Sign In</CustomButton>
                    </form>
                </div>
            </div>
        )
    }
}

export default SignIn;