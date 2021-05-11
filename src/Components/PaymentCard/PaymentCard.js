import React from 'react';
import * as RiIcons from 'react-icons/ri';
import * as BiIcons from 'react-icons/bi';
import './PaymentCard.scss';

const PaymentCard = ({Heading, numeric,icon}) => {
    return(
        <div className={'payment-card-container shadow-4'}>
            <div className={'content-container'}>
                <p className="card-header b">{Heading}</p>
                <p className="price flex justify-center">{numeric}</p>
            </div>
            <div className={'payment-logo'}>
                {icon}
            </div>
        </div>
    );
}
export default PaymentCard;