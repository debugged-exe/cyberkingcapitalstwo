import React, {Component} from 'react';
import FormInput from '../FormInput/FormInput.js';
import CustomButton from '../CustomButton/CustomButton.js';
import PuffLoader from "react-spinners/PuffLoader";
import './AdminRegistration.scss';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

class AdminRegistration extends Component {
    componentDidMount() {
        fetch('https://aqueous-mesa-28052.herokuapp.com/admin/register/fetch')
            .then(resp => resp.json())
            .then(response => {
                console.log(response);
                this.setState({
                    srCallerArray: response
                })
            })
    }

    constructor() {
        super();
        this.state = {
            telecaller_name: '',
            telecaller_id: '',
            password: '',
            confirm_password: '',
            preferred_language: '',
            designation: '',
            assigned_to: '',
            srCallerArray: [],
            visible: false
        }
    }

    setVisible = (item) => {
        this.setState({visible: item});
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.setVisible(true);
        const {
            telecaller_name,
            telecaller_id,
            password,
            confirm_password,
            preferred_language,
            designation,
            assigned_to
        } = this.state;
        if (password !== confirm_password) {
            this.setVisible(false);
            this.setState({
                password: '',
                confirm_password: ''
            }, () => {
                toast.error('The two passwords do not match',{
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 4000
                });
            });
            return;
        }
        if (designation === 'junior' && assigned_to === '') {
            this.setVisible(false);
            toast.error("Set Senior Caller",{
                position: toast.POSITION.TOP_CENTER,
                autoClose: 4000
            });
            return;
        }
        fetch('https://aqueous-mesa-28052.herokuapp.com/admin/register', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                telecaller_name: telecaller_name,
                telecaller_id: telecaller_id,
                password: password,
                preferred_language: preferred_language,
                designation: designation,
                assigned_to: assigned_to
            })
        })
            .then(response => response.json())
            .then(resp => {
                if (resp === 'Registered successfully') {
                    this.setVisible(false);
                    toast.success('New Telecaller Added successfully',{
                        position: toast.POSITION.TOP_CENTER,
                        autoClose: 4000
                    });
                    this.setState({
                        telecaller_name: '',
                        telecaller_id: '',
                        password: '',
                        confirm_password: '',
                        preferred_language: '',
                        designation: '',
                        assigned_to: '',
                        srCallerArray: []
                    })
                } else if (resp === 'not found') {
                    this.setVisible(false);
                    toast.error('Senior caller to which caller is assigned does not exist',{
                        position: toast.POSITION.TOP_CENTER,
                        autoClose: 4000
                    });
                } else if (resp === 'Unable to register') {
                    this.setVisible(false);
                    toast.error('Unable to register.Please try again',{
                        position: toast.POSITION.TOP_CENTER,
                        autoClose: 4000
                    });
                }
            })
            .catch(err => {
                this.setVisible(false);
                console.log(err);
                toast.error('Not able to register',{
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 4000
                });
            })
    }

    handleChange = event => {
        const {name, value} = event.target;
        this.setState({[name]: value});
        console.log(value);
    }

    render() {
        const {
            telecaller_name,
            telecaller_id,
            password,
            confirm_password,
            preferred_language,
            designation,
            assigned_to,
            srCallerArray
        } = this.state;
        return (
            <div className={'admin-register-container'}>
                <p className={'admin-register-header b'}>Register new Telecaller</p>
                <form className={'admin-register-form'} onSubmit={this.handleSubmit}>
                    <FormInput
                        type="text"
                        name="telecaller_name"
                        value={telecaller_name}
                        onChange={this.handleChange}
                        label="Telecaller Name"
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
                        <label className={'b f3 mr3'}>Select Preferred Language: </label>
                        <select name="preferred_language" className={'f4 ml1'} onChange={this.handleChange} required>
                            <option value="">--Language--</option>
                            <option value="hindi">Hindi</option>
                            <option value="marathi">Marathi</option>
                        </select>
                    </div>
                    <div className={'flex justify-center items-center center mb4 w-100'}>
                        <label className={'b f3 mr3'}>Select Designation: </label>
                        <select name="designation" className={'f4 ml1'} onChange={this.handleChange} required>
                            <option value="">--Select Designation--</option>
                            <option value="senior">Senior Caller</option>
                            <option value="junior">Junior Caller</option>
                        </select>
                    </div>
                    <div
                        className={`${designation === 'junior' ? 'flex justify-center items-center center mb4 w-100' : 'hidden'}`}>
                        <label className={'b f3 mr3'}>Select Senior Caller: </label>
                        <select
                            name="assigned_to"
                            className={'f4 ml1'}
                            onChange={this.handleChange}
                        >
                            <option value="none">--Select SrCaller--</option>
                            {
                                srCallerArray.filter(item => item.preferred_language === preferred_language).map((item, index) => {
                                    return (
                                        <option key={index}
                                                value={item.telecaller_id}>{item.telecaller_name}({item.telecaller_id})</option>
                                    );
                                })
                            }
                        </select>
                    </div>
                    <CustomButton
                        type='submit'
                        style={{width: '55%'}}
                    >
                        Register Caller
                    </CustomButton>
                </form>
                <div className="puff-loader-register" style={{display: `${this.state.visible?'flex': 'none'}`}}>
                    <PuffLoader loading={true} size={200} color={"red"}/>
                </div>
                <ToastContainer />
            </div>
        );
    }

}

export default AdminRegistration;