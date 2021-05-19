import React from 'react';
import './AdminRequest.scss';
import AdminCodedTable from "./AdminCodedTable/AdminCodedTable";
import AdminDeleteTable from "./AdminDeleteTable/AdminDeleteTable";

const AdminRequest = () => {
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

export default AdminRequest;