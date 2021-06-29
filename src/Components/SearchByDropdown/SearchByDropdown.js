import { React, Component } from "react";
import FormInput from '../FormInput/FormInput.js';
import CustomButton from "../CustomButton/CustomButton";
import SearchTable from "./SearchTable/SearchTable";
import {ToastContainer,toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//redux
import {connect} from "react-redux";
import {setSeniorSearchTableArray} from "../../redux/senior-panel/senior-search/senior.search.actions";

// css
import "./SearchByDropdown.scss";

toast.configure();

class SearchByDropdown extends Component {
    constructor() {
        super();
        this.state = {
           searchFilter: '',
           searchValue: '',
           pages: 0,
           pageNumbers: [],
           perPage: 10
        };
    }

    handleSubmit = (event) => {
        const {searchValue, searchFilter, pageNumbers, perPage} = this.state;
        const {setSeniorSearchTableArray} = this.props;
        event.preventDefault();
        fetch('https://aqueous-mesa-28052.herokuapp.com/senior/search_leads_pgcount',{
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                field: searchFilter,
                payload: searchValue
            })
        })
        .then(response => response.json())
        .then(resp => {
            this.setState({pages: resp.count}, () =>{
                var arr = [];
                for (let i = 1; i <= Math.ceil(resp.count / perPage); i++) {
                    arr.push(i);
                }
                this.setState({pageNumbers: arr}, () => {
                    console.log('')
                })
                fetch('https://aqueous-mesa-28052.herokuapp.com/senior/search_leads',{
                    method: 'post',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        field: searchFilter,
                        payload: searchValue,
                        pgNo: 0
                    })
                })
                .then(response => response.json())
                .then(resp => {
                    if(resp!=='fail' || resp!=='Incorrect Submission')
                    {
                      setSeniorSearchTableArray(resp);  
                    } 
                })
                .catch(err => {
                    console.log(err)
                    toast.error('Failed to fetch logs.Please Refresh', {
                        position: toast.POSITION.TOP_CENTER,
                        autoClose: 2500,
                    });
                })
            })
        })
        .catch(err => {
            console.log(err);
            fetch('https://aqueous-mesa-28052.herokuapp.com/senior/search_leads',{
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    field: searchFilter,
                    payload: searchValue,
                    pgNo: 0
                })
            })
            .then(response => response.json())
            .then(resp => {
                if(resp!=='fail' || resp!=='Incorrect Submission')
                {
                  setSeniorSearchTableArray(resp);  
                } 
            })
            .catch(err => {
                console.log(err)
                toast.error('Failed to fetch logs.Please Refresh', {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 2500,
                });
            })
            toast.error('Failed to fetch page count.Please Refresh', {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 2500,
            });
        })
    };

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value })
    };

    fetchNewPage = (pgNo) => {
        const {searchValue, searchFilter} = this.state;
        const {setSeniorSearchTableArray} = this.props;
        fetch('https://aqueous-mesa-28052.herokuapp.com/senior/search_leads',{
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                field: searchFilter,
                payload: searchValue,
                pgNo: pgNo
            })
        })
        .then(response => response.json())
        .then(resp => {
            if(resp!=='fail' || resp!=='Incorrect Submission')
            {
              setSeniorSearchTableArray(resp);  
            } 
        })
        .catch(err => {
            console.log(err)
            toast.error('Failed to fetch logs.Please Refresh', {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 2500,
            });
        })
    }

    render() {
        const {searchValue, searchFilter, pageNumbers} = this.state;
        const search_options = [
            {
                value: 'lead_name',
                title: 'Lead Name'
            },
            {
                value: 'lead_id',
                title: 'Lead ID'
            },
            {
                value: 'preferred_language',
                title: 'Language'
            },
            {
                value: 'lead_phone_no',
                title: 'Lead Contact'
            }
        ];
        return (
            <div className={"search-leads-container mt4"}>
                <p className={"search-leads-header b mb4"}>Search For Leads</p>
                <form className={"search-leads-form mt4"} onSubmit={this.handleSubmit}>
                    <div className={"flex justify-center items-center center mb4 w-100"}>
                        <label className={"b f3 ml1-ns mr3 "}>Search by : </label>
                        <select
                            name="searchFilter"
                            className={"f4 ml1 "}
                            onChange={this.handleChange}
                        >
                            <option value='' >--select--</option>
                            {search_options.map((item) => {
                                return <option value={item.value} >{item.title}</option>;
                            })}
                        </select>
                    </div>
                    <FormInput
                        type="text"
                        name="searchValue"
                        value={searchValue}
                        onChange={this.handleChange}
                        label={`${searchFilter?`Enter the ${searchFilter}`:'Choose search filter'}`}
                        style={{marginTop: '0px', marginBottom: '0px'}}
                        disabled={`${searchFilter?'':'true'}`}
                        required
                    />
                    <CustomButton 
                    type="submit"
                    style={{ marginLeft: '0px'}}
                    >
                        Search
                    </CustomButton>
                </form>
                <div className={'w-100 pt4 pb4'}>
                    <SearchTable />
                </div>
                <div className="senior-handover-pagination-container pb4">
                    <p>. . </p>
                    {pageNumbers.map((number, index) => (
                        <button key={index} onClick={() => this.fetchNewPage(number-1)} className="junior-log-page-btn">{number}</button>
                    ))}
                    <p>. . </p>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    setSeniorSearchTableArray: array => dispatch(setSeniorSearchTableArray(array))
})

export default connect(null, mapDispatchToProps)(SearchByDropdown);
