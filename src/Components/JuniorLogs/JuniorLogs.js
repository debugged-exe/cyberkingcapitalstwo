import React, { useState, useEffect } from 'react';
import PuffLoader from "react-spinners/PuffLoader";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {AiOutlineContacts, AiOutlineSearch} from 'react-icons/ai';


// redux
import { connect } from 'react-redux';
import {
    setJuniorTableLogArray,
    setLogStatArray,
    setModalVisibility,
    appendNewLeads
} from '../../redux/junior-panel/junior-logs/junior.logs.actions.js';

// reselect
import { createStructuredSelector } from "reselect";
import { selectJuniorLogStatArray } from "../../redux/junior-panel/junior-logs/junior.logs.selectors";
import { selectCurrentUser } from "../../redux/user/user.selectors";

// components
import LogCard from './LogCard.js';
import CustomButton from '../CustomButton/CustomButton.js';
import FormInput from '../FormInput/FormInput.js';
import JuniorTable from "./JuniorTable/JuniorTable";
import JuniorModal from "./JuniorModal/JuniorModal";

// css
import './JuniorLogs.scss';

toast.configure();

const LogStatArray = [
    {
        title: 'Handed Over Leads',
        numeric: 0,
    },
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
    },
    {
        title: 'Pending Requests',
        numeric: 0,
    },
    {
        title: 'Referral Pending Requests',
        numeric: 0
    },
    {
        title: 'Referral Coded',
        numeric: 0
    },
    {
        title: 'Referral Rejected',
        numeric: 0
    }
]

