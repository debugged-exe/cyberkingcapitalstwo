import React,{useEffect} from 'react';

// redux
import { connect } from 'react-redux';
import {setAdminCodedRequestArray, setAdminDeleteRequestArray} from '../../redux/admin-panel/admin-request/admin.request.actions.js'

// component
import AdminCodedTable from "./AdminCodedTable/AdminCodedTable";
import AdminDeleteTable from "./AdminDeleteTable/AdminDeleteTable";

// css
import './AdminRequest.scss';

const codedtableLogs = [
    {
        telecaller_id: "JR0001",
        telecaller_name: "tanmay",
        lead_id: "SR9012",
        lead_name: "tejas"
    },
    {
        telecaller_id: "JR002",
        telecaller_name: "soham",
        lead_id: "SR99283",
        lead_name: "sumedh"
    }
]

const deletetableLogs = [
    {
        telecaller_id: "JR0001",
        telecaller_name: "tanmay",
        lead_id: "SR9012",
        lead_name: "tejas"
    },
    {
        telecaller_id: "JR002",
        telecaller_name: "soham",
        lead_id: "SR99283",
        lead_name: "sumedh"
    }
]

const AdminRequest = ({setAdminCodedRequestArray, setAdminDeleteRequestArray}) => {

    useEffect(() => {
       setAdminCodedRequestArray(codedtableLogs);
       setAdminDeleteRequestArray(deletetableLogs);
    }, [])

    return (
        <div className={'admin-request-container'}>
            <h1 className="f1 b">Coded Requests</h1>
            <div className={'flex justify-center items-center center mb4 f3 w-100 mt4'}>
                <label className={'b mr3'}>Select Language: </label>
                <select name="lang" className={'f3 ml1'}>
                    <option value="hindi">Hindi</option>
                    <option value="marathi">Marathi</option>
                </select>
            </div>
            <div className={'w-100'}>
                <AdminCodedTable />
            </div>
            {<hr color={'gray'} className={'mt5 w-100'}/>}
            <h1 className="f1 b">Delete Requests</h1>
            <div className={'w-100'}>
                <AdminDeleteTable />
            </div>
        </div>
    );
}

const mapStateToProps = (state) => ({
    

})

const mapDispatchToProps = dispatch => ({
    setAdminCodedRequestArray: array => dispatch(setAdminCodedRequestArray(array)),
    setAdminDeleteRequestArray: array => dispatch(setAdminDeleteRequestArray(array))
});

export default connect(null, mapDispatchToProps)(AdminRequest);