import { React, Component } from "react";
import FormInput from '../FormInput/FormInput.js';
import "./SearchByDropdown.scss";
import CustomButton from "../CustomButton/CustomButton";

class SearchByDropdown extends Component {
    constructor() {
        super();
        this.state = {
           searchFilter: '',
           searchValue: ''
        };
    }

    handleSubmit = (event) => {
        event.preventDefault();
        console.log(this.state);
    };

    handleChange = (event) => {
        const { name, value } = event.target;

        this.setState({ [name]: value });
    };

    render() {
        const {searchValue, searchFilter} = this.state;
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
                value: 'language',
                title: 'Language'
            },
            {
                value: 'lead_contact',
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
                        required
                        disabled={`${searchFilter?'':'true'}`}
                    />
                    <CustomButton 
                    type="submit"
                    style={{ marginLeft: '0px'}}
                    >
                        Search
                    </CustomButton>
                </form>
            </div>
        );
    }
}

export default SearchByDropdown;
