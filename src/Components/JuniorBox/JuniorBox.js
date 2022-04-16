import React, { useEffect, useState } from "react";
import "./JuniorBox.css";
import { AiOutlineSearch } from "react-icons/ai";
import PuffLoader from "react-spinners/PuffLoader";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { usePagination } from "@mui/material/Pagination";
import {selectJuniorTableLogs} from "../../redux/junior-panel/junior-logs/junior.logs.selectors";

import {
  setModalLead,
  reassignHandoverFlag,
  reassignCodedFlag,
  reassignReferred
} from "../../redux/junior-panel/junior-logs/junior.logs.actions";
import {
  setJuniorTableLogArray,
  setLogStatArray,
  setModalVisibility,
  appendNewLeads
} from '../../redux/junior-panel/junior-logs/junior.logs.actions.js';
import JuniorModal from "../JuniorLogs/JuniorModal/JuniorModal";

import { createStructuredSelector } from "reselect";
import { selectJuniorLogStatArray } from "../../redux/junior-panel/junior-logs/junior.logs.selectors";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import { store } from "../../redux/store";

// components
import CustomButton from '../CustomButton/CustomButton.js';
import FormInput from "../FormInput/FormInput";
import {useDispatch, useSelector} from 'react-redux';
import {connect} from "react-redux";
toast.configure();


const LogStatArray = [
  {
      title: 'Unattended',
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
        title: 'Handed Over Leads',
        numeric: 0,
    },
    {
        title: 'Pending Requests',
        numeric: 0,
    },
    {
      title: 'Request Cancelled',
      numeric: 0,
    },
    {
        title: 'Coded',
        numeric: 0,
    },

    {
        title: 'Referral Pending Requests',
        numeric: 0
    },
    {
        title: 'Referral Rejected',
        numeric: 0
    },
    {
        title: 'Referral Coded',
        numeric: 0
    },
]

const JuniorBox = ({ junior_table_logs,currentUser, setLogStatArray, log_stat_array, setJuniorTableLogArray, setModalVisibility }) => {
  const [newFetchVisibility, setNewFetchVisibility] = useState(true);
  const [loader, setLoader] = useState(true)
  const [leadGroup,setLeadGroup]=useState('A');
  const [searchBar,setSearchBar]=useState("");
  const [Data,setData] =useState([]);
  const [tempData,setTempData]=useState(Data);
  const handoverHandler = (lead_id, lead_phone_no) => {
    const {telecaller_id, assigned_to, username} = currentUser;
    var referred = false;
    junior_table_logs.map(item => {
        if(item.lead_id === lead_id && item.referral_flag)
        {
            referred = true;
        }
    })
    if(!referred)
    {
        fetch('http://localhost:3001/junior/handover', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                lead_id: lead_id,
                lead_phone_no: lead_phone_no,
                telecaller_id: telecaller_id,
                senior_id: assigned_to,
                referred: false
            })
        })
        .then(response => response.json())
        .then(resp => {
            reassignHandoverFlag({lead_id: resp.lead_id, flag: 'yes'});
            toast.success("Handed over successfully", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 1500,
            });
        })
        .catch(err => {
            console.log(err);
            toast.warn("Unable to handover.Please try again.", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 1500,
            });
        })
    }
    else
    {
        fetch('http://localhost:3001/junior/handover', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                lead_id: lead_id,
                lead_phone_no: lead_phone_no,
                telecaller_id: telecaller_id,
                senior_id: assigned_to,
                referred: true
            })
        })
        .then(response => response.json())
        .then(resp => {
            reassignReferred(resp.lead_id);
            toast.error("Lead deleted successfully", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 1500,
            });
        })
        .catch(err => {
            toast.warn("Unable to delete.Please try again.", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 1500,
            });
        })
    }
}

