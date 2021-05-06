import React,{Component} from 'react';
import FormInput from '../../Components/FormInput/FormInput.js';
import CustomButton from '../../Components/CustomButton/CustomButton.js';
import './SignIn.scss';

const initialState = {
    name: '',
    password: ''
}

class SignIn extends Component{
    constructor()
    {
        super();
        this.state = initialState;
    }

    handleChange = (event) => {
        const {value, name} = event.target;
        this.setState({[name]: value});
    }

    handleSubmit = (event) =>
    {
        event.prefentDefault();
        console.log(this.state);
        this.setState({name: '', email: '', message: ''});
    }

    render()
    {
        return (
            <div className="signin-container">
                <h1 className="signin-header">SIGN IN</h1>
                <div className="form-container">
                    <form>
                        <FormInput
                            label="Name"
                            name="name"
                            type="text"
                            value={this.state.name}
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
                        <CustomButton type="submit">Sign In</CustomButton>
                    </form>
                </div>
            </div>
        )
    }

}

export default SignIn;