import React,{useEffect,useState} from 'react';
import AdminSendIdTable from './AdminSendIdTable/AdminSendIdTable';
import {ToastContainer, toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

toast.configure();
const AdminSendId = () => {
    const [language, setLanguage] = useState('');
    const[data,setData] = useState([]);
    const [pages, setPages] = useState(0);
    const [pageNumbers, setPageNumbers] = useState([]);
    useEffect(() => {
        setData([]);
    }, [])

    const fetchNewPage = (pgNo) => {
        fetch('https://aqueous-mesa-28052.herokuapp.com/admin/fetch_processed_removed',{
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                pgNo : pgNo,
                preferred_language: language
            })
        })
            .then( resp => resp.json())
            .then(
                resp=>{
                    setData(resp)
                }
            )
            .catch(err=>console.log(err));
    }
    let handleChange;
    handleChange = (event) => {
        const {name, value} = event.target;
        if(value === 'hindi'){
            setLanguage('hindi');
            fetch('https://aqueous-mesa-28052.herokuapp.com/admin/fetch_processed_removed_page_count',{
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    preferred_language: "hindi"
                })
            })
                .then( resp => resp.json())
                .then(
                    resp=>{
                        setPages(resp.count);
                        var arr = [];
                        for (let i = 1; i <= resp.count; i++) {
                            arr.push(i);
                        }
                        setPageNumbers(arr);
                    }
                )
                .catch(err=>console.log(err));
        fetch('https://aqueous-mesa-28052.herokuapp.com/admin/fetch_processed_removed',{
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                pgNo : 0,
                preferred_language: "hindi"
            })
        })
            .then( resp => resp.json())
            .then(
                resp=>{
                    setData(resp)
                }
            )
            .catch(err=>console.log(err));
        }
        if(value==='marathi'){
            setLanguage('marathi');
            fetch('https://aqueous-mesa-28052.herokuapp.com/admin/fetch_processed_removed_page_count',{
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    preferred_language: "marathi"
                })
            })
                .then( resp => resp.json())
                .then(
                    resp=>{
                        setPages(resp.count);
                        var arr = [];
                        for (let i = 1; i <= resp.count; i++) {
                            arr.push(i);
                        }
                        setPageNumbers(arr);
                    }
                )
                .catch(err=>console.log(err));
            fetch('https://aqueous-mesa-28052.herokuapp.com/admin/fetch_processed_removed',{
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    pgNo : 0,
                    preferred_language: "marathi"
                })
            })
                .then( resp => resp.json())
                .then(
                    resp=>{
                        setData(resp)
                    }
                )
                .catch(err=>console.log(err));
        }
    }
    return (
        <div className='mt2'>
            <div className={'flex justify-center items-center center mb4 f2 w-100 mt4'}>
            <label className={'b mr3'}>Select Language: </label>
            <select name="lang" className={'f3 ml1'} onChange={handleChange}>
                <option value="*" >--select--</option>
                <option value="hindi">Hindi</option>
                <option value="marathi">Marathi</option>
            </select>
        </div>
            <AdminSendIdTable data={data} language={language} setData={setData}/>
            <div className="junior-log-pagination-container pb4">
                <p>. . </p>
                {pageNumbers.map((number, index) => (
                    <button key={index} onClick={() => fetchNewPage(number-1)} className="junior-log-page-btn">{number}</button>
                ))}
                <p>. . </p>
            </div>
            <ToastContainer/>
        </div>
    )
}

export default AdminSendId;
