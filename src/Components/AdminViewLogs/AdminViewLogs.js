import React, {useEffect, useState} from 'react';
import {ToastContainer,toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
//redux
import {connect} from 'react-redux';
import {setAdminLogsArray} from "../../redux/admin-panel/admin-logs/admin.logs.actions";

//reselect
import {createStructuredSelector} from "reselect";
import {selectAdminCountArray} from "../../redux/admin-panel/admin-count/admin.count.selectors";

//css
import './AdminViewLogs.scss';

//Components
import PaymentCard from "../PaymentCard/PaymentCard";
import * as FaIcons from "react-icons/fa";
import FormInput from "../FormInput/FormInput";
import CustomButton from "../CustomButton/CustomButton";
import AdminViewLogsTable from "./AdminViewLogsTable/AdminViewLogsTable";
import {setAdminCountArray} from "../../redux/admin-panel/admin-count/admin.count.actions";

toast.configure();

const AdminViewLogs = ({setAdminLogsArray, admin_count_array}) => {

    useEffect(() => {
        fetch('https://aqueous-mesa-28052.herokuapp.com/admin/processed_counts',{
        })
            .then( resp => resp.json())
            .then( resp => {
                admin_count_array.map( (item, index) => {
                    switch (item.Heading){
                        case 'Hindi Count':
                            item.numeric = resp[0].hindi;
                            break;
                        case 'Marathi Count':
                            item.numeric = resp[0].marathi;
                            break;
                        default:
                            break;
                    }
                })
                setAdminCountArray(admin_count_array);
            })
            .catch( err => {
                console.log(err);
                toast.error('counts error',{
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 2500
                })
            })
    }, [])
    const [pages, setPages] = useState(0);
    const [pageNumbers, setPageNumbers] = useState([]);
    const perPage = 10;

    const [language,setLanguage] = useState("*");

    const setLanguageHandler = (event) => {
        setLanguage(event.target.value);
    }

    const [filter,setFilter] = useState("");

    const setFilterHandler = (event) => {
        setFilter(event.target.value);
        console.log(filter);
    }

    const [filterValue, setFilterValue] = useState('');
    const setFilterValueHandler = (event) => {
        setFilterValue(event.target.value);
    }

    const onSubmitHandler = (event) => {
        event.preventDefault();
        fetch('https://aqueous-mesa-28052.herokuapp.com/admin/view_logs/count',{
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                field: filter,
                payload: filterValue
            })
        })
            .then( resp => resp.json())
            .then( resp => {
                setPages(resp.count);
                var arr = [];
                for (let i = 1; i <= Math.ceil(resp.count / perPage); i++) {
                    arr.push(i);
                }
                setPageNumbers(arr);
            })
            .catch( err => {
                console.log(err);
                toast.error( 'count error. try again', {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 2500
                })
            })
        fetch('https://aqueous-mesa-28052.herokuapp.com/admin/view_logs', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                field: filter,
                payload: filterValue,
                pgNo: 0
            })
        }).then( resp => resp.json())
            .then( resp => {
                console.log(resp);
                if(resp !== "fail" )
                    setAdminLogsArray(resp);
            })
            .catch( err => {
                console.log(err);
                toast.error('error table. try again',{
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 2500
                })
            })
    }

    const fetchViewLogsNewPage = (pgNo) => {
        fetch('https://aqueous-mesa-28052.herokuapp.com/admin/view_logs', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                field: filter,
                payload: filterValue,
                pgNo: pgNo
            })
        })
            .then( resp => resp.json())
            .then( resp => {
                if( resp !== 'fail')
                    setAdminLogsArray(resp);
            })
            .catch( err => {
                console.log(err);
                toast.error('error table. try again',{
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 2500
                })
            })
    }

    return (
        <div className={'admin-view-log-container'}>

        <div className="admin-view-log-count">
            {
                admin_count_array.map((item,index) => {
                    return(
                        <PaymentCard Heading={item.Heading} numeric={item.numeric} icon={<FaIcons.FaLanguage size={'5rem'} color={item.color}/>}/>
                    );
                })
            }
        </div>
        <hr color={'grey'} className={'mt4 mb4'}/>
        <div className={'flex justify-center items-center center mb4 f2 w-100 mt4'}>
            <label className={'b mr3'}>Select Language: </label>
            <select name="lang" className={'f3 ml1'} onChange={(event) => setLanguageHandler(event)}>
                <option value="*" >--select--</option>
                <option value="hindi">Hindi</option>
                <option value="marathi">Marathi</option>
            </select>
        </div>
        <div className={'flex justify-center items-center center  f2 w-100 mt4'}>
            <label className={'b mr3'}>Select Filter: </label>
            <select name="lang" className={'f3 ml1'} onChange={(event) => setFilterHandler(event)} required>
                <option value="">--Select Filter--</option>
                <option value="lead_id">Lead ID</option>
                <option value="assigned_to">Assigned To</option>
                <option value="lead_name">Lead Name</option>
                <option value="lead_phone_no">Lead Contact</option>
                <option value="status_1">Status 1</option>
                <option value="status_2">Status 2</option>
                <option value='account_opening_no'>Account Opening No</option>
            </select>
        </div>
        <div className="flex flex-column justify-center items-center mb4">
            <form onSubmit={(event) => onSubmitHandler(event)}>
                <FormInput
                type="text"
                name="filterValue"
                value={filterValue}
                onChange={(event) => setFilterValueHandler(event)}
                label="Filter Value"
                style={{marginTop: '0px', marginBottom: '0px'}}
                required
                />
                <CustomButton style={{marginLeft: '0px'}}  type='submit' >Filter</CustomButton>
            </form>
        </div>
        <div className={'w-100 mb4'}>
            <AdminViewLogsTable language={language}/>
            <div className="admin-view-log-pagination-container pb4">
                <p>. . </p>
                {pageNumbers.map((number, index) => (
                    <button key={index} onClick={() => fetchViewLogsNewPage(number-1)} className="admin-view-log-page-btn">{number}</button>
                ))}
                <p>. . </p>
            </div>
        </div>
            <ToastContainer />
    </div>);
}

const mapStateToProps = createStructuredSelector({
    admin_count_array: selectAdminCountArray
});

const mapDispatchToProps = dispatch =>({
    setAdminLogsArray: array => dispatch(setAdminLogsArray(array))
});
export default connect(mapStateToProps,mapDispatchToProps)(AdminViewLogs);