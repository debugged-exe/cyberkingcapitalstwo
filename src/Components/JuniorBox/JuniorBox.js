import React,{useState} from "react";
import "./JuniorBox.scss";

const JuniorBox = () =>{
    const [newFetchVisibility,setNewFetchVisibility]=useState(true);

    const [table,setTable]=useState('0');
    
    const onClick=(event)=>{
        setTable(event.target.id);
    }
    
    return(
        <>
        <div style={{width: "100%", height: "100%",padding:'1em',zIndex:'11'}}>
            <div style={{width: "100%",padding:'1em',display:'flex',justifyContent:'center',alignItems:'center'}}>
                <button >New Fetch</button>
            </div>
            <div className="buttons" style={{display: "flex", width:"100%",padding:'1em', justifyContent: "space-around"}}>
                <button onClick={onClick} id='0'>A</button>
                <button onClick={onClick} id='1'>B</button>
                <button onClick={onClick} id='2'>C</button>
            </div>
            {table}
        </div>
        </>
    );
}

export default JuniorBox;
