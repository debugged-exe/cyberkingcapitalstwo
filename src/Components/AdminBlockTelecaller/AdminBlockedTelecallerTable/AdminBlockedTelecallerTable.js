import React, {Component, useEffect, useState} from 'react';
import './AdminBlockedTelecallerTable.scss';
import {toast, ToastContainer} from "react-toastify";
import 'tachyons';
import {connect} from "react-redux";
import {createStructuredSelector} from "reselect";
import {
    selectAdminBlockTelecallerTable
} from "../../../redux/admin-panel/admin-block-telecaller/admin.block.telecaller.selectors";

const header = [
    "Sr.no",
    "Telecaller ID",
    "Language"
]

const AdminBlockedTelecallerTable = ({admin_block_telecaller_table,handleSubmit}) => {
        return (
                <div className={'admin-blocked-table-container'}>
                    <table cellSpacing="1" className={'admin-blocked-table-box'}>
                        <thead className={'admin-blocked-table-head-container'}>
                        <tr>
                            {header.map((item, index) => {
                                return (
                                    <th className={'admin-blocked-table-header-container'} key={index}>{item}</th>
                                );
                            })}
                        </tr>
                        </thead>
                        <tbody className={'admin-blocked-table-body-container'}>
                        {
                            admin_block_telecaller_table.map((item, index) => {
                            return (
                                <tr key={index} className="admin-blocked-table-row-container">
                                    <td className={`admin-blocked-table-data-container ${item.blocked?'bg-light-red':'bg-white'}`} data-label={'Sr.No'}>{index+1}</td>
                                    <td className={`admin-blocked-table-data-container ${item.blocked?'bg-light-red':'bg-white'}`} data-label={'Telecaller Id'}>{item.telecaller_id}</td>
                                    <td className={`admin-blocked-table-data-container ${item.blocked?'bg-light-red':'bg-white'}`} data-label={'Language'}>{item.preferred_language}</td>
                                    <td className={`admin-blocked-table-data-container ${item.blocked?'bg-light-red':'bg-white'}`}>
                                        <button className={'btn-center pointer'} onClick={() => handleSubmit(item.telecaller_id,index)} size={'1.5rem'} color={'red'}>{item.blocked?'Unblock':'Block'}</button>
                                    </td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                    <ToastContainer/>
                </div>
        );
}
const mapStateToProps = createStructuredSelector({
    admin_block_telecaller_table: selectAdminBlockTelecallerTable
})
export default connect(mapStateToProps, null)(AdminBlockedTelecallerTable);
