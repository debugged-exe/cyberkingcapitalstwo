import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
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
import { createStructuredSelector } from 'reselect';
import { selectAdminRequestLanguage } from '../../redux/admin-panel/admin-request/admin.request.selectors.js';

// component
import AdminCodedTable from "./AdminCodedTable/AdminCodedTable";
import AdminDeleteTable from "./AdminDeleteTable/AdminDeleteTable";
import FormInput from '../FormInput/FormInput.js';
import CustomButton from "../CustomButton/CustomButton";
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

const AdminRequest = ({ currentUser, admin_request_language, setAdminCodedRequestArray, setAdminDeleteRequestArray, setAdminRequestLanguage, setAdminReferralRequestArray }) => {

    const [codedPageNumbers, setCodedPageNumbers] = useState([]);

    const [loader, setLoader] = useState(true)

    const [codedPages, setCodedPages] = useState(0);
    const perPage = 10;

    const [deletePageNumbers, setDeletePageNumbers] = useState([]);


    const [deletePages, setDeletePages] = useState(0);

    const [referralPages, setReferralPages] = useState([])

    const fetchReferral = () => {
        fetch('https://aqueous-mesa-28052.herokuapp.com/admin/fetch_referral_lead_pg_count', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                pgNo: 0,
                preferred_language: 'hindi'
            })
        })
            .then(response => response.json())
            .then(resp => {
                console.log(resp);
                if (resp.count) {
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
            headers: { 'Content-Type': 'application/json' },
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
                if (resp.count) {
                    var arr = [];
                    for (let i = 1; i <= Math.ceil(resp.count / perPage); i++) {
                        arr.push(i);
                    }
                    setCodedPageNumbers(arr)
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
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                pgNo: 0
            })
        })
            .then(response => response.json())
            .then(resp => {
                if (resp !== 'fail') {
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
                if (resp.count) {
                    var arr = [];
                    for (let i = 1; i <= Math.ceil(resp.count / perPage); i++) {
                        arr.push(i);
                    }
                    setDeletePageNumbers(arr)
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
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                pgNo: 0
            })
        })
            .then(response => response.json())
            .then(resp => {
                if (resp !== 'fail') {
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
        if (admin_request_language === 'hindi') {
            fetch('https://aqueous-mesa-28052.herokuapp.com/admin/fetch_coded_request_hindi', {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    pgNo: pgNo
                })
            })
                .then(response => response.json())
                .then(resp => {
                    if (resp !== 'fail') {
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
        else {
            fetch('https://aqueous-mesa-28052.herokuapp.com/admin/fetch_coded_request_marathi', {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    pgNo: pgNo
                })
            })
                .then(response => response.json())
                .then(resp => {
                    if (resp !== 'fail') {
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
        if (admin_request_language === 'hindi') {
            fetch('https://aqueous-mesa-28052.herokuapp.com/admin/fetch_delete_request_hindi', {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    pgNo: pgNo
                })
            })
                .then(response => response.json())
                .then(resp => {
                    if (resp !== 'fail') {
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
        else {
            fetch('https://aqueous-mesa-28052.herokuapp.com/admin/fetch_delete_request_marathi', {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    pgNo: pgNo
                })
            })
                .then(response => response.json())
                .then(resp => {
                    if (resp !== 'fail') {
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
            headers: { 'Content-Type': 'application/json' },
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
        console.log('language handler', event.target.value);
        setAdminRequestLanguage(event.target.value);


    }


    const handleAdminSearch = (event) => {
        setidFilterValue(event.target.value);

    }

    const [adminRequest, setAdminRequest] = useState('');

    const requestHandler = (event) => {
        console.log('request handler', event.target.value);
        setAdminRequest(event.target.value);
    }


    const handleAdminFilter = (event) => {

        if (adminRequest == 'coded_request' && idFilter != '*') {
            setCodedPageNumbers([1]);
        }
        else if (adminRequest == 'delete_request' && idFilter != '*') {
            setDeletePageNumbers([1]);
        }
        else if (adminRequest == 'referral_lead' && idFilter != '*') {
            setReferralPages([1]);
        }

        else if (idFilter == '*') {
                fetch('https://aqueous-mesa-28052.herokuapp.com/admin/fetch_requestLogs_pgCount', {
                    method: 'post',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        request_type: adminRequest,
                        preferred_language: admin_request_language
                    })
                })
                    .then(response => response.json())
                    .then(resp => {

                        if (resp.count) {
                            var arr = [];
                            for (let i = 1; i <= Math.ceil(resp.count / perPage); i++) {
                                arr.push(i);
                            }
                            if (adminRequest === 'delete_request') {
                                setDeletePageNumbers(arr);
                            }
                            else if (adminRequest === 'coded_request') {
                                setCodedPageNumbers(arr);
                            }
                            else {
                                setReferralPages(arr);
                            }

                        }
                    })
                    .catch(err => {
                        console.log(err)
                        toast.warn("Error loading handover requests.", {
                            position: toast.POSITION.TOP_CENTER,
                            autoClose: 1500,
                        });
                    })

                    fetch('https://aqueous-mesa-28052.herokuapp.com/admin/fetch_requestLogs', {
                        method: 'post',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            request_type: adminRequest,
                            pgNo:0,
                            preferred_language: admin_request_language
                        })
                    })
                        .then(response => response.json())
                        .then(resp => {

                           if(resp!='fail'){
                            if (adminRequest === 'delete_request') {

                                setAdminDeleteRequestArray(resp);
                            }
                            else if (adminRequest === 'coded_request') {
                                setAdminCodedRequestArray(resp);
                            }
                            else {
                                setAdminReferralRequestArray(resp);
                            }
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

            if (idFilter != '*') {
                fetch(`https://aqueous-mesa-28052.herokuapp.com/admin/fetch_requestLogs`, {
                    method: 'post',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        pgNo: 0,
                        field: idFilter == 'telecaller_id' ? 'telecaller_id' : 'lead_details.lead_id',
                        id: idFilterValue,
                        request_type: adminRequest,
                        preferred_language: admin_request_language
                    })
                })
                    .then(response => response.json())
                    .then(resp => {
                        if (resp !== 'fail') {

                            if (adminRequest === 'delete_request') {
                                setCodedVisibility('none');
                                setReferralVisibility('none');
                                setAdminDeleteRequestArray(resp);
                            }
                            else if (adminRequest === 'referral_lead') {
                                setCodedVisibility('none');
                                setDeleteVisibility('none');
                                setAdminReferralRequestArray(resp);
                            }
                            else {
                                setDeleteVisibility('none');
                                setReferralVisibility('none');
                                setAdminCodedRequestArray(resp);
                            }


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







        setidFilterValue('');
        setidFilter('*');



    }

    const [idFilter, setidFilter] = useState('*');
    const [idFilterValue, setidFilterValue] = useState('');

    const handleAdminChange = (event) => {
        console.log('admin change', event.target.value);
        setidFilter(event.target.value);

    }

    const handleAdminReset = (event) => {
        setCodedVisibility('block');
        setDeleteVisibility('block');
        setReferralVisibility('block');
        setidFilterValue('');
        setidFilter('*');

    }

    const [codedVisibility,setCodedVisibility]=useState('block');
    const [deleteVisibility,setDeleteVisibility]=useState('block');
    const [referralVisibility,setReferralVisibility]=useState('block');


    return (
        <div className={'admin-request-container'}>

    <CustomButton style={{ marginLeft: '2rem',marginTop:'2rem' }} onClick={(event) => handleAdminReset(event)} >Reset</CustomButton>

            <div className={' flex row justify-center items-center w-100'}>
               <div className="flex justify-center items-center center mt2 mb2 w-100">
                    <label className={'b f3 ml1-ns mr3'}>Select Language: </label>
                    <select name="lang" className={'f3 ml1'} onChange={(event) => langHandler(event)}>
                        <option value="hindi">Hindi</option>
                        <option value="marathi">Marathi</option>
                    </select>
                </div>

                <div className="flex justify-center items-center center mt4 mb4 w-100">
                    <label className={'b f3 ml1-ns mr3'}>Select Table: </label>
                    <select name="lang" className={'f3 ml1'} onChange={(event) => requestHandler(event)}>
                        <option value="select">--select--</option>
                        <option value="coded_request">Coded Request</option>
                        <option value="delete_request">Delete Request</option>
                        <option value="referral_lead">Referral Request</option>
                    </select>
                </div>


            </div>


            <div className=" flex row justify-center w-100">



                <div className={"flex justify-center items-center center mt4 mb4 w-100"}>
                    <label className={"b f3 ml1-ns mr3 "}>Search by:</label>
                    <select
                        name="searchFilter"
                        value={idFilter}
                        className={"f4 ml1 "}
                        onChange={(event) => handleAdminChange(event)}
                    >
                        <option value='*' >--select--</option>
                        <option value='lead_id' >Lead ID</option>
                        <option value="telecaller_id">Telecaller ID</option>

                    </select>
                </div>
                <div className={"flex justify-center items-center center w-100 "}>
                    <FormInput
                        type="text"
                        name="filter_value"
                        value={idFilterValue}
                        onChange={(event) => handleAdminSearch(event)}
                        label={idFilter !== '*' ? `Enter ${idFilter}` : 'Choose filter'}
                        style={{ marginTop: '0px', marginBottom: '0px' }}
                        disabled={idFilter === '*' ? true : null}
                        required
                    />
                    <CustomButton style={{ marginLeft: '2rem' }} onClick={(event) => handleAdminFilter(event)} >Filter</CustomButton>


                </div>
            </div>

            <div className=" w-100">

                <div className={'w-100'} style={{display:`${codedVisibility}`}}>
                <h1 className="pl4 pa2 f1 b">Coded Requests</h1>
                    <AdminCodedTable />
                    <div className="senior-request-pagination-container w-100 pb4">
                        <p>. . </p>
                        {
                            admin_request_language === 'hindi'
                                ?
                                codedPageNumbers.map((number, index) => (
                                    <button key={index} onClick={() => fetchHandoverNewPage(number - 1)} className="senior-request-page-btn">{number}</button>
                                ))
                                :
                                codedPageNumbers.map((number, index) => (
                                    <button key={index} onClick={() => fetchHandoverNewPage(number - 1)} className="senior-request-page-btn">{number}</button>
                                ))
                        }
                        <p>. . </p>
                    </div>
                </div>

                <div className="w-100" style={{display:`${deleteVisibility}`}} >
                    {<hr color={'gray'} className={'mt5 w-100'} />}
                    <h1 className="f1 b">Delete Requests</h1>
                    <div className={'w-100' }>
                        <AdminDeleteTable />
                    </div>
                    <div className="senior-request-pagination-container w-100 pb4">
                        <p>. . </p>
                        {
                            admin_request_language === 'hindi'
                                ?
                                deletePageNumbers.map((number, index) => (
                                    <button key={index} onClick={() => fetchDeleteNewPage(number - 1)} className="senior-request-page-btn">{number}</button>
                                ))
                                :
                                deletePageNumbers.map((number, index) => (
                                    <button key={index} onClick={() => fetchDeleteNewPage(number - 1)} className="senior-request-page-btn">{number}</button>
                                ))
                        }
                        <p>. . </p>
                    </div>
                </div>


                <div className="w-100" style={{display:`${referralVisibility}`}}>
                    {<hr color={'gray'} className={'mt5 w-100'} />}
                    <h1 className="f1 b">Referral Requests</h1>
                    <div className={'w-100'}>
                        <AdminReferralTable />
                    </div>
                    <div className="senior-request-pagination-container w-100 pb4">
                        <p>. . </p>
                        {
                            referralPages.map((number, index) => (
                                <button key={index} onClick={() => fetchReferralNewPage(number - 1)} className="senior-request-page-btn">{number}</button>
                            ))
                        }
                        <p>. . </p>
                    </div>
                </div>


            </div>
            <ToastContainer />
        </div>
    );
}

const mapStateToProps = createStructuredSelector({
    admin_request_language: selectAdminRequestLanguage
});

const mapDispatchToProps = dispatch => ({
    setAdminCodedRequestArray: array => dispatch(setAdminCodedRequestArray(array)),
    setAdminDeleteRequestArray: array => dispatch(setAdminDeleteRequestArray(array)),
    setAdminReferralRequestArray: array => dispatch(setAdminReferralRequestArray(array)),
    setAdminRequestLanguage: lang => dispatch(setAdminRequestLanguage(lang))
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminRequest);


// if (idFilter === '*' && idFilterValue === '') {
//     if (event.target.value === 'hindi') {
//         fetch('https://aqueous-mesa-28052.herokuapp.com/admin/fetch_coded_request_pgcount_hindi')
//             .then(response => response.json())
//             .then(resp => {
//                 if (resp.count) {
//                     var arr = [];
//                     for (let i = 1; i <= Math.ceil(resp.count / perPage); i++) {
//                         arr.push(i);
//                     }
//                     setCodedPageNumbers(arr)
//                 }
//             })
//             .catch(err => {
//                 console.log(err);
//                 toast.error("Error loading handover requests page count.", {
//                     position: toast.POSITION.TOP_CENTER,
//                     autoClose: 2500,
//                 });
//             })

//         fetch('https://aqueous-mesa-28052.herokuapp.com/admin/fetch_coded_request_hindi', {
//             method: 'post',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({
//                 pgNo: 0
//             })
//         })
//             .then(response => response.json())
//             .then(resp => {
//                 if (resp !== 'fail') {
//                     setAdminCodedRequestArray(resp);
//                 }
//             })
//             .catch(err => {
//                 console.log(err)
//                 toast.error("Error loading handover requests.", {
//                     position: toast.POSITION.TOP_CENTER,
//                     autoClose: 2500,
//                 });
//             })

//         fetch('https://aqueous-mesa-28052.herokuapp.com/admin/fetch_delete_request_pgcount_hindi')
//             .then(response => response.json())
//             .then(resp => {
//                 if (resp.count) {
//                     var arr = [];
//                     for (let i = 1; i <= Math.ceil(resp.count / perPage); i++) {
//                         arr.push(i);
//                     }
//                     setDeletePageNumbers(arr)
//                 }
//             })
//             .catch(err => {
//                 console.log(err);
//                 toast.error("Error loading delete requests page count.", {
//                     position: toast.POSITION.TOP_CENTER,
//                     autoClose: 2500,
//                 });
//             })

//         fetch('https://aqueous-mesa-28052.herokuapp.com/admin/fetch_delete_request_hindi', {
//             method: 'post',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({
//                 pgNo: 0
//             })
//         })
//             .then(response => response.json())
//             .then(resp => {
//                 if (resp !== 'fail') {
//                     setAdminDeleteRequestArray(resp);
//                 }
//             })
//             .catch(err => {
//                 console.log(err)
//                 toast.error("Error loading delete requests.", {
//                     position: toast.POSITION.TOP_CENTER,
//                     autoClose: 2500,
//                 });
//             })

//         fetch('https://aqueous-mesa-28052.herokuapp.com/admin/fetch_referral_lead_pg_count', {
//             method: 'post',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({
//                 pgNo: 0,
//                 preferred_language: 'hindi'
//             })
//         })
//             .then(response => response.json())
//             .then(resp => {
//                 console.log(resp);
//                 if (resp.count) {
//                     var arr = [];
//                     for (let i = 1; i <= Math.ceil(resp.count / perPage); i++) {
//                         arr.push(i);
//                     }
//                     setReferralPages(arr)
//                 }
//             })
//             .catch(err => {
//                 console.log(err);
//                 toast.error("Error loading handover requests page count.", {
//                     position: toast.POSITION.TOP_CENTER,
//                     autoClose: 2500,
//                 });
//             })

//         fetch('https://aqueous-mesa-28052.herokuapp.com/admin/fetch_referral_lead', {
//             method: 'post',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({
//                 pgNo: 0,
//                 preferred_language: 'hindi'
//             })
//         })
//             .then(response => response.json())
//             .then(resp => {
//                 console.log(resp)
//                 setAdminReferralRequestArray(resp);
//             })
//             .catch(err => {
//                 console.log(err);
//                 toast.error("Error loading handover requests page count.", {
//                     position: toast.POSITION.TOP_CENTER,
//                     autoClose: 2500,
//                 });
//             })
//     }
//     else if (event.target.value === 'marathi') {
//         fetch('https://aqueous-mesa-28052.herokuapp.com/admin/fetch_coded_request_pgcount_marathi')
//             .then(response => response.json())
//             .then(resp => {
//                 if (resp.count) {
//                     var arr = [];
//                     for (let i = 1; i <= Math.ceil(resp.count / perPage); i++) {
//                         arr.push(i);
//                     }
//                     setCodedPageNumbers(arr)
//                 }
//             })
//             .catch(err => {
//                 console.log(err);
//                 toast.error("Error loading handover requests page count.", {
//                     position: toast.POSITION.TOP_CENTER,
//                     autoClose: 2500,
//                 });
//             })

//         fetch('https://aqueous-mesa-28052.herokuapp.com/admin/fetch_coded_request_marathi', {
//             method: 'post',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({
//                 pgNo: 0
//             })
//         })
//             .then(response => response.json())
//             .then(resp => {
//                 if (resp !== 'fail') {
//                     setAdminCodedRequestArray(resp);
//                 }
//             })
//             .catch(err => {
//                 console.log(err)
//                 toast.error("Error loading handover requests.", {
//                     position: toast.POSITION.TOP_CENTER,
//                     autoClose: 2500,
//                 });
//             })

//         fetch('https://aqueous-mesa-28052.herokuapp.com/admin/fetch_delete_request_pgcount_marathi')
//             .then(response => response.json())
//             .then(resp => {
//                 if (resp.count) {
//                     var arr = [];
//                     for (let i = 1; i <= Math.ceil(resp.count / perPage); i++) {
//                         arr.push(i);
//                     }
//                     setDeletePageNumbers(arr)
//                 }
//             })
//             .catch(err => {
//                 console.log(err);
//                 toast.error("Error loading delete requests page count.", {
//                     position: toast.POSITION.TOP_CENTER,
//                     autoClose: 2500,
//                 });
//             })

//         fetch('https://aqueous-mesa-28052.herokuapp.com/admin/fetch_delete_request_marathi', {
//             method: 'post',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({
//                 pgNo: 0
//             })
//         })
//             .then(response => response.json())
//             .then(resp => {
//                 if (resp !== 'fail') {
//                     setAdminDeleteRequestArray(resp);
//                 }
//             })
//             .catch(err => {
//                 console.log(err)
//                 toast.error("Error loading delete requests.", {
//                     position: toast.POSITION.TOP_CENTER,
//                     autoClose: 2500,
//                 });
//             })

//         fetch('https://aqueous-mesa-28052.herokuapp.com/admin/fetch_referral_lead_pg_count', {
//             method: 'post',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({
//                 pgNo: 0,
//                 preferred_language: 'marathi'
//             })
//         })
//             .then(response => response.json())
//             .then(resp => {
//                 console.log(resp);
//                 if (resp.count) {
//                     var arr = [];
//                     for (let i = 1; i <= Math.ceil(resp.count / perPage); i++) {
//                         arr.push(i);
//                     }
//                     setReferralPages(arr)
//                 }
//             })
//             .catch(err => {
//                 console.log(err);
//                 toast.error("Error loading handover requests page count.", {
//                     position: toast.POSITION.TOP_CENTER,
//                     autoClose: 2500,
//                 });
//             })

//         fetch('https://aqueous-mesa-28052.herokuapp.com/admin/fetch_referral_lead', {
//             method: 'post',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({
//                 pgNo: 0,
//                 preferred_language: 'marathi'
//             })
//         })
//             .then(response => response.json())
//             .then(resp => {
//                 console.log(resp)
//                 setAdminReferralRequestArray(resp);
//             })
//             .catch(err => {
//                 console.log(err);
//                 toast.error("Error loading handover requests page count.", {
//                     position: toast.POSITION.TOP_CENTER,
//                     autoClose: 2500,
//                 });
//             })
//     }
// }
