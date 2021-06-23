import React,{useState, useEffect} from 'react';
import {ToastContainer,toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// redux
import { connect } from 'react-redux';
import {
    setJuniorTableLogArray,
    setLogStatArray,
    setModalVisibility,
    appendNewLeads
} from '../../redux/junior-panel/junior-logs/junior.logs.actions.js';

// reselect
import {createStructuredSelector} from "reselect";
import {selectJuniorLogStatArray} from "../../redux/junior-panel/junior-logs/junior.logs.selectors";

// components
import LogCard from './LogCard.js';
import CustomButton from '../CustomButton/CustomButton.js';
import FormInput from '../FormInput/FormInput.js';
import JuniorTable from "./JuniorTable/JuniorTable";
import JuniorModal from "./JuniorModal/JuniorModal";

// css
import './JuniorLogs.scss';
import {selectCurrentUser} from "../../redux/user/user.selectors";

toast.configure();

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
    // {
    //     title: 'Handed Over Leads',
    //     numeric: 70,
    // },
    {
        title: 'Status 1 Updated',
        numeric: 0,
    },
    {
        title: 'Status 2 Updated',
        numeric: 0,
    },
    {
        title: 'Unattended',
        numeric: 0,
    },
    {
        title: 'Coded',
        numeric: 0,
    }
    // {
    //     title: 'Pending Requests',
    //     numeric: 70,
    // },
]

const JuniorLogs = ({currentUser, setLogStatArray, log_stat_array,setJuniorTableLogArray, setModalVisibility}) => {

    useEffect(() => {
        const {telecaller_id} = currentUser;
        fetch('https://aqueous-mesa-28052.herokuapp.com/junior/counts',{
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                telecaller_id: telecaller_id
            })
        })
            .then(resp => resp.json())
            .then(resp => {
            console.log(resp);
            LogStatArray.map(item => {
                switch(item.title){
                    case 'Status 1 Updated':
                        item.numeric = resp[0].status_1;
                        break;
                    case 'Status 2 Updated':
                        item.numeric = resp[0].status_2;
                        break;
                    case 'Unattended':
                        item.numeric = resp[0].unattended;
                        break;
                    case 'Coded':
                        item.numeric = resp[0].coded;
                        break;
                    default:
                        break;
                }
                setLogStatArray(LogStatArray);
            })
        })
        fetch('https://aqueous-mesa-28052.herokuapp.com/junior/fetch_old', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                telecaller_id: telecaller_id
            })
        })
        .then(response => response.json())
        .then(resp => {
            console.log(resp)
            setJuniorTableLogArray(resp)
        })
        .catch(err => {
            console.log(err);
            toast.error("Error Loading Table", {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 4000,
                });
        })
    }, [])

    const [filter, setFilter] = useState('*');
    const handleChange = (event) => {
        setFilter(event.target.value);
    }

    const [filterValue, setFilterValue] = useState('');
    const handleFilterValue = (event) => {
        setFilterValue(event.target.value);
    }

    const fetchNewLeads = () => {
        const {telecaller_id, username, preferred_language} = currentUser;
        fetch('https://aqueous-mesa-28052.herokuapp.com/junior/fetch_new', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                telecaller_id: telecaller_id,
                telecaller_name: username,
                preferred_language: preferred_language
            })
        })
        .then(response => response.json())
        .then(resp => {
            if(resp==='Less than 1')
            {
                toast.error("1 hour not yet elapsed from previous fetch", {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 4000,
                });
            }
            else if(resp!=='Unable to assign you leads' || resp!=='Unable to fetch')
            {
                setJuniorTableLogArray(resp);
                toast.success("New Leads assigned successfully", {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 4000,
                });
            }
        })
        .catch(err => {
            console.log(err);
            toast.error("Unable to fetch new leads", {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 4000,
                });
        })
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
                <CustomButton style={{marginLeft: '0'}} onClick={() => fetchNewLeads()}>Fetch New Leads</CustomButton>
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
                <CustomButton style={{marginLeft: '0'}}>GO</CustomButton>
            </div>
            <div className={'mt4 w-100 mb4'}>
                <JuniorTable />
            </div>
            <JuniorModal />
            <ToastContainer/>
		</div>
	)
}

const mapStateToProps = createStructuredSelector({
    log_stat_array: selectJuniorLogStatArray,
    currentUser: selectCurrentUser
})

const mapDispatchToProps = dispatch => ({
    setLogStatArray: array => dispatch(setLogStatArray(array)),
    setJuniorTableLogArray: array => dispatch(setJuniorTableLogArray(array)),
    setModalVisibility: visible => dispatch(setModalVisibility(visible))
})

export default connect(mapStateToProps, mapDispatchToProps)(JuniorLogs);