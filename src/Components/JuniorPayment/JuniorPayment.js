import React from 'react';
import './JuniorPayment.scss';
import PaymentCard from "./PaymentCard";
import * as HiIcons from 'react-icons/hi';
import * as RiIcons from 'react-icons/ri';
import * as BsIcons from 'react-icons/bs';

const PaymentCardArray = [
    {
        title: 'Points Earned',
        numeric: 70,
        icon: <HiIcons.HiCurrencyRupee size={'4rem'} color={'rgb(57, 73, 171)'}/>
    },
    {
        title: 'Payment Recieved',
        numeric: 70,
        icon: <RiIcons.RiHandCoinLine size={'4rem'} color={'rgb(67, 160, 71)'}/>
    },
    {
        title: 'Bonus Earned',
        numeric: 70,
        icon: <BsIcons.BsFillGiftFill size={'3rem'} color={'rgb(67, 160, 71)'}/>
    }
]

const JuniorPayment = () => {
    return(
        <div>
            <p style={{fontFamily: 'Open Sans Condensed', fontSize: '2rem', fontWeight: 'bold', textAlign: 'center'}}>Junior Payment Details</p>
            <div className="card-array-container">
            	{
                    PaymentCardArray.map((item,index) => {
                        return(<PaymentCard key={index} Heading={item.title} numeric={item.numeric} icon={item.icon} />);
                    })
                }
            </div>
        </div>
    );
}

export default JuniorPayment;

