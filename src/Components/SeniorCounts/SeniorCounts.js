import React, {useEffect, useState} from 'react';
import {ToastContainer,toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import PaymentCard from "../PaymentCard/PaymentCard";
import * as FaIcons from "react-icons/fa";
import './SeniorCounts.scss';
const SeniorCounts = () => {
    const [counts, setCounts] = useState({
        hindi_assigned:0,
        hindi_pending: 0,
        hindi_processed: 0,
        hindi_unassigned: 0,
        marathi_assigned: 0,
        marathi_pending: 0,
        marathi_processed: 0,
        marathi_unassigned: 0
    });
    useEffect(() => {
        fetch('https://aqueous-mesa-28052.herokuapp.com/senior/view_counts')
            .then( resp=>resp.json())
            .then( resp => {
                setCounts(resp[0]);
            })
            .catch( err => {
                console.log( err );
                toast.warn( 'count error. refresh',{
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 2500
                })
            })
    },[])
    return (
        <div className={'senior-counts-container'}>
            <PaymentCard Heading={'Unassigned Hindi'} icon={<FaIcons.FaLanguage size={'5rem'} color={'red'}/>} numeric={counts.hindi_unassigned}/>
            <PaymentCard Heading={'Unassigned marathi'} icon={<FaIcons.FaLanguage size={'5rem'} color={'green'}/>} numeric={counts.marathi_unassigned}/>
            <PaymentCard Heading={'Assigned Hindi'} icon={<FaIcons.FaLanguage size={'5rem'} color={'red'}/>} numeric={counts.hindi_assigned}/>
            <PaymentCard Heading={'Assigned Marathi'} icon={<FaIcons.FaLanguage size={'5rem'} color={'green'}/>} numeric={counts.marathi_assigned}/>
            <PaymentCard Heading={'Pending Hindi'} icon={<FaIcons.FaLanguage size={'5rem'} color={'red'}/>} numeric={counts.hindi_pending}/>
            <PaymentCard Heading={'Pending Marathi'} icon={<FaIcons.FaLanguage size={'5rem'} color={'green'}/>} numeric={counts.marathi_pending}/>
            <PaymentCard Heading={'Processed Hindi'} icon={<FaIcons.FaLanguage size={'5rem'} color={'red'}/>} numeric={counts.hindi_processed}/>
            <PaymentCard Heading={'Processed Marathi'} icon={<FaIcons.FaLanguage size={'5rem'} color={'green'}/>} numeric={counts.marathi_processed}/>
            <ToastContainer/>
        </div>
    );
}

export default SeniorCounts;