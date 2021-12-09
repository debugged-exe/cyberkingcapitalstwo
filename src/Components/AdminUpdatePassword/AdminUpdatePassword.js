import React, {Component} from 'react';
import FormInput from "../FormInput/FormInput";
import CustomButton from "../CustomButton/CustomButton";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import './AdminUpdatePassword.scss';

class AdminUpdatePassword extends Component {
    constructor() {
        super();
        this.state = {
            telecaller_id: '',
            new_password: '',
            designation: '',
            confirm_password: '',
            dataCallers: []
        }
    }

    componentDidMount() {
        fetch('https://aqueous-mesa-28052.herokuapp.com/admin/fetch_all_telecallers')
            .then(resp => resp.json())
            .then(response => {
                this.setState({
                    dataCallers: response
                })
            })
            .catch(err => {
                console.log(err);
                toast.warn('Callers fetch failed.Please refresh', {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 4000
                });
            })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const {
            telecaller_id,
            new_password,
            confirm_password,
        } = this.state;
        if (new_password !== confirm_password) {
            this.setState({
                new_password: '',
                confirm_password: ''
            }, () => {
                toast.warn('The two passwords do not match', {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 4000
                });
            });
            return;
        }
        fetch('https://aqueous-mesa-28052.herokuapp.com/admin/update_password', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                telecaller_id: telecaller_id,
                password: confirm_password
            })
        })
            .then(response => response.json())
            .then(resp => {
                if (resp === "Success") {
                    this.setState({
                        new_password: '',
                        confirm_password: ''
                    });
                    toast.success("Password Update Successful", {
                        autoClose: 2500,
                        position: toast.POSITION.TOP_CENTER
                    });
                }
            })
            .catch(err => {
                console.log(err);
                toast.warn("Failed. Try Again", {
                    autoClose: 2500,
                    position: toast.POSITION.TOP_CENTER
                });

            });
        document.getElementById('admin-update-form').reset();
    }

    handleChange = event => {
        const {name, value} = event.target;
        this.setState({[name]: value});
    }

    render() {
        const {
            telecaller_id,
            new_password,
            confirm_password,
            designation,
            dataCallers
        } = this.state;
        return (
            <div className={'admin-update-container'}>
                <p className={'f2 flex justify-center b tc'}>Update Password Of Telecaller</p>
                <form className={'w-50-l w-50-m w-50-ns w-80 center '} id={'admin-update-form'}
                      onSubmit={this.handleSubmit}>
                    <div className={'center flex flex-wrap justify-center items-center pb3'}>
                        <label className={'b f3 mr3'}>Select Designation of Caller: </label>
                        <select
                            name="designation"
                            className={'f4 ml1 margin-handler-1'}
                            onChange={this.handleChange}
                            required
                        >
                            <option value="none">--Select Telecaller--</option>
                            <option value={"senior"}>Senior Telecaller</option>
                            <option value={"junior"}>Junior Telecaller</option>
                        </select>
                    </div>
                    <div className={'center flex flex-wrap justify-center items-center'}>
                        <label className={'b f3 mr3'}>Search for Telecaller: </label>
                        <input type={"text"} className={'margin-handler-2 f4'} name={"telecaller_id"}
                               onChange={this.handleChange} list={'callers'}
                               required placeholder={'Enter Telecaller Id'}/>
                        <datalist id={'callers'}>
                            {
                                dataCallers.filter(item => item.designation === designation).map((item, index) => {
                                    return (
                                        <option key={index}>{item.telecaller_id}</option>
                                    );
                                })
                            }
                        </datalist>
                    </div>
                    <div className={'w-50 center form-input-handler'}>
                        <FormInput
                            type="new_password"
                            name="new_password"
                            value={new_password}
                            onChange={this.handleChange}
                            label="New Password"
                            style={{marginTop: '0px', marginBottom: '0px'}}
                            required
                        />
                        <FormInput
                            type="confirm_password"
                            name="confirm_password"
                            value={confirm_password}
                            onChange={this.handleChange}
                            label="Confirm Password"
                            style={{marginTop: '0px', marginBottom: '0px'}}
                            required
                        />
                    </div>

                    <div className={'flex justify-center items-center'}>
                        <button className={'f4 b link dim ph3 pv2 mb2 dib white bg-black button-handler'}
                                type={'submit'}>
                            Update Password
                        </button>
                    </div>
                </form>
                <ToastContainer/>
            </div>
        );
    }
}

export default AdminUpdatePassword;


