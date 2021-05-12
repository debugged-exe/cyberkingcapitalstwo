import React from 'react';
import AdminPayment from '../../Components/AdminPayment/AdminPayment.js';
import AdminRegistration from '../../Components/AdminRegistration/AdminRegistration.js';
import './AdminPanel.scss';

const AdminPanel = () => {
    return (
        <div>
            <AdminPayment />
            <AdminRegistration />
        </div>
    );
}

export default AdminPanel;

