import React, {Component, useEffect, useState} from 'react';
import './AdminBlockTelecaller.scss';
import FormInput from "../FormInput/FormInput";
import CustomButton from "../CustomButton/CustomButton"
import AdminBlockedTelecallerTable from "./AdminBlockedTelecallerTable/AdminBlockedTelecallerTable";
import {ToastContainer, toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

toast.configure();
class AdminBlockTelecaller extends Component {
    constructor(props) {
        super(props);
        this.state ={
            telecaller_id: '',
            data: []
        }
    }
    componentDidMount() {
            fetch('https://aqueous-mesa-28052.herokuapp.com/admin/fetch_blocked',{
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({

                })
            })
                .then( resp => resp.json())
                .then( resp => {
                    this.setState({data: resp});
                })
                .catch( err => {
                    toast.error(`${err}`,{
                        position: toast.POSITION.TOP_CENTER,
                        autoClose: 2500
                    });
                    console.log(err);
                })
    }

    handleSubmit = event => {
        event.preventDefault();
        const {
            telecaller_id
        } = this.state;
        fetch('https://aqueous-mesa-28052.herokuapp.com/admin/block_telecaller',{
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                telecaller_id: telecaller_id
            })
        })
            .then(response => response.json())
            .then( response => {
                console.log(response);
                if(response === "blocked"){
                    toast.success("Successfully blocked",{
                        position: toast.POSITION.TOP_CENTER,
                        autoClose: 2500
                    })
                }else if(response === "unblocked"){
                    toast.success("Successfully unblocked",{
                        position: toast.POSITION.TOP_CENTER,
                        autoClose: 2500
                    })
                }
            })
            .catch( err => {
                console.log(err);
                toast.error(`${err}`,{
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 2500
                })
            })
        this.setState({telecaller_id:""});
    }

    handleChange = event => {
        const {name, value} = event.target;
        this.setState({[name]: value});
        console.log(this.state);
    }
    render() {
        const {
            telecaller_id
        } = this.state;
        return (
            <div className={'admin-block-section '}>
                <div className={'admin-block-section-heading'}>
                    <h1 className={'mt3'}>Block Telecallers</h1>
                </div>
               <form id={'admin-block-form'} className={'admin-block-form-container'} onSubmit={this.handleSubmit}>
                   <FormInput
                       type="text"
                       name="telecaller_id"
                       value={telecaller_id}
                       onChange={this.handleChange}
                       label="Telecaller ID"
                       style={{marginTop: '0px', marginBottom: '0px'}}
                       required
                   />
                   <CustomButton
                       type='submit'
                       className={'admin-block-submit-button shadow-4'}
                   >
                       Request to Block or Unblock
                   </CustomButton>
               </form>
                <hr color={'grey'} className={'mt4 mb4 w-100'}/>
                <div className={'w-100 mb4'}>
                    <div className={'flex justify-center items-center'}>
                        <h1 style={{marginTop: 0,marginBottom: "1.5rem" }}>Blocked Telecaller IDs</h1>
                    </div>
                    <AdminBlockedTelecallerTable data={this.state.data} />
                </div>
            </div>
        );
    }
}

export default AdminBlockTelecaller;