const requestHandler = (lead_id, lead_phone_no, lead_name) => {
  const {telecaller_id, username} = currentUser;
  var referred = false;
  junior_table_logs.map(item => {
      if(item.lead_id === lead_id && item.referral_flag)
      {
          referred = true;
      }
  })
  if(!referred)
  {
      fetch('http://localhost:3001/junior/request_coded', {
          method: 'post',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
              lead_id: lead_id,
              lead_phone_no: lead_phone_no,
              telecaller_id: telecaller_id,
              telecaller_name: username,
              referred: false
          })
      })
      .then(response => response.json())
      .then(resp => {
          reassignCodedFlag({lead_id: lead_id})
          toast.success(resp, {
              position: toast.POSITION.TOP_CENTER,
              autoClose: 1500,
          });
      })
      .catch(err => {
          toast.warn("Error during Coded Request.Please try again.", {
              position: toast.POSITION.TOP_CENTER,
              autoClose: 1500,
          });
      })
  }
  else
  {
      fetch('http://localhost:3001/junior/request_coded', {
          method: 'post',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
              lead_id: lead_id,
              lead_phone_no: lead_phone_no,
              lead_name: lead_name,
              telecaller_id: telecaller_id,
              telecaller_name: username,
              referred: true
          })
      })
      .then(response => response.json())
      .then(resp => {
          reassignReferred(resp.lead_id);
          toast.success("Referral Request sent successfully", {
              position: toast.POSITION.TOP_CENTER,
              autoClose: 1500,
          });
      })
      .catch(err => {
          console.log(err);
          toast.warn("Unable to send referral request.Please try again.", {
              position: toast.POSITION.TOP_CENTER,
              autoClose: 1500,
          });
      })
  }
}
const [handleChange,setHandleChange]=useState('full_table');
const textChange=()=>{
  if(handleChange==='full_table' || handleChange==="*" ){
    setTempData(Data);
  }else{
    const newData=Data.filter((d)=>d[handleChange].toString().toLowerCase().startsWith(searchBar.toString().toLowerCase()));
    //console.log(JSON.stringify(newData)+" "+e.target.value+" "+Data[0][handleChange]);
    console.log(newData);  
    setTempData(newData);
  }
}

const dispatch=useDispatch();

