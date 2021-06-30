import React from 'react';

// redux
import { connect } from 'react-redux';

// reselect
import {createStructuredSelector} from 'reselect';
import {selectAdminCodedRequestArray, selectAdminRequestLanguage} from '../../../redux/admin-panel/admin-request/admin.request.selectors.js';

// components
import * as AiIcons from 'react-icons/ai';
import * as ImIcons from 'react-icons/im';

// css
import './AdminCodedTable.scss';

const header = [
    "Sr.No",
    "Telecaller Id",
    "Telecaller Name",
    "Lead Id",
    "Lead Name"
]

const AdminCodedTable = ({admin_coded_request_array, admin_request_language}) => {
    return(
        <div className={'admin-coded-table-container'}>
            <button className="accept-all">Accept All</button>
            <table cellSpacing="1" className={'admin-coded-table-box'}>
                <thead className={'admin-coded-table-head-container'}>
                <tr>
                    {header.map((item, index) => {
                        return (
                            <th className={'admin-coded-table-header-container'}>{item}</th>
                        );
                    })}
                </tr>
                </thead>
                <tbody className={'admin-coded-table-body-container'}>
                {admin_coded_request_array.filter(item => item.preferred_language===admin_request_language).map((item, index) => {
                    return (
                        <tr key={index} className="admin-coded-table-row-container">
                            <td className={'admin-coded-table-data-container'} data-label={'Sr.No'}>{index+1}</td>
                            <td className={'admin-coded-table-data-container'} data-label={'Telecaller Id'}>{item.telecaller_id}</td>
                            <td className={'admin-coded-table-data-container'} data-label={'Telecaller Name'}>{item.telecaller_name}</td>
                            <td className={'admin-coded-table-data-container'} data-label={'Lead Id'}>{item.lead_id}</td>
                            <td className={'admin-coded-table-data-container'} data-label={'Lead Name'}>{item.lead_name}</td>
                            <td className={'admin-coded-table-data-container pointer'}><AiIcons.AiFillCheckCircle className={'btn-center'} size={'2rem'} color={'green'}/></td>
                            <td className={'admin-coded-table-data-container pointer'}><ImIcons.ImCross className={'btn-center'} size={'1.5rem'} color={'red'}/></td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
        </div>
    );
}

const mapStateToProps = createStructuredSelector({
    admin_coded_request_array: selectAdminCodedRequestArray,
    admin_request_language: selectAdminRequestLanguage
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps)(AdminCodedTable);