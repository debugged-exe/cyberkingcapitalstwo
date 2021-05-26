import React,{useState, useEffect} from 'react';

// redux
import { connect } from 'react-redux';
import {setJuniorTableLogArray, setLogStatArray} from '../../redux/junior-panel/junior-logs/junior.logs.actions.js';

// components
import LogCard from './LogCard.js';
import CustomButton from '../CustomButton/CustomButton.js';
import FormInput from '../FormInput/FormInput.js';
import JuniorTable from "./JuniorTable/JuniorTable";
import JuniorModal from "./JuniorModal/JuniorModal";

// css
import './JuniorLogs.scss';

const tableLogs = [
    {
        lead_id: 1,
        assigned_to: "xyz",
        lead_name: "abcde",
        lead_contact: '9087389032',
        whatsapp_no: '8903221111',
        account_opening_no: '123',
        city: "pune",
        trading_knowledge: "no",
        preferred_language: "hindi",
        status_1: "complete",
        status_2: "uncomplete",
        handover_status: "complete",
        coded: "---"
    },
    {
        lead_id: 2,
        assigned_to: "mmmmm",
        lead_name: "oooooo",
        lead_contact: '9000001222',
        whatsapp_no: '9090912121',
        account_opening_no: '8011',
        city: "pune",
        trading_knowledge: "no",
        preferred_language: "marathi",
        status_1: "complete",
        status_2: "uncomplete",
        handover_status: "complete",
        coded: "---"
    }
]

const LogStatArray = [
    {
        title: 'Handed Over Leads',
        numeric: 70,
    },
    {
        title: 'Status 1 Updated',
        numeric: 70,
    },
    {
        title: 'Status 2 Updated',
        numeric: 70,
    },
    {
        title: 'Unattended',
        numeric: 70,
    },
    {
        title: 'Coded',
        numeric: 70,
    },
    {
        title: 'Pending Requests',
        numeric: 70,
    },
]

const JuniorLogs = ({setLogStatArray, log_stat_array,setJuniorTableLogArray}) => {

    useEffect(() => {
        setLogStatArray(LogStatArray);
    }, [])

    const [filter, setFilter] = useState('*');
    const handleChange = (event) => {
        setFilter(event.target.value);
    }

    const [filterValue, setFilterValue] = useState('');
    const handleFilterValue = (event) => {
        setFilterValue(event.target.value);
    }

    const [modal, setModal] = useState(false);
    const modalHandler = (item) => {
        setModal(item);
    }

    const [lead, setLead] = useState({});
    const leadHandler = (item) => {
        setLead(item);
        setModal(true);
    }

	return (
		<div className="junior-logs">
			<p style={{fontFamily: 'Open Sans Condensed', fontSize: '2rem', fontWeight: 'bold', textAlign: 'center'}}>View Logs</p>
			<div className="stats">
           		{
           			log_stat_array.map((item,index) => {
           				return(<LogCard key={index} Heading={item.title} numeric={item.numeric} />);
           			})
           		}
            </div>
            <div className="button-container center">
                <CustomButton style={{marginLeft: '0'}}>Fetch New Leads</CustomButton>
                <div className={"flex justify-center items-center center mt4 mb4 w-100"}>
                    <label className={"b f3 ml1-ns mr3 "}>Search by : </label>
                    <select
                        name="searchFilter"
                        className={"f4 ml1 "}
                        onChange={(event) => handleChange(event)}
                    >
                        <option value='*' >--select--</option>
                        <option value='lead_id'>Lead ID</option>
                        <option value="lead_name">Lead Name</option>
                        <option value="lead_contact">Lead Contact</option>
                    </select>
                </div>
                <div className={"flex justify-center items-center center w-100"}>
                    <label className={"b f3 ml1-ns mr3 "}>Enter value : </label>
                    <FormInput
                    type="text"
                    name="filter_value"
                    value={filterValue}
                    onChange={(event) => handleFilterValue(event)}
                    label={filter!=='*'?`Enter ${filter}`:'Choose filter'}
                    style={{marginTop: '0px', marginBottom: '0px'}}
                    disabled={filter==='*'?true:null}
                    required
                    />
                </div>
                <CustomButton style={{marginLeft: '0'}} onClick={()=> {setJuniorTableLogArray(tableLogs)}}>GO</CustomButton>
            </div>
            <div className={'mt4 w-100 mb4'}>
                <JuniorTable leadHandler={leadHandler}/>
            </div>
            <JuniorModal lead={lead} modal={modal} modalHandler={modalHandler}/>
		</div>
	)
}

const mapStateToProps = ({junior_panel: {junior_logs}}) => ({
    log_stat_array: junior_logs.log_stat_array
})

const mapDispatchToProps = dispatch => ({
    setLogStatArray: array => dispatch(setLogStatArray(array)),
    setJuniorTableLogArray: array => dispatch(setJuniorTableLogArray(array))
})

export default connect(mapStateToProps, mapDispatchToProps)(JuniorLogs);