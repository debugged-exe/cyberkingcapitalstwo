import React from 'react';
import './AdminRequest.scss';
import AdminCodedTable from "./AdminCodedTable/AdminCodedTable";

const AdminRequest = () => {
    return (
        <div className={'admin-request-container'}>
            <div className={'flex justify-center items-center center mb4 f2 w-100 mt4'}>
                <label className={'b mr3'}>Select Language: </label>
                <select name="lang" className={'f3 ml1'}>
                    <option value="hindi">Hindi</option>
                    <option value="marathi">Marathi</option>
                </select>
            </div>
            <div className={'w-100'}>
                <AdminCodedTable />
            </div>
        </div>
    );
}

export default AdminRequest;