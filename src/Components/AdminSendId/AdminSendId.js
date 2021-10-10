import React,{useEffect,useState} from 'react';
import AdminSendIdTable from './AdminSendIdTable/AdminSendIdTable';
const AdminSendId = () => {

    const[data,setData] = useState([]);


    useEffect(() => {
        fetch('https://aqueous-mesa-28052.herokuapp.com/admin/fetch_processed_removed',{
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                pgNo : 0,      
            })
        })
        .then( resp => resp.json())
        .then(
            resp=>{
            console.log(resp)
            setData(resp)
            }
        )
        .catch(err=>console.log(err));
    }, [])


    return (
        <div className='mt2'>
            <div className={'flex justify-center items-center center mb4 f2 w-100 mt4'}>
            <label className={'b mr3'}>Select Language: </label>
            <select name="lang" className={'f3 ml1'}>
                <option value="*" >--select--</option>
                <option value="hindi">Hindi</option>
                <option value="marathi">Marathi</option>
            </select>
        </div>
            <AdminSendIdTable data={data}/>
        </div>
    )
}

export default AdminSendId;
