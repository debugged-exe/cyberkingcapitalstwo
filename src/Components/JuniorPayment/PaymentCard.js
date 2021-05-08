import React from 'react';
import * as MdIcons from 'react-icons/md';
const PaymentCard = () => {
    return(
        <div className={'payment-card-container'}>
            <div className={'content-container'}>
                <h2>Heading</h2>
                <p>₹10000000</p>
            </div>
            <div className={'payment-logo'}>
                <MdIcons.MdAttachMoney size={'2rem'} />
            </div>
        </div>
    );
}
export default PaymentCard;