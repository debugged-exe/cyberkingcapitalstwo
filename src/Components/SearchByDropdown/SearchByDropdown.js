import { React, Component } from "react";
import "./SearchByDropdown.scss";
import CustomButton from "../CustomButton/CustomButton";

class SearchByDropdown extends Component {
    constructor() {
        super();
        this.state = {
            telecaller_name: "",
            telecaller_id: "",
            language: "",
            designation: ""
        };
    }

    handleSubmit = (event) => {
        event.preventDefault();
    };

    handleChange = (event) => {
        const { name, value } = event.target;

        this.setState({ [name]: value });
    };

    render() {
        const {
            telecaller_name,
            telecaller_id,
            language,
            designation
        } = this.state;
        const search_options = [
            "telecaller_name",
            "telecaller_id",
            "language",
            "designation"
        ];
        return (
            <div className={"admin-register-container mt4"}>
                <p className={"admin-register-header b mb4"}>Search For Leads</p>
                <form className={"admin-register-form mt4"} onSubmit={this.handleSubmit}>
                    <div className={"flex justify-center items-center center mb4 w-100"}>
                        <label className={"b f3 ml1-ns mr3 "}>Search by : </label>
                        <select
                            name="search"
                            className={"f4 ml1 "}
                            onChange={this.handleChange}
                        >
                            <option value="---" >--select--</option>
                            {search_options.map((items) => {
                                return <option value={items} >{items}</option>;
                            })}
                        </select>
                    </div>
                </form>
                <CustomButton type="submit" style={{width: '10%', marginLeft: '-10px'}}>
                    Search
                </CustomButton>
            </div>
        );
    }
}

export default SearchByDropdown;