const JuniorLogs = ({ currentUser, setLogStatArray, log_stat_array, setJuniorTableLogArray, setModalVisibility }) => {

    const [blockView, setBlockView] = useState(false);
    const [loader, setLoader] = useState(true)

    const [pages, setPages] = useState(0);
    const [pageNumbers, setPageNumbers] = useState([]);
    const perPage = 10;

    const [currentPage, setCurrentPage] = useState(1)

    useEffect(() => {
        const { telecaller_id } = currentUser;
        fetch('https://aqueous-mesa-28052.herokuapp.com/junior/is_blocked', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                telecaller_id: telecaller_id
            })
        })
            .then(resp => resp.json())
            .then(response => {
                if (response.blocked === true) {
                    setBlockView(true);
                }
                else if (response.blocked === false) {
                    setBlockView(false);
                }
            })
            .catch(err => {
                console.log(err);
            });

        fetch('https://aqueous-mesa-28052.herokuapp.com/junior/counts', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                telecaller_id: telecaller_id
            })
        })
            .then(resp => resp.json())
            .then(resp => {
                // console.log(resp)
                LogStatArray.map(item => {
                    switch (item.title) {
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
                        case 'Pending Requests':
                            item.numeric = resp[0].pending;
                            break;
                        case 'Handed Over Leads':
                            item.numeric = resp[0].handover;
                            break;
                        case 'Referral Pending Requests':
                            item.numeric = resp[0].referral_pending
                            break;
                        case 'Referral Coded':
                            item.numeric = resp[0].referral_coded
                            break;
                        case 'Referral Rejected':
                            item.numeric = resp[0].referral_rejected
                            break;
                        default:
                            break;
                    }
                    setLogStatArray(LogStatArray);
                })
            })
        fetch('https://aqueous-mesa-28052.herokuapp.com/junior/fetch_pgcount', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                telecaller_id: telecaller_id
            })
        })
            .then(resp => resp.json())
            .then(response => {
                setPages(response.count);
                var arr = [];
                for (let i = 1; i <= Math.ceil(response.count / perPage); i++) {
                    arr.push(i);
                }
                setPageNumbers(arr);
            })
            .catch(err => {
                console.log(err);
                toast.warn("Error pg count", {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 1500,
                });
            })
        fetch('https://aqueous-mesa-28052.herokuapp.com/junior/fetch_old', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                telecaller_id: telecaller_id,
                pgNo: 0
            })
        })
            .then(response => response.json())
            .then(resp => {
                // console.log('fetch old',resp);
                setLoader(false);
                setJuniorTableLogArray(resp);
            })
            .catch(err => {
                console.log(err);
                setLoader(false)
                toast.warn("Error Loading Table", {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 1500,
                });
            })
    }, [])

    const [filter, setFilter] = useState('*');
    const handleChange = (event) => {
        const { telecaller_id } = currentUser;
        if (filter !== 'custom') {
            setLoader(true);
            fetch('https://aqueous-mesa-28052.herokuapp.com/junior/fetch_pgcount', {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    telecaller_id: telecaller_id
                })
            })
                .then(resp => resp.json())
                .then(response => {
                    setPages(response.count);
                    var arr = [];
                    for (let i = 1; i <= Math.ceil(response.count / perPage); i++) {
                        arr.push(i);
                    }
                    setPageNumbers(arr);
                })
                .catch(err => {
                    console.log(err);
                    toast.warn("Error pg count", {
                        position: toast.POSITION.TOP_CENTER,
                        autoClose: 1500,
                    });
                })

            fetch('https://aqueous-mesa-28052.herokuapp.com/junior/fetch_old', {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    telecaller_id: telecaller_id,
                    pgNo: 0
                })
            })
                .then(response => response.json())
                .then(resp => {
                    setLoader(false)
                    setJuniorTableLogArray(resp);
                })
                .catch(err => {
                    console.log(err);
                    setLoader(false)
                    toast.warn("Error Loading Table", {
                        position: toast.POSITION.TOP_CENTER,
                        autoClose: 1500,
                    });
                })
        }
        setFilter(event.target.value);
    }

    const [filterValue, setFilterValue] = useState('');
    const handleFilterValue = (event) => {
        setFilterValue(event.target.value);
    }

    const handleUniversalFilterValue= (event) =>{
        
        setUniversalFilter(document.getElementById('dataItem').innerHTML);
        setFilteredData([]);
    }

    const [universalFilter, setUniversalFilter] = useState('');

    const handleUniversalChange = (event) => {
        const { telecaller_id } = currentUser;
        if(event.target.value === 'full_table'){
            
                setLoader(true);
                fetch('https://aqueous-mesa-28052.herokuapp.com/junior/fetch_pgcount', {
                    method: 'post',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        telecaller_id: telecaller_id
                    })
                })
                    .then(resp => resp.json())
                    .then(response => {
                        setPages(response.count);
                        var arr = [];
                        for (let i = 1; i <= Math.ceil(response.count / perPage); i++) {
                            arr.push(i);
                        }
                        setPageNumbers(arr);
                    })
                    .catch(err => {
                        console.log(err);
                        toast.warn("Error pg count", {
                            position: toast.POSITION.TOP_CENTER,
                            autoClose: 1500,
                        });
                    })
    
                fetch('https://aqueous-mesa-28052.herokuapp.com/junior/fetch_old', {
                    method: 'post',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        telecaller_id: telecaller_id,
                        pgNo: 0
                    })
                })
                    .then(response => response.json())
                    .then(resp => {
                        setLoader(false)
                        setJuniorTableLogArray(resp);
                    })
                    .catch(err => {
                        console.log(err);
                        setLoader(false)
                        toast.warn("Error Loading Table", {
                            position: toast.POSITION.TOP_CENTER,
                            autoClose: 1500,
                        });
                    })
            
            setuFilter('*');
        }
        else
        {setuFilter(event.target.value);}
    }

    const [uFilter, setuFilter] = useState('*');

    const handleUniversalFilter = (event) => {
         
        
       
        const {telecaller_id}=currentUser;
        setPageNumbers(['1']);
        if(uFilter=='lead_name')
        {
            fetch(`https://aqueous-mesa-28052.herokuapp.com/junior/name/leads?lead_name=${universalFilter}&telecaller_id=${telecaller_id}`, {
            method: 'get',
            headers: { 'Content-Type': 'application/json' },
            
        })
            .then(response => response.json())
            .then(resp => {
                setLoader(false)
                
                setJuniorTableLogArray(resp);
            })
            .catch(err => {
                console.log(err);
                setLoader(false)
                toast.warn("Error Loading Table", {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 1500,
                });
            })
        }
            else if(uFilter=='lead_id'){
                fetch(`https://aqueous-mesa-28052.herokuapp.com/junior/leadId/lead?lead_id=${universalFilter}&telecaller_id=${telecaller_id}`, {
            method: 'get',
            headers: { 'Content-Type': 'application/json' },
            
        })
            .then(response => response.json())
            .then(resp => {
                setLoader(false)
                setJuniorTableLogArray([resp]);
            })
            .catch(err => {
                console.log(err);
                setLoader(false)
                toast.warn("Error Loading Table ", {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 1500,
                });
            })
            }
            else if(uFilter == 'lead_phone_no'){
                fetch(`https://aqueous-mesa-28052.herokuapp.com/junior/phNo/leads?ph_no=${universalFilter}&telecaller_id=${telecaller_id}`, {
            method: 'get',
            headers: { 'Content-Type': 'application/json' },
            
        })
            .then(response => response.json())
            .then(resp => {
                setLoader(false)
                setJuniorTableLogArray(resp);
            })
            .catch(err => {
                console.log(err);
                setLoader(false)
                toast.warn("Error Loading Table ", {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 1500,
                });
            })
            }
            setUniversalFilter('');
            setuFilter('*');
            setFilterValue('');
           
    }

    const fetchNewLeads = () => {
        setLoader(true)
        const { telecaller_id, username, preferred_language } = currentUser;
        fetch('https://aqueous-mesa-28052.herokuapp.com/junior/fetch_new', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                telecaller_id: telecaller_id,
                telecaller_name: username,
                preferred_language: preferred_language
            })
        })
            .then(response => response.json())
            .then(resp => {
                if (resp === 'Less than 1') {
                    toast.warn("15 minutes not yet elapsed from previous fetch", {
                        position: toast.POSITION.TOP_CENTER,
                        autoClose: 1500,
                    });
                }
                else if (resp === 'less than 5') {
                    toast.warn("Not enough leads to assign you.", {
                        position: toast.POSITION.TOP_CENTER,
                        autoClose: 1500,
                    });
                }
                else if (resp === "blocked") {
                    toast.warn("You have been blocked by the admin. Please contact admin for more detail", {
                        position: toast.POSITION.TOP_CENTER,
                        autoClose: 1500
                    })
                    setLoader(false);
                }
                else if (resp !== 'Unable to assign you leads' || resp !== 'Unable to fetch') {
                    setLoader(false)
                    setCurrentPage(1)
                    setJuniorTableLogArray(resp);
                    toast.success("New Leads assigned successfully", {
                        position: toast.POSITION.TOP_CENTER,
                        autoClose: 1500,
                    });
                }
            })
            .catch(err => {
                console.log(err);
                setLoader(false)
                toast.warn("Unable to fetch new leads", {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 1500,
                });
            })
        fetch('https://aqueous-mesa-28052.herokuapp.com/junior/fetch_pgcount', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                telecaller_id: telecaller_id
            })
        })
            .then(resp => resp.json())
            .then(response => {
                setPages(response.count);
                var arr = [];
                for (let i = 1; i <= Math.ceil(response.count / perPage); i++) {
                    arr.push(i);
                }
                setPageNumbers(arr);
            })
            .catch(err => {
                console.log(err);
            })
    }

    const fetchNewPage = (pgNo) => {
        const { telecaller_id } = currentUser;
        if (filter !== 'custom') {
            setLoader(true)
            fetch('https://aqueous-mesa-28052.herokuapp.com/junior/fetch_old', {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    telecaller_id: telecaller_id,
                    pgNo: pgNo
                })
            })
                .then(response => response.json())
                .then(resp => {
                    
                    setLoader(false)
                    setCurrentPage(pgNo + 1)
                    setJuniorTableLogArray(resp)
                })
                .catch(err => {
                    console.log(err);
                    setLoader(false)
                    toast.warn("Error Loading Table", {
                        position: toast.POSITION.TOP_CENTER,
                        autoClose: 1500,
                    });
                })
        }
        else {
            setLoader(true)
            fetch('https://aqueous-mesa-28052.herokuapp.com/junior/logs_by_count', {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    telecaller_id: telecaller_id,
                    pgNo: pgNo,
                    count_type: countType
                })
            })
                .then(response => response.json())
                .then(resp => {
                    setLoader(false)
                    setJuniorTableLogArray(resp)
                })
                .catch(err => {
                    console.log(err);
                    setLoader(false)
                    toast.warn("Error Loading Table", {
                        position: toast.POSITION.TOP_CENTER,
                        autoClose: 1500,
                    });
                })
        }
    }


    const [countType, setCountType] = useState('')

    const countWiseLogHandler = (title, numeric) => {
        const { telecaller_id } = currentUser;
        var count_type = title.split(' ').reduce((accumulator, item) => {
            return accumulator = accumulator + item.toLowerCase();
        }, '')

        var arr = []

        setCountType(count_type)
        setFilter('custom')

        if (count_type === 'status1updated' || count_type === 'status2updated') {
            fetch('https://aqueous-mesa-28052.herokuapp.com/junior/status_null_count', {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    telecaller_id: telecaller_id,
                    count_type: count_type
                })
            })
                .then(response => response.json())
                .then(resp => {
                    setPages(resp[0].count);
                    var arr = [];
                    for (let i = 1; i <= Math.ceil(resp[0].count / perPage); i++) {
                        arr.push(i);
                    }
                    setPageNumbers(arr);
                })
                .catch(err => {
                    console.log(err);
                    toast.warn("Error Loading Status Count", {
                        position: toast.POSITION.TOP_CENTER,
                        autoClose: 1500,
                    });
                })

            setLoader(true)

            fetch('https://aqueous-mesa-28052.herokuapp.com/junior/logs_by_count', {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    telecaller_id: telecaller_id,
                    pgNo: 0,
                    count_type: count_type
                })
            })
                .then(response => response.json())
                .then(resp => {
                    setLoader(false)
                    setCurrentPage(1);
                    setJuniorTableLogArray(resp)
                    window.scrollBy(0, 760);
                })
                .catch(err => {
                    console.log(err);
                    setLoader(false)
                    toast.warn("Error Loading Table", {
                        position: toast.POSITION.TOP_CENTER,
                        autoClose: 1500,
                    });
                })
        }
        else {
            setLoader(true)
            for (let i = 1; i <= Math.ceil(numeric / perPage); i++) {
                arr.push(i)
            }
            setPageNumbers(arr)
            fetch('https://aqueous-mesa-28052.herokuapp.com/junior/logs_by_count', {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    telecaller_id: telecaller_id,
                    pgNo: 0,
                    count_type: count_type
                })
            })
                .then(response => response.json())
                .then(resp => {
                    setLoader(false)
                    setCurrentPage(1)
                    setJuniorTableLogArray(resp)
                    window.scrollBy(0, 760);
                })
                .catch(err => {
                    console.log(err);
                    setLoader(false)
                    toast.warn("Error Loading Table", {
                        position: toast.POSITION.TOP_CENTER,
                        autoClose: 1500,
                    });
                })
        }
    }

    const [filteredData, setFilteredData] = useState([]);
   

    const handleUniSearch=(event)=>{
        setUniversalFilter(event.target.value);
        const {telecaller_id}=currentUser;
        
       
        if(uFilter=='lead_name')
        {
            fetch(`https://aqueous-mesa-28052.herokuapp.com/junior/substring/name/leads?lead_name=${event.target.value}&telecaller_id=${telecaller_id}`, {
            method: 'get',
            headers: { 'Content-Type': 'application/json' },
            
        })
            .then(response => response.json())
            .then(resp => {
                setLoader(false)
                setFilteredData(resp);
            })
            .catch(err => {
                console.log(err);
                setLoader(false)
                toast.warn("Error Loading Dropdown", {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 1500,
                });
            })
        }
            else if(uFilter == 'lead_phone_no'){
                fetch(`https://aqueous-mesa-28052.herokuapp.com/junior/substring/phNo/leads?ph_no=${event.target.value}&telecaller_id=${telecaller_id}`, {
            method: 'get',
            headers: { 'Content-Type': 'application/json' },
            
        })
            .then(response => response.json())
            .then(resp => {
                setLoader(false);
                setFilteredData(resp);
                
            })
            .catch(err => {
                console.log(err);
                setLoader(false)
                toast.warn("Error Loading Dropdown ", {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 1500,
                });
            })
            }

       
    }
 

    return (
        <div className="junior-logs">
            <p style={{ fontFamily: 'Open Sans Condensed', fontSize: '2rem', fontWeight: 'bold', textAlign: 'center' }}>View Logs</p>
            <div className="stats">
                {
                    log_stat_array.map((item, index) => {
                        return (
                            <div key={index} onClick={() => countWiseLogHandler(item.title, item.numeric)} className="pointer">
                                <LogCard Heading={item.title} numeric={item.numeric} />
                            </div>
                        );
                    })
                }
            </div>
            <div className="button-container center">
                <div className={`${blockView === true?'hidden':'flex'}`}>
                    <CustomButton  style={{marginLeft: '0'}} onClick={() => fetchNewLeads()}>Fetch New Leads</CustomButton>
                </div>

                {/* <div className={"flex justify-center items-center center mt4 mb4 w-100"}>
                    <label className={"b f3 ml1-ns mr3 "}>Search by : </label>
                    <select
                        name="searchFilter"
                        className={"f4 ml1 "}
                        onChange={(event) => handleChange(event)}
                    >
                        <option value='*' >--select--</option>
                        <option value='lead_id'>Lead ID</option>
                        <option value="lead_name">Lead Name</option>
                        <option value="lead_phone_no">Lead Contact</option>
                    </select>
                </div>
                <div className={"flex justify-center items-center center w-100"}>
                    <label className={"b f3 ml1-ns mr3 "}>Enter value : </label>
                    <FormInput
                        type="text"
                        name="filter_value"
                        value={filterValue}
                        onChange={(event) => handleFilterValue(event)}
                        label={filter !== '*' ? `Enter ${filter}` : 'Choose filter'}
                        style={{ marginTop: '0px', marginBottom: '0px' }}
                        disabled={filter === '*' ? true : null}
                        required
                    />
                </div> */}


                {/* UNIVERSAL SEARCH BY */}
                <div className={"flex justify-center items-center center mt4 mb4 w-100"}>
                    <label className={"b f3 ml1-ns mr3 "}>Universal Search by : </label>
                    <select
                        name="searchFilter"
                        value={uFilter}
                        className={"f4 ml1 "}
                        onChange={(event) => handleUniversalChange(event)}
                    >
                        <option value='*' >--select--</option>
                        <option value='lead_id' >Lead ID</option>
                        <option value="lead_name">Lead Name</option>
                        <option value="lead_phone_no">Lead Contact</option>
                        <option value="full_table">Full Table</option>
                    </select>
                </div>
                <div className={"flex justify-center items-center center w-100 "}>
                    <label className={"b f3 ml1-ns mr3 mb0 uniSearch pa0"}>Enter value : </label>
                    <FormInput
                        type="text"
                        name="filter_value"
                        value={universalFilter}
                        onChange={(event)=> handleUniSearch(event)}
                        label={uFilter !== '*' ? `Enter ${uFilter}` : 'Choose filter'}
                        style={{ marginTop: '0px', marginBottom: '0px' }}
                        disabled={uFilter === '*' ? true : null}
                        required
                    />
      
                <AiOutlineSearch  style={{marginLeft: '0'}} onClick={(event) => handleUniversalFilter(event)}>Filter</AiOutlineSearch>
                
                </div>
                <div >

                        {    filteredData.length !=0 &&     

                           ( 
                               <div className="result ">
                              { filteredData.map((item,i)=>{
                                  
                                return(
                                    
                                    <div  onClick={(event) => handleUniversalFilterValue(event)} cursor='pointer' key={i} id="dataItem" >
                                        {uFilter=='lead_name'?item.lead_name:item.lead_phone_no}
                                    </div>
                                );
                            })}
                            </div>)
                        }     
                    
                </div>
                

            </div>
            <div className={'mt4 w-100 mb4'}>
                <JuniorTable filter={filter} filterValue={filterValue} />
            </div>
            <JuniorModal />
            <div className="junior-log-pagination-container pb4">
                <p>. . </p>
                {pageNumbers.map((number, index) => (
                    <button key={index} onClick={() => fetchNewPage(number - 1)} className={`${number === currentPage ? "page-btn-focus" : "junior-log-page-btn"}`}>{number}</button>
                ))}
                <p>. . </p>
            </div>
            <div className="junior-log-puff-loader" style={{ display: `${loader ? 'flex' : 'none'}` }}>
                <PuffLoader loading={true} size={200} color={"red"} />
            </div>
            <ToastContainer />
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