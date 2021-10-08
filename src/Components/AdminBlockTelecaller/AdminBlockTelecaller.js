import React, {Component} from 'react';
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
            telecallers: [],
            pages: [],
            perPage: 10,
            language: 'marathi'
        }
    }

    componentDidMount() {
        const {language} = this.state;
        fetch("https://aqueous-mesa-28052.herokuapp.com/admin/fetch_telecallers_count", {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                des: 'junior',
                language: language
            })
        })
        .then(response => response.json())
        .then(resp => {
            let arr = []
            for (let i = 1; i <= Math.ceil(resp.count / this.state.perPage); i++) {
                arr.push(i);
            }
            this.setState({pages: arr}, () => {
                console.log()
            })
        })
        .catch(err => {
            console.log(err);
            toast.error(`${err}`,{
                position: toast.POSITION.TOP_CENTER,
                autoClose: 2500
            });
        })

        fetch("https://aqueous-mesa-28052.herokuapp.com/admin/fetch_telecallers", {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                pgNo: 0,
                des: 'junior',
                language: language
            })
        })
        .then(response => response.json())
        .then(resp => {
            this.setState({telecallers: resp}, () => {
                console.log()
            })
        })
        .catch(err => {
            console.log(err);
            toast.error(`${err}`,{
                position: toast.POSITION.TOP_CENTER,
                autoClose: 2500
            });
        })
    }

    handleSubmit = (telecaller_id, index) => {
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
                let telecallers = this.state.telecallers;
                telecallers[index] = {
                    ...telecallers[index],
                    blocked: !telecallers[index].blocked
                }
                this.setState({
                    telecallers: telecallers
                }, () => {
                    console.log()
                })
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
    fetchNewPage = pgNo => {
        const {language} = this.state;
        fetch("https://aqueous-mesa-28052.herokuapp.com/admin/fetch_telecallers", {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                pgNo: pgNo,
                des: 'junior',
                language: language
            })
        })
        .then(response => response.json())
        .then(resp => {
            this.setState({telecallers: resp}, () => {
                console.log()
            })
        })
        .catch(err => {
            console.log(err);
            toast.error(`${err}`,{
                position: toast.POSITION.TOP_CENTER,
                autoClose: 2500
            });
        })   
    }

    handleChange = event => {
        const {name, value} = event.target;
        const {language} = this.state;
        this.setState({[name]: value}, () => {
            fetch("https://aqueous-mesa-28052.herokuapp.com/admin/fetch_telecallers_count", {
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    des: 'junior',
                    language: language
                })
            })
            .then(response => response.json())
            .then(resp => {
                let arr = []
                for (let i = 1; i <= Math.ceil(resp.count / this.state.perPage); i++) {
                    arr.push(i);
                }
                this.setState({pages: arr}, () => {
                    console.log()
                })
            })
            .catch(err => {
                console.log(err);
                toast.error(`${err}`,{
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 2500
                });
            })

            fetch("https://aqueous-mesa-28052.herokuapp.com/admin/fetch_telecallers", {
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    pgNo: 0,
                    des: 'junior',
                    language: language
                })
            })
            .then(response => response.json())
            .then(resp => {
                this.setState({telecallers: resp}, () => {
                    console.log()
                })
            })
            .catch(err => {
                console.log(err);
                toast.error(`${err}`,{
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 2500
                });
            })   
        })
    }

    render() {
        const {
            telecaller_id,
            pages
        } = this.state;
        return (
            <div className={'admin-block-section '}>
                <div className={'w-100 mb4'}>
                    <div className={'flex flex-column justify-center items-center'}>
                        <h1 style={{marginTop: "1rem",marginBottom: "1.8rem" }}>Block Telecaller</h1>
                        <div className="telecaller-analytics-select-container">
                            <label htmlFor="language" className="admin-block-date-label">Select Language:</label>
                            <select 
                            name="language" 
                            className="admin-block-select" 
                            onChange={this.handleChange}
                            >
                                <option value="marathi">Marathi</option>
                                <option value="hindi">Hindi</option>
                            </select>
                        </div>
                    </div>
                    <AdminBlockedTelecallerTable data={this.state.telecallers} handleSubmit={this.handleSubmit}/>
                </div>
                <div className="admin-block-pagination-container pb4">
                    <p>. . </p>
                    {
                        pages.map((number, index) => (
                            <button key={index} onClick={() => this.fetchNewPage(number-1)} className="admin-block-page-btn">{number}</button>
                        ))
                    }
                    <p>. . </p>
                </div>
            </div>
        );
    }
}

export default AdminBlockTelecaller;
