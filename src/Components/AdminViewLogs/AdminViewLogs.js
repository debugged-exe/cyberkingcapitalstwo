import React, {useState} from 'react';

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
import Pagination from "../Pagination/Pagination";
import {useReduxContext} from "react-redux/lib/hooks/useReduxContext";

const tableLogs = [
    {
        lead_id: 1,
        assigned_to: "xyz",
        lead_name: "abcde",
        lead_contact: 9087389032,
        whatsapp_no: 8903221111,
        account_opening_no: 123,
        city: "pune",
        trading_knowledge: "no",
        preferred_language: "hindi",
        status_1: "complete",
        status_2: "uncomplete",
        handover_status: "complete",
        coded: "---",
        payment: "done"
    },
    {
        lead_id: 2,
        assigned_to: "mmmmm",
        lead_name: "oooooo",
        lead_contact: 9000001222,
        whatsapp_no: 9090912121,
        account_opening_no: 8011,
        city: "pune",
        trading_knowledge: "no",
        preferred_language: "marathi",
        status_1: "complete",
        status_2: "uncomplete",
        handover_status: "complete",
        coded: "---",
        payment: "no"
    },
    {
        lead_id: 1,
        assigned_to: "xyz",
        lead_name: "abcde",
        lead_contact: 9087389032,
        whatsapp_no: 8903221111,
        account_opening_no: 123,
        city: "pune",
        trading_knowledge: "no",
        preferred_language: "hindi",
        status_1: "complete",
        status_2: "uncomplete",
        handover_status: "complete",
        coded: "---",
        payment: "done"
    },
    {
        lead_id: 2,
        assigned_to: "mmmmm",
        lead_name: "oooooo",
        lead_contact: 9000001222,
        whatsapp_no: 9090912121,
        account_opening_no: 8011,
        city: "pune",
        trading_knowledge: "no",
        preferred_language: "marathi",
        status_1: "complete",
        status_2: "uncomplete",
        handover_status: "complete",
        coded: "---",
        payment: "no"
    },
    {
        lead_id: 1,
        assigned_to: "xyz",
        lead_name: "abcde",
        lead_contact: 9087389032,
        whatsapp_no: 8903221111,
        account_opening_no: 123,
        city: "pune",
        trading_knowledge: "no",
        preferred_language: "hindi",
        status_1: "complete",
        status_2: "uncomplete",
        handover_status: "complete",
        coded: "---",
        payment: "done"
    },
    {
        lead_id: 2,
        assigned_to: "mmmmm",
        lead_name: "oooooo",
        lead_contact: 9000001222,
        whatsapp_no: 9090912121,
        account_opening_no: 8011,
        city: "pune",
        trading_knowledge: "no",
        preferred_language: "marathi",
        status_1: "complete",
        status_2: "uncomplete",
        handover_status: "complete",
        coded: "---",
        payment: "no"
    }
]


const AdminViewLogs = ({setAdminLogsArray, admin_count_array}) => {
    const [filter,setFilter] = useState("");
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(2);
    //
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);

    const filterHandler = (event) => {
        setFilter(event.target.value);
        console.log(filter);
    }

    const [filterValue, setFilterValue] = useState('');
    const setFilterValueHandler = (event) => {
        setFilterValue(event.target.value);
    }

    const onSubmitHandler = (event) => {
        event.preventDefault();
    }

    return (<div className={'admin-view-log-container'}>
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
            <select name="lang" className={'f3 ml1'}>
                <option value="hindi">Hindi</option>
                <option value="marathi">Marathi</option>
            </select>
        </div>
        <div className={'flex justify-center items-center center  f2 w-100 mt4'}>
            <label className={'b mr3'}>Select Filter: </label>
            <select name="lang" className={'f3 ml1'}>
                <option value="">--Select Filter--</option>
                <option value="lead_id">Lead ID</option>
                <option value="assigned_to">Assigned To</option>
                <option value="lead_name">Lead Name</option>
                <option value="lead_contact">Lead Contact</option>
                <option value="status_1">Status 1</option>
                <option value="status_2">Status 2</option>
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
                <CustomButton style={{marginLeft: '0px'}} onClick ={() => setAdminLogsArray(tableLogs)} >Fetch</CustomButton>
            </form>
        </div>
        <div className={'w-100 mb4'}>
            <AdminViewLogsTable tableLogs = {tableLogs}/>
            <Pagination
                postsPerPage={postsPerPage}
                totalPosts={tableLogs.length}
                paginate={paginate}
            />
        </div>
    </div>);
}

const mapStateToProps = createStructuredSelector({
    admin_count_array: selectAdminCountArray
});

const mapDispatchToProps = dispatch =>({
    setAdminLogsArray: array => dispatch(setAdminLogsArray(array))
});
export default connect(mapStateToProps,mapDispatchToProps)(AdminViewLogs);