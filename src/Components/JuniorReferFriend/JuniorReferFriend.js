import React, {Component} from "react";

import FormInput from "../FormInput/FormInput";
import CustomButton from "../CustomButton/CustomButton";
import PuffLoader from "react-spinners/PuffLoader";
import {ToastContainer, toast} from "react-toastify";

// redux
import {connect} from 'react-redux';

//reselect
import {createStructuredSelector} from "reselect";
import {selectCurrentUser} from "../../redux/user/user.selectors";

// css
import './JuniorReferFriend.scss';
import 'react-toastify/dist/ReactToastify.css';

class JuniorReferFriend extends Component{
    constructor(props) {
        super(props);
        this.state = {
            lead_name: '',
            lead_contact: '',
            city: '',
            course_type: 'basic',
            prior_knowledge: '',
            preferred_language: '',
            visible: false,
            assigned_to: this.props.currentUser.telecaller_id
        }
    }

    setVisible = (item) => {
        this.setState({visible: item});
    }

    handleSubmit = (event) => {
        event.preventDefault();
        // this.setVisible(true);
        // const {
        //     lead_name,
        //     lead_contact, 
        //     city, 
        //     prior_knowledge, 
        //     preferred_language, 
        //     course_type, 
        //     assigned_to
        // } = this.state;
        // fetch('https://aqueous-mesa-28052.herokuapp.com/basicform', {
        //     method: 'post',
        //     headers: {'Content-Type': 'application/json'},
        //     body: JSON.stringify({
        //         lead_name: lead_name,
        //         lead_contact: lead_contact,
        //         city: city,
        //         preferred_language: preferred_language,
        //         prior_knowledge: prior_knowledge,
        //         course_type: course_type,
        //         assigned_to: assigned_to
        //     })
        // })
        // .then(response => response.json())
        // .then(response => {
        //     if(response === "Basic Course Form Registered"){
        //         this.setVisible(false);
        //         toast.success('Registered Successfully.',{
        //             position: toast.POSITION.TOP_CENTER,
        //             autoClose: 2500
        //         })
        //         this.setState({
        //             lead_name: '',
        //             lead_contact: '',
        //             city: '',
        //             preferred_language: '',
        //             prior_knowledge: '',
        //             course_type: 'basic'
        //         })
        //     }else if(response === "Failed"){
        //         this.setVisible(false);
        //         toast.error("Failed to register for the course. Please try again",{
        //             position: toast.POSITION.TOP_CENTER,
        //             autoClose: 2500
        //         });
        //     }else if(response === "Not Unique"){
        //         this.setVisible(false);
        //         toast.error("Contact has been already registered.Please try with new contact",{
        //             position: toast.POSITION.TOP_CENTER,
        //             autoClose: 2500
        //         });
        //     }
        // })
        // .catch(err => {
        //     console.log(err);
        //     this.setVisible(false);
        //     toast.error(`${err}`,{
        //         position: toast.POSITION.TOP_CENTER,
        //         autoClose: 2500
        //     });
        // })
    }

    handleChange = event => {
        const {name, value} = event.target;
        this.setState({[name]: value});
    }
    render(){
        const {lead_name, lead_contact, city, course_type, prior_knowledge, preferred_language} = this.state;
        return(
            <div className={'basic-course-form-container white'}>
                <p className={'basic-course-form-header b'}>Basic Course Application Form</p>
                <form className={'basic-course-form-box'} onSubmit = {this.handleSubmit}>
                    <FormInput
                        autofocus='autofocus'
                        type="text"
                        name="lead_name"
                        value={lead_name}
                        onChange={this.handleChange}
                        label="Account Opening Name"
                        style={{marginTop: '0px', marginBottom: '0px'}}
                        required
                    />
                    <FormInput
                        type="tel"
                        name="lead_contact"
                        value={lead_contact}
                        onChange={this.handleChange}
                        label="Account Opening Phone Number(eg: 9998879999)"
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
                    <div className={'basic-course-select-input mb4'}>
                        <label className={'b f3 mr3'}> Do you have any prior knowledge of Stock-market? </label>
                        <select name="prior_knowledge" className={'f4 ml1'} value={prior_knowledge} onChange={this.handleChange} required>
                            <option value={''}>--select--</option>
                            <option value="yes">yes</option>
                            <option value="no">no</option>
                        </select>
                    </div>
                    <div className={'basic-course-select-input mb4 '}>
                        <label className={'b f3 mr3'}>Which language do you prefer for Attending Trading Sessions? </label>
                        <select name="preferred_language" className={'f4 ml1'} value={preferred_language} onChange={this.handleChange} required>
                            <option value={''}>--select--</option>
                            <option value="hindi">Hindi</option>
                            <option value="marathi">Marathi</option>
                        </select>
                    </div>
                    <CustomButton
                        type='submit'
                        style={{ background:"white", color:"black", fontSize:"1.2em ", fontWeight:"bold" }}
                    >
                        Submit
                    </CustomButton>
                </form>
                <div className="puff-loader" style={{display: `${this.state.visible?'flex': 'none'}`}}>
                    <PuffLoader loading={true} size={200} color={"red"}/>
                </div>
                <ToastContainer/>
            </div>
            );
    }
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser
})

export default connect(mapStateToProps)(JuniorReferFriend);