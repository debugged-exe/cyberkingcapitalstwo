import React, {useEffect} from 'react';
import './JuniorPayment.scss';
import PaymentCard from "../PaymentCard/PaymentCard";
import * as HiIcons from 'react-icons/hi';
import * as RiIcons from 'react-icons/ri';
import * as BsIcons from 'react-icons/bs';
import * as BiIcons from 'react-icons/bi';
import {connect} from "react-redux";
import {setJuniorPaymentArray} from "../../redux/junior-panel/junior-payment/junior.payment.actions";
const PaymentCardArray = [
    {
        title: 'Points Earned',
        numeric:<><BiIcons.BiRupee size={'2rem'}/>70</>,
        icon: <HiIcons.HiCurrencyRupee size={'4rem'} color={'rgb(57, 73, 171)'}/>
    },
    {
        title: 'Payment Recieved',
        numeric: <><BiIcons.BiRupee size={'2rem'}/>70</>,
        icon: <RiIcons.RiHandCoinLine size={'4rem'} color={'rgb(67, 160, 71)'}/>
    },
    {
        title: 'Bonus Earned',
        numeric: <><BiIcons.BiRupee size={'2rem'}/>70</>,
        icon: <BsIcons.BsFillGiftFill size={'3rem'} color={' rgb(229, 57, 53)'}/>
    }
]

const JuniorPayment = ({setJuniorPaymentArray, junior_payment_array}) => {
    useEffect(() => {
        setJuniorPaymentArray(PaymentCardArray);
    },[]);
    return(
        <div>
            <p style={{fontFamily: 'Open Sans Condensed', fontSize: '2rem', fontWeight: 'bold', textAlign: 'center'}}>Junior Payment Details</p>
            <div className="card-array-container">
            	{
                    junior_payment_array.map((item,index) => {
                        return(<PaymentCard key={index} Heading={item.title} numeric={item.numeric} icon={item.icon} />);
                    })
                }
            </div>
        </div>
    );
}
const mapStateToProps = ({junior_panel: {junior_payment}}) => ({
    junior_payment_array: junior_payment.junior_payment_array
});
const mapDispatchToProps = dispatch => ({
    setJuniorPaymentArray: array => dispatch(setJuniorPaymentArray(array))
});
export default connect(mapStateToProps, mapDispatchToProps)(JuniorPayment);

