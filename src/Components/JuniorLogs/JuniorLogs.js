import React,{useState} from 'react';
import LogCard from './LogCard.js';
import CustomButton from '../CustomButton/CustomButton.js';
import FormInput from '../FormInput/FormInput.js';
import './JuniorLogs.scss';
import JuniorTable from "./JuniorTable/JuniorTable";
import JuniorModal from "./JuniorModal/JuniorModal";

const LogStatArray = [
    {
        title: 'Handed Over Leads',
        numeric: 70,
    },
    {
        title: 'Status 1 Updated',
        numeric: 70,
    },
    {
        title: 'Status 2 Updated',
        numeric: 70,
    },
    {
        title: 'Unattended',
        numeric: 70,
    },
    {
        title: 'Coded',
        numeric: 70,
    },
    {
        title: 'Pending Requests',
        numeric: 70,
    },
]

const JuniorLogs = () => {

    const [filter, setFilter] = useState('');

    const handleChange = (event) => {
        setFilter(event.target.value);
    }

    const [modal, setModal] = useState(false);
    const modalHandler = (item) => {
        setModal(item);
    }

    const [lead, setLead] = useState({});
    const leadHandler = (item) => {
        setLead(item);
        setModal(true);
    }

	return (
		<div className="junior-logs">
			<p style={{fontFamily: 'Open Sans Condensed', fontSize: '2rem', fontWeight: 'bold', textAlign: 'center'}}>View Logs</p>
			<div className="stats">
           		{
           			LogStatArray.map((item,index) => {
           				return(<LogCard key={index} Heading={item.title} numeric={item.numeric} />);
           			})
           		}
            </div>
            <div className="button-container center">
                <CustomButton style={{marginLeft: '0'}}>Fetch</CustomButton>
                <div className="filter-container">
                    <FormInput
                    label="Filter"
                    name="filter"
                    type="text"
                    value={filter}
                    handleChange={handleChange}
                    required
                    />
                    <CustomButton style={{marginLeft: '0'}}>Go</CustomButton>
                </div>
            </div>
            <div className={'mt4 w-100 mb4'}>
                <JuniorTable leadHandler={leadHandler}/>
            </div>
            <JuniorModal lead={lead} modal={modal} modalHandler={modalHandler}/>
		</div>
	)
}

export default JuniorLogs;