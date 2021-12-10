import React,{useEffect, useState} from 'react';
import {ToastContainer,toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {AiOutlineContacts, AiOutlineSearch} from 'react-icons/ai';

// redux
import { connect } from 'react-redux';
import {
    setAdminCodedRequestArray,
    setAdminDeleteRequestArray,
    setAdminRequestLanguage,
    setAdminReferralRequestArray
} from '../../redux/admin-panel/admin-request/admin.request.actions.js'

// reselect
import {createStructuredSelector} from 'reselect';
import {selectAdminRequestLanguage} from '../../redux/admin-panel/admin-request/admin.request.selectors.js';

// component
import AdminCodedTable from "./AdminCodedTable/AdminCodedTable";
import AdminDeleteTable from "./AdminDeleteTable/AdminDeleteTable";
import FormInput from '../FormInput/FormInput.js';
import AdminReferralTable from "./AdminReferralTable/AdminReferralTable";

// css
import './AdminRequest.scss';

const codedtableLogs = [
    {
        telecaller_id: "JR0001",
        telecaller_name: "tanmay",
        lead_id: "SR9012",
        lead_name: "tejas",
        preferred_language: 'hindi'
    },
    {
        telecaller_id: "JR002",
        telecaller_name: "soham",
        lead_id: "SR99283",
        lead_name: "sumedh",
        preferred_language: 'marathi'
    }
]

const deletetableLogs = [
    {
        telecaller_id: "JR0001",
        telecaller_name: "tanmay",
        lead_id: "SR9012",
        lead_name: "tejas",
        preferred_language: 'hindi'
    },
    {
        telecaller_id: "JR002",
        telecaller_name: "soham",
        lead_id: "SR99283",
        lead_name: "sumedh",
        preferred_language: 'marathi'
    }
]

toast.configure();

const AdminRequest = ({currentUser ,admin_request_language, setAdminCodedRequestArray, setAdminDeleteRequestArray, setAdminRequestLanguage, setAdminReferralRequestArray}) => {

    const [codedPageNumbersMarathi, setCodedPageNumbersMarathi] = useState([]);
    const [codedPageNumbersHindi, setCodedPageNumbersHindi] = useState([]);
    const [loader, setLoader] = useState(true)

    const [codedPages, setCodedPages] = useState(0);
    const perPage = 10;

    const [deletePageNumbersHindi, setDeletePageNumbersHindi] = useState([]);
    const [deletePageNumbersMarathi, setDeletePageNumbersMarathi] = useState([]);

    const [deletePages, setDeletePages] = useState(0);

    const [referralPages, setReferralPages] = useState([])

    const fetchReferral = () => {
        fetch('https://aqueous-mesa-28052.herokuapp.com/admin/fetch_referral_lead_pg_count', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                pgNo: 0,
                preferred_language: 'hindi'
            })
        })
        .then(response => response.json())
        .then(resp => {
            console.log(resp);
            if(resp.count)
            {
                var arr = [];
                for (let i = 1; i <= Math.ceil(resp.count / perPage); i++) {
                    arr.push(i);
                }
                setReferralPages(arr)
            }
        })
        .catch(err => {
            console.log(err);
            toast.warn("Error loading handover requests page count.", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 1500,
            });
        })

        fetch('https://aqueous-mesa-28052.herokuapp.com/admin/fetch_referral_lead', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                pgNo: 0,
                preferred_language: 'hindi'
            })
        })
        .then(response => response.json())
        .then(resp => {
            console.log(resp)
           setAdminReferralRequestArray(resp);
        })
        .catch(err => {
            console.log(err);
            toast.warn("Error loading handover requests page count.", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 1500,
            });
        })
    }

    const fetchHandover = () => {
        fetch('https://aqueous-mesa-28052.herokuapp.com/admin/fetch_coded_request_pgcount_hindi')
        .then(response => response.json())
        .then(resp => {
            if(resp.count)
            {
                var arr = [];
                for (let i = 1; i <= Math.ceil(resp.count / perPage); i++) {
                    arr.push(i);
                }
                setCodedPageNumbersHindi(arr)
            }
        })
        .catch(err => {
            console.log(err);
            toast.warn("Error loading handover requests page count.", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 1500,
            });
        })

        fetch('https://aqueous-mesa-28052.herokuapp.com/admin/fetch_coded_request_hindi', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                pgNo: 0
            })
        })
        .then(response => response.json())
        .then(resp => {
            if(resp!=='fail')
            {
                setAdminCodedRequestArray(resp);
            }
        })
        .catch(err => {
            console.log(err)
            toast.warn("Error loading handover requests.", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 1500,
            });
        })
    }

    const fetchDelete = () => {
        fetch('https://aqueous-mesa-28052.herokuapp.com/admin/fetch_delete_request_pgcount_hindi')
        .then(response => response.json())
        .then(resp => {
            if(resp.count)
            {
                var arr = [];
                for (let i = 1; i <= Math.ceil(resp.count / perPage); i++) {
                    arr.push(i);
                }
                setDeletePageNumbersHindi(arr)
            }
        })
        .catch(err => {
            console.log(err);
            toast.warn("Error loading delete requests page count.", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 1500,
            });
        })

        fetch('https://aqueous-mesa-28052.herokuapp.com/admin/fetch_delete_request_hindi', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                pgNo: 0
            })
        })
        .then(response => response.json())
        .then(resp => {
            if(resp!=='fail')
            {
                setAdminDeleteRequestArray(resp);
            }
        })
        .catch(err => {
            console.log(err)
            toast.warn("Error loading delete requests.", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 1500,
            });
        })
    }

    const fetchHandoverNewPage = (pgNo) => {
        if(admin_request_language==='hindi')
        {
            fetch('https://aqueous-mesa-28052.herokuapp.com/admin/fetch_coded_request_hindi', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                pgNo: pgNo
            })
            })
            .then(response => response.json())
            .then(resp => {
                if(resp!=='fail')
                {
                    setAdminCodedRequestArray(resp);
                }
            })
            .catch(err => {
                console.log(err)
                toast.warn("Error loading handover requests.", {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 1500,
                });
            })
        }
        else
        {
            fetch('https://aqueous-mesa-28052.herokuapp.com/admin/fetch_coded_request_marathi', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                pgNo: pgNo
            })
            })
            .then(response => response.json())
            .then(resp => {
                if(resp!=='fail')
                {
                    setAdminCodedRequestArray(resp);
                }
            })
            .catch(err => {
                console.log(err)
                toast.warn("Error loading handover requests.", {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 1500,
                });
            })
        }
    }

    const fetchDeleteNewPage = (pgNo) => {
        if(admin_request_language==='hindi')
        {
            fetch('https://aqueous-mesa-28052.herokuapp.com/admin/fetch_delete_request_hindi', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                pgNo: pgNo
            })
            })
            .then(response => response.json())
            .then(resp => {
                if(resp!=='fail')
                {
                    setAdminDeleteRequestArray(resp);
                }
            })
            .catch(err => {
                console.log(err)
                toast.warn("Error loading handover requests.", {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 1500,
                });
            })
        }
        else
        {
            fetch('https://aqueous-mesa-28052.herokuapp.com/admin/fetch_delete_request_marathi', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                pgNo: pgNo
            })
            })
            .then(response => response.json())
            .then(resp => {
                if(resp!=='fail')
                {
                    setAdminDeleteRequestArray(resp);
                }
            })
            .catch(err => {
                console.log(err)
                toast.warn("Error loading handover requests.", {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 1500,
                });
            })
        }
    }

    const fetchReferralNewPage = (pgNo) => {
        fetch('https://aqueous-mesa-28052.herokuapp.com/admin/fetch_referral_lead', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                pgNo: pgNo,
                preferred_language: admin_request_language
            })
        })
        .then(response => response.json())
        .then(resp => {
            console.log(resp)
           setAdminReferralRequestArray(resp);
        })
        .catch(err => {
            console.log(err);
            toast.warn("Error loading handover requests page count.", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 1500,
            });
        })
    }

    useEffect(() => {
        fetchHandover();
        fetchDelete();
        fetchReferral();
    }, [])

    const langHandler = (event) => {
        setAdminRequestLanguage(event.target.value)

    }


    const handleAdminSearch=(event)=>{
        setAdminFilter(event.target.value);

    }

    const handleAdminFilter = (event) => {

        if(admin_request_language==='hindi'){
            setCodedPageNumbersHindi([1]);
        }
        else{
            setCodedPageNumbersMarathi([1]);
        }
        if(aFilter=='lead_id')
        {
            fetch(`https://aqueous-mesa-28052.herokuapp.com/admin/fetch_coded_request_${admin_request_language}`, {
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    pgNo: 0,
                    field: 'lead_details.lead_id',
                    id: adminFilter
                })
            })
            .then(response => response.json())
            .then(resp => {

                if(resp!=='fail')
                {
                    setAdminCodedRequestArray(resp);
                }
            })
            .catch(err => {
                console.log(err)
                toast.warn("Error loading coded requests.", {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 1500,
                });
            })
        }
            else if(aFilter=='telecaller_id'){
                fetch(`https://aqueous-mesa-28052.herokuapp.com/admin/fetch_coded_request_${admin_request_language}`, {
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    pgNo: 0,
                    field: 'telecaller_id',
                    id: adminFilter
                })
            })
            .then(response => response.json())
            .then(resp => {
                if(resp!=='fail')
                {

                    setAdminCodedRequestArray(resp);
                }
            })
            .catch(err => {
                console.log(err)
                toast.warn("Error loading coded requests.", {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 1500,
                });
            })
            }

            setAdminFilter('');
            setaFilter('*');


    }

    const [aFilter, setaFilter] = useState('*');
    const [adminFilter, setAdminFilter] = useState('');

    const handleAdminChange = (event) => {
        setaFilter(event.target.value);
    }


    const [filteredData, setFilteredData] = useState([]);



    return (
        <div className={'admin-request-container'}>
            <h1 className="f1 b">Coded Requests</h1>
            <div className={'flex justify-center items-center center mb4 f3 w-100 mt4'}>
                <label className={'b mr3'}>Select Language: </label>
                <select name="lang" className={'f3 ml1'} onChange={(event) => langHandler(event)}>
                    <option value="hindi">Hindi</option>
                    <option value="marathi">Marathi</option>
                </select>
            </div>
            <div className={"flex justify-center items-center center mt4 mb4 w-100"}>
                    <label className={"b f3 ml1-ns mr3 "}>Search by:</label>
                    <select
                        name="searchFilter"
                        value={aFilter}
                        className={"f4 ml1 "}
                        onChange={(event) => handleAdminChange(event)}
                    >
                        <option value='*' >--select--</option>
                        <option value='lead_id' >Lead ID</option>
                        <option value="telecaller_id">Telecaller ID</option>

                    </select>
                </div>
                <div className={"flex justify-center items-center center w-100 "}>
                    {/* <label className={"b f3 ml1-ns mr3 mb0 uniSearch pa0"}>Enter value : </label> */}
                    <FormInput
                        type="text"
                        name="filter_value"
                        value={adminFilter}
                        onChange={(event)=> handleAdminSearch(event)}
                        label={aFilter !== '*' ? `Enter ${aFilter}` : 'Choose filter'}
                        style={{ marginTop: '0px', marginBottom: '0px' }}
                        disabled={aFilter === '*' ? true : null}
                        required
                    />

                <AiOutlineSearch  style={{marginLeft: '0'}} onClick={(event) => handleAdminFilter(event)}>Filter</AiOutlineSearch>

                </div>
            <div className={'w-100'}>
                <AdminCodedTable />
                <div className="senior-request-pagination-container w-100 pb4">
                    <p>. . </p>
                    {
                        admin_request_language==='hindi'
                        ?
                        codedPageNumbersHindi.map((number, index) => (
                            <button key={index} onClick={() => fetchHandoverNewPage(number-1)} className="senior-request-page-btn">{number}</button>
                        ))
                        :
                        codedPageNumbersMarathi.map((number, index) => (
                            <button key={index} onClick={() => fetchHandoverNewPage(number-1)} className="senior-request-page-btn">{number}</button>
                        ))
                    }
                    <p>. . </p>
                </div>
            </div>
            {<hr color={'gray'} className={'mt5 w-100'}/>}
            <h1 className="f1 b">Delete Requests</h1>
            <div className={'w-100'}>
                <AdminDeleteTable />
            </div>
            <div className="senior-request-pagination-container w-100 pb4">
                <p>. . </p>
                {
                    admin_request_language==='hindi'
                    ?
                    deletePageNumbersHindi.map((number, index) => (
                        <button key={index} onClick={() => fetchDeleteNewPage(number-1)} className="senior-request-page-btn">{number}</button>
                    ))
                    :
                    deletePageNumbersMarathi.map((number, index) => (
                        <button key={index} onClick={() => fetchDeleteNewPage(number-1)} className="senior-request-page-btn">{number}</button>
                    ))
                }
                <p>. . </p>
            </div>
            {<hr color={'gray'} className={'mt5 w-100'}/>}
            <h1 className="f1 b">Referral Requests</h1>
            <div className={'w-100'}>
                <AdminReferralTable />
            </div>
            <div className="senior-request-pagination-container w-100 pb4">
                <p>. . </p>
                {
                    referralPages.map((number, index) => (
                        <button key={index} onClick = {() => fetchReferralNewPage(number-1)} className="senior-request-page-btn">{number}</button>
                    ))
                }
                <p>. . </p>
            </div>
            <ToastContainer />
        </div>
    );
}

const mapStateToProps =  createStructuredSelector({
    admin_request_language: selectAdminRequestLanguage
});

const mapDispatchToProps = dispatch => ({
    setAdminCodedRequestArray: array => dispatch(setAdminCodedRequestArray(array)),
    setAdminDeleteRequestArray: array => dispatch(setAdminDeleteRequestArray(array)),
    setAdminReferralRequestArray: array => dispatch(setAdminReferralRequestArray(array)),
    setAdminRequestLanguage: lang => dispatch(setAdminRequestLanguage(lang))
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminRequest);
