import React, {useState} from 'react';
import './AdminViewLogs.scss';
import PaymentCard from "../PaymentCard/PaymentCard";
import * as FaIcons from "react-icons/fa";
import FormInput from "../FormInput/FormInput";
import CustomButton from "../CustomButton/CustomButton";
import AdminViewLogsTable from "./AdminViewLogsTable/AdminViewLogsTable";
import Pagination from "../Pagination/Pagination";

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


const AdminViewLogs = () => {
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
    return (<div className={'admin-view-log-container'}>
        <div className="admin-view-log-count">
            <PaymentCard Heading={'Hindi Count'} numeric={500} icon={<FaIcons.FaLanguage size={'5rem'} color={'rgb(57, 73, 171)'}/>}/>
            <PaymentCard Heading={'Marathi Count'} numeric={500} icon={<FaIcons.FaLanguage size={'5rem'} color={'rgb(67, 160, 71)'}/>}/>
        </div>
        <hr color={'grey'} className={'mt4 mb4'}/>
        <div className={'flex justify-center items-center center mb4 f2 w-100 mt4'}>
            <label className={'b mr3'}>Select Language: </label>
            <select name="lang" className={'f3 ml1'}>
                <option value="hindi">Hindi</option>
                <option value="marathi">Marathi</option>
            </select>
        </div>
        <div className={' admin-view-log-filter-container center  mb4 f2 w-100 mt4'}>
            <label className={'b mr3'}>Filters : </label>
            <FormInput type="text"
                       name="Filter"
                       value={filter}
                       onChange={(event) => filterHandler(event)}
                       label="Select Filter"
                       style={{marginTop: '0px', marginBottom: '0px'}}
                       required />
            <CustomButton style={{ marginLeft:'5px'}}> Search </CustomButton>
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

export default AdminViewLogs;