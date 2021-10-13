import React,{useEffect, useState} from 'react';
import {ToastContainer,toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

const AdminRequest = ({admin_request_language, setAdminCodedRequestArray, setAdminDeleteRequestArray, setAdminRequestLanguage, setAdminReferralRequestArray}) => {

    const [codedPageNumbersMarathi, setCodedPageNumbersMarathi] = useState([]);
    const [codedPageNumbersHindi, setCodedPageNumbersHindi] = useState([]);

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
            toast.error("Error loading handover requests page count.", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 2500,
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
            toast.error("Error loading handover requests page count.", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 2500,
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
            toast.error("Error loading handover requests page count.", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 2500,
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
            toast.error("Error loading handover requests.", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 2500,
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
            toast.error("Error loading delete requests page count.", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 2500,
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
            toast.error("Error loading delete requests.", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 2500,
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
                toast.error("Error loading handover requests.", {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 2500,
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
                toast.error("Error loading handover requests.", {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 2500,
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
                toast.error("Error loading handover requests.", {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 2500,
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
                toast.error("Error loading handover requests.", {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 2500,
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
            toast.error("Error loading handover requests page count.", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 2500,
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
        if(event.target.value==='hindi')
        {
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
                toast.error("Error loading handover requests page count.", {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 2500,
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
                toast.error("Error loading handover requests.", {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 2500,
                });
            })

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
                toast.error("Error loading delete requests page count.", {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 2500,
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
                toast.error("Error loading delete requests.", {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 2500,
                });
            })

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
                toast.error("Error loading handover requests page count.", {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 2500,
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
                toast.error("Error loading handover requests page count.", {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 2500,
                });
            })
        }
        else
        {
            fetch('https://aqueous-mesa-28052.herokuapp.com/admin/fetch_coded_request_pgcount_marathi')
            .then(response => response.json())
            .then(resp => {
                if(resp.count)
                {
                    var arr = [];
                    for (let i = 1; i <= Math.ceil(resp.count / perPage); i++) {
                        arr.push(i);
                    }
                    setCodedPageNumbersMarathi(arr)
                }
            })
            .catch(err => {
                console.log(err);
                toast.error("Error loading handover requests page count.", {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 2500,
                });
            })

            fetch('https://aqueous-mesa-28052.herokuapp.com/admin/fetch_coded_request_marathi', {
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
                toast.error("Error loading handover requests.", {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 2500,
                });
            })

            fetch('https://aqueous-mesa-28052.herokuapp.com/admin/fetch_delete_request_pgcount_marathi')
            .then(response => response.json())
            .then(resp => {
                if(resp.count)
                {
                    var arr = [];
                    for (let i = 1; i <= Math.ceil(resp.count / perPage); i++) {
                        arr.push(i);
                    }
                    setDeletePageNumbersMarathi(arr)
                }
            })
            .catch(err => {
                console.log(err);
                toast.error("Error loading delete requests page count.", {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 2500,
                });
            })

            fetch('https://aqueous-mesa-28052.herokuapp.com/admin/fetch_delete_request_marathi', {
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
                toast.error("Error loading delete requests.", {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 2500,
                });
            })

            fetch('https://aqueous-mesa-28052.herokuapp.com/admin/fetch_referral_lead_pg_count', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                pgNo: 0,
                preferred_language: 'marathi'
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
                toast.error("Error loading handover requests page count.", {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 2500,
                });
            })

            fetch('https://aqueous-mesa-28052.herokuapp.com/admin/fetch_referral_lead', {
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    pgNo: 0,
                    preferred_language: 'marathi'
                })
            })
            .then(response => response.json())
            .then(resp => {
                console.log(resp)
               setAdminReferralRequestArray(resp);
            })
            .catch(err => {
                console.log(err);
                toast.error("Error loading handover requests page count.", {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 2500,
                });
            })
        }
    }

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