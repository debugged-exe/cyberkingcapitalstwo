import React, {useState} from 'react';
import { toast } from 'react-toastify';

export const AdminDeleteLead = () => {
    const [leadId, setLeadId] = useState();
    const submitHandler = (e) => {
        e.preventDefault();
        console.log(leadId);
        fetch('https://aqueous-mesa-28052.herokuapp.com/admin/delete-lead', {
            method: 'delete',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                lead_id: leadId,
            })
        })
        .then(resp => resp.json())
        .then(resp => {
            toast.success('Name:' + resp[0].lead_name + 'Lead_ID' + resp[0].lead_id ,{
                position: toast.POSITION.TOP_CENTER,
                autoClose: 1500
            })
        })
        .catch(error=>{
            console.log(error);
        })
    }
    return (
        <div className='tc'>
            <h1>Enter Lead Id</h1>
            <div className='flex flex-column justify-center item-center'>
                <form onSubmit={submitHandler}>
                    <input 
                    placeholder='Enter Lead ID' 
                    className='f4'
                    type='text'
                    required
                    value={leadId}
                    onChange={(e)=>setLeadId(e.target.value)}
                    />
                    <button>Delete Lead</button>
                </form>
            </div>
        </div>
    )
}
