import React, {Component} from "react";
import './ProCourseForm.scss';
import FormInput from "../FormInput/FormInput";
import CustomButton from "../CustomButton/CustomButton";

class ProCourseForm extends Component{
    constructor() {
        super();
        this.state = {
            lead_name: '',
            lead_contact: '',
            city: '',
            course_type: 'pro',
            prior_knowledge: '',
            preferred_language: ''
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
        const {lead_name, lead_contact, city, course_type, prior_knowledge, preferred_language} = this.state;
        return(
            <div className={'pro-course-form-container'}>
                <p className={'pro-course-form-header b'}>Pro Course Application Form</p>
                <form className={'pro-course-form-box'} onSubmit = {this.handleSubmit}>
                    <FormInput
                        type="text"
                        name="lead_name"
                        value={lead_name}
                        onChange={this.handleChange}
                        label="Enter your Name"
                        style={{marginTop: '0px', marginBottom: '0px'}}
                        required
                    />
                    <FormInput
                        type="tel"
                        name="lead_contact"
                        value={lead_contact}
                        onChange={this.handleChange}
                        label="Phone Number(eg: 9998879999)"
                        style={{marginTop: '0px', marginBottom: '0px'}}
                        pattern="[0-9]{10}"
                        required
                    />
                    <FormInput
                        type="text"
                        name="city"
                        value={city}
                        onChange={this.handleChange}
                        label="Enter City name"
                        style={{marginTop: '0px', marginBottom: '0px'}}
                        required
                    />
                    <div className={'pro-course-select-input mb4'}>
                        <label className={'b f3 mr3'}> Do you have any prior knowledge of Stock-market? </label>
                        <select name="prior_knowledge" className={'f4 ml1'} onChange={this.handleChange}>
                            <option value={''}>--select--</option>
                            <option value="yes">yes</option>
                            <option value="no">no</option>
                        </select>
                    </div>
                    <div className={'pro-course-select-input mb4 '}>
                        <label className={'b f3 mr3'}>Which language do you prefer for Attending Trading Sessions? </label>
                        <select name="preferred_language" className={'f4 ml1'} onChange={this.handleChange}>
                            <option value={''}>--select--</option>
                            <option value="hindi">Hindi</option>
                            <option value="marathi">Marathi</option>
                        </select>
                    </div>
                    <CustomButton
                        type='submit'
                        style={{ }}
                    >
                        Submit
                    </CustomButton>
                </form>
            </div>
        );
    }
}

export default ProCourseForm;