const fetchData=(group)=>{
  const { telecaller_id } = currentUser;
    fetch('http://localhost:3001/junior/fetch_old_by_group', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                telecaller_id: telecaller_id,
                leadGroup:group
            })
        })
            .then(response => response.json())
            .then(resp => {
                setLoader(false);
                setData(resp);
                setTempData(resp);
            })
            .catch(err => {
                console.log(err);
                setLoader(false)
                toast.warn("Error Loading Table", {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 1500,
                });
            })
            if(handleChange==="*"||handleChange==="full_table"){
              textChange();
            }
        setLoader();
}

  useEffect(()=>{
    const { telecaller_id } = currentUser;
    fetch('http://localhost:3001/junior/fetch_old_by_group', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                telecaller_id: telecaller_id,
                leadGroup:leadGroup
            })
        })
            .then(response => response.json())
            .then(resp => {
                // console.log('fetch old',resp);
                setLoader(false);
                setData(resp);
                setTempData(resp);
            })
            .catch(err => {
                console.log(err);
                setLoader(false)
                toast.warn("Error Loading Table", {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 1500,
                });
            })
            if(handleChange==="*"||handleChange==="full_table"){
              textChange();
            }
  },[])

  const fetchNewLeads = () => {
    setLoader(true)
    const { telecaller_id, username, preferred_language } = currentUser;
    fetch('http://localhost:3001/junior/fetch_new', {
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
            }else if(resp==='Please Complete the Backlog first, before new fetch'){
              toast.warn("Please Complete the Backlog first, before new fetch.", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 3000,
            });
            }else if(resp==='Maximum new fetch limit exceeded'){
              toast.warn("Maximum new fetch limit exceeded", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 2000,
            });
            }
            else if (resp === 'less than 1') {
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
}
  
  const onGroupChange=(event)=>{
    setLeadGroup(event.target.value);
    console.log();
    fetchData(event.target.value);
  }

  return (
    <><JuniorModal changeTable={fetchData}/>
      <div className="JuniorBox">
        <div
          style={{
            width: "100%",
            padding: "1em",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <button className="btn" onClick={fetchNewLeads}>New Fetch</button>
        </div>
        <div className="buttons" style={{display: "flex", width:"100%",padding:'1em', justifyContent: "space-around"}}>
                <button className="btn" onClick={onGroupChange} style={{backgroundColor:(leadGroup==="A")?"black":"white",color:(leadGroup!="A")?"black":"white"}} value="A" id='0'>A</button>
                <button className="btn" onClick={onGroupChange} style={{backgroundColor:(leadGroup==="B")?"black":"white",color:(leadGroup!="B")?"black":"white"}} value="B" id='1'>B</button>
                <button className="btn" onClick={onGroupChange} style={{backgroundColor:(leadGroup==="C")?"black":"white",color:(leadGroup!="C")?"black":"white"}} value="C" id='2'>C</button>
            </div>
        <div
          className="buttons"
          style={{
            display: "flex",
            width: "100%",
            padding: "1em",
            justifyContent: "space-around",
          }}
        >
        </div>
        
        <div className="junior-tables">
          <div className="table-1 table-box">
            <div className="search_section" style={{xOverflow:"scroll"}}>
              <div
                style={{ paddingRight: "1em" }}
                className={"flex justify-end items-center center mt4 mb4"}
              >
                <label className={"b f3 ml1-ns mr3 "}>
                  Universal Search by :{" "}
                </label>
                <select
                  name="searchFilter"
                  // value={uFilter}
                  className={"f4 ml1 search_select "}
                  onChange={event=>{if(event.target.value==="full_table" || event.target.value==="*"){setTempData(Data);setHandleChange("");setSearchBar("");}else setHandleChange(event.target.value)}}
                >
                  <option value="full_table" onClick={()=>{setTempData(Data)}}>Full Table</option>
                  <option value="lead_id">Lead ID</option>
                  <option value="lead_name">Lead Name</option>
                  <option value="lead_phone_no">Lead Contact</option>
                </select>
              </div>
              <div
                style={{ paddingRight: "1em" }}
                className={"flex justify-center items-center center"}
              >
                {/* <label className={"b f3 ml1-ns mr3 mb0 uniSearch pa0"}>
                  Enter value :{" "}
                </label> */}
                <FormInput
                  type="text"
                  name="filter_value"
                  placeholder={"Enter Text"}
                  value={searchBar}
                  // value={universalFilter}
                  // onChange={(event) => handleUniSearch(event)}
                  // label={uFilter !== "*" ? `Enter ${uFilter}` : "Choose filter"}
                  onChange={(event)=>setSearchBar(event.target.value)}
                  style={{ marginTop: "0px", marginBottom: "0px", zIndex:"0" }}
                  // disabled={uFilter === "*" ? true : null}
                 
                  required
                />

                <AiOutlineSearch
                  style={{ marginLeft: "0" }}
                  onClick={(event) => textChange()}
                >
                  Filter
                </AiOutlineSearch>
              </div>
            </div>

            <table style={{width:"fit-content"}}>
              <tr
                className="table-header"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  borderRadius: "10px 10px 0 0",
                }}
              >
                <td>Lead Id</td>
                <td>Assigned to</td>
                <td>Lead Name</td>
                <td>Lead Contact</td>
                <td>Whatsapp Number</td>
                <td>Acc Opening Number</td>
                <td>Acc Opening Name</td>
                <td>City</td>
                <td>Trading Knowledge</td>
                <td>Preffered Language</td>
                <td>Status 1</td>
                <td>Status 2</td>
                <td>Handover Status</td>
                <td>Coded </td>
                <td>Broker Name</td>
                <td
                  style={{ border: "none", boxShadow: "none" }}
                  className="table_buttons"
                >
                  <button
                    style={{ border: "1px solid white", boxShadow: "none" }}
                    // style={{ backgroundColor: "#36A8AD" }}
                    // className="selector"
                  >
                    Controls
                  </button>
                  {/* <button
                    style={{ backgroundColor: "#FF4742" }}
                    className="selector"
                  >
                    Delete
                  </button>
                  <button
                    style={{ backgroundColor: "#2C974B" }}
                    className="selector"
                  >
                    Request
                  </button> */}
                </td>
              </tr>
              {!tempData[0]?<div style={{width:"100%",height:"100%",display:"flex",justifyContent:"center",alignItems:"center",padding:"2em",margin:"2em"}}><h2>Empty</h2></div>:null}
              {tempData.map((item, index) => {
                var flag=null;
                if(item.coded_flag)
                {
                    if(item.coded_flag==='yes')
                        flag=true
                }
                if(item.pending_flag){
                    if(item.pending_flag==='yes')
                        flag=true
                }
                if(item.handover_flag==='yes')
                    flag=true;
                if(item.delete_flag==='yes')
                    flag=true;
                if(item.referred)
                    flag=true
                return (
                  <tr
                    className="table-value"
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      backgroundColor:(!item.color || item.color==="")?"#ffffff":item.color,
                      color:(!item.color || item.color==="#ffffff" || item.color==="")?"#000000":"#ffffff"
                    }}
                  >
                    <td>{item.lead_id}</td>
                    <td>{item.assigned_to}</td>
                    <td>{item.lead_name}</td>
                    <td>{item.lead_phone_no}</td>
                    <td>{item.lead_whatsapp_no}</td>
                    <td>{item.account_opening_no}</td>
                    <td>{item.account_opening_name}</td>
                    <td>{item.lead_city}</td>
                    <td>{item.prior_knowledge}</td>
                    <td>{item.preferred_language}</td>
                    <td>{item.status_1}</td>
                    <td>{item.status_2}</td>
                    <td>{item.handover_status}</td>
                    <td>{item.coded}</td>
                    <td>{item.broker_name}</td>
                    <td
                      style={{ borderRight: "none" }}
                      className="table_buttons"
                    >
                      <button className="selector" disabled={flag} style={{ backgroundColor: (flag)?"#999999":"#36A8AD",color:"white", zIndex:"5" }}  onClick={() => {dispatch(setModalLead(item))}}>Update</button>
                      <button className="selector" disabled={flag} style={{ backgroundColor: (flag)?"#999999":"#FF4742" ,color:"white",zIndex:"5"}} onClick={() => {handoverHandler(item.lead_id, item.lead_phone_no);fetchData(leadGroup)}}>{item.referral_flag?"Delete":"Handover"}</button>
                      <button className="selector" disabled={flag} style={{ backgroundColor: (flag)?"#999999":"#2C974B",color:"white", zIndex:"5"}} onClick={() => {requestHandler(item.lead_id, item.lead_phone_no, item.lead_name);fetchData(leadGroup)}}>Request</button>
                    </td>
                  </tr>
                );
              })}
            </table>
            {/* <label className="boxName">{table}</label> */}
          </div>
        </div>
      </div>
    </>
  );
};


const mapStateToProps = createStructuredSelector({
  junior_table_logs: selectJuniorTableLogs,
  currentUser: selectCurrentUser,
  log_stat_array: selectJuniorLogStatArray
});


const mapDispatchToProps = dispatch => ({
  setLogStatArray: array => dispatch(setLogStatArray(array)),
  setJuniorTableLogArray: array => dispatch(setJuniorTableLogArray(array)),
  setModalVisibility: visible => dispatch(setModalVisibility(visible))
})
export default connect(mapStateToProps, mapDispatchToProps)(JuniorBox);
