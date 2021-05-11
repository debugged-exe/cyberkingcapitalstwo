import React from 'react';
import './SeniorPayment.scss';
import PaymentCard from "../PaymentCard/PaymentCard";
import * as HiIcons from 'react-icons/hi';
import * as RiIcons from 'react-icons/ri';
import * as BsIcons from 'react-icons/bs';
import * as BiIcons from 'react-icons/bi';
import SeniorPaymentTable from "./SeniorPaymentTable/SeniorPaymentTable";

const PaymentCardArray = [
    {
        title: 'Points Earned',
        numeric: <><BiIcons.BiRupee size={'2rem'}/>70</>,
        icon: <HiIcons.HiCurrencyRupee size={'4rem'} color={'rgb(57, 73, 171)'}/>
    },
    {
        title: 'Payment Recieved',
        numeric: <><BiIcons.BiRupee size={'2rem'}/>70</>,
        icon: <RiIcons.RiHandCoinLine size={'4rem'} color={'rgb(67, 160, 71)'}/>
    },
    {
        title: 'Bonus Received',
        numeric: <><BiIcons.BiRupee size={'2rem'}/>70</>,
        icon: <BsIcons.BsFillGiftFill size={'3rem'} color={'rgb(229, 57, 53)'}/>
    }
]

const SeniorPayment = () => {
    return(
        <div className={''}>
            <p style={{fontFamily: 'Open Sans Condensed', fontSize: '2rem', fontWeight: 'bold', textAlign: 'center'}}>Senior Payment Details</p>
            <div className="card-array-container-senior">
                {
                    PaymentCardArray.map((item,index) => {
                        return(<PaymentCard key={index} Heading={item.title} numeric={item.numeric} icon={item.icon} />);
                    })
                }
            </div>
            <hr color={'grey'} className={'mt4 mb5'}/>
            <div className={'mb5'}>
                <SeniorPaymentTable/>
            </div>
        </div>
    );
}

export default SeniorPayment;

