import React, {Component, useEffect, useState} from 'react';
import './AdminBlockedTelecallerTable.scss';
import * as AiIcons from "react-icons/ai";
import * as ImIcons from "react-icons/im";
import {toast, ToastContainer} from "react-toastify";

const header = [
    "Sr.no",
    "Telecaller ID",
    "Language"
]

const AdminBlockedTelecallerTable = ({data}) => {
    // const [data, setData] = useState([]);
    // useEffect(()=>{
    //     fetch('https://aqueous-mesa-28052.herokuapp.com/admin/fetch_blocked',{
    //         method: 'post',
    //         headers: {'Content-Type': 'application/json'},
    //         body: JSON.stringify({
    //
    //         })
    //     })
    //         .then( resp => resp.json())
    //         .then( resp => {
    //             setData(resp);
    //         })
    //         .catch( err => {
    //             toast.error(`${err}`,{
    //                 position: toast.POSITION.TOP_CENTER,
    //                 autoClose: 2500
    //             });
    //             console.log(err);
    //         })
    // },[]);
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
                            data.map((item, index) => {
                            return (
                                <tr key={index} className="admin-blocked-table-row-container">
                                    <td className={'admin-blocked-table-data-container'} data-label={'Sr.No'}>{index+1}</td>
                                    <td className={'admin-blocked-table-data-container'} data-label={'Telecaller Id'}>{item.telecaller_id}</td>
                                    <td className={'admin-blocked-table-data-container'} data-label={'Language'}>{item.preferred_language}</td>
                                    {/*<td className={'admin-blocked-table-data-container '}>*/}
                                    {/*    <button className={'btn-center pointer'} size={'1.5rem'} color={'red'}>Unblock</button>*/}
                                    {/*</td>*/}
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                    <ToastContainer/>
                </div>
        );
}


export default AdminBlockedTelecallerTable;
