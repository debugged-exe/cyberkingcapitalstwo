import React, {useEffect} from 'react';
import {ToastContainer,toast} from 'react-toastify';
//redux
import {setJuniorPaymentArray} from "../../redux/junior-panel/junior-payment/junior.payment.actions";
import {connect} from "react-redux";

//reselect
import {createStructuredSelector} from "reselect";
import {selectJuniorPaymentArray} from "../../redux/junior-panel/junior-payment/junior.payment.selectors";

//css
import './JuniorPayment.scss';

//components
import PaymentCard from "../PaymentCard/PaymentCard";
import * as HiIcons from 'react-icons/hi';
import * as RiIcons from 'react-icons/ri';
import * as BsIcons from 'react-icons/bs';
import * as BiIcons from 'react-icons/bi';
import {selectCurrentUser} from "../../redux/user/user.selectors";

const PaymentCardArray = [
    {
        title: 'Points Earned',
        numeric:<><BiIcons.BiRupee size={'2rem'}/>70</>,
        icon: <HiIcons.HiCurrencyRupee size={'4rem'} color={'rgb(57, 73, 171)'}/>
    },
    {
        title: 'Payment Received',
        numeric: <><BiIcons.BiRupee size={'2rem'}/>70</>,
        icon: <RiIcons.RiHandCoinLine size={'4rem'} color={'rgb(67, 160, 71)'}/>
    },
    {
        title: 'Points Pending',
        numeric: <><BiIcons.BiRupee size={'2rem'}/>70</>,
        icon: <BsIcons.BsClockHistory size={'4rem'} color={'rgb(204,204,0)'}/>
    },
    {
        title: 'Referral Earned',
        numeric: <><BiIcons.BiRupee size={'2rem'}/>70</>,
        icon: <HiIcons.HiCurrencyRupee size={'4rem'} color={'rgb(57, 73, 171)'}/>
    },
    {
        title: 'Referral Paid',
        numeric: <><BiIcons.BiRupee size={'2rem'}/>70</>,
        icon: <RiIcons.RiHandCoinLine size={'4rem'} color={'rgb(67, 160, 71)'}/>
    },
    {
        title: 'Referral Pending',
        numeric: <><BiIcons.BiRupee size={'2rem'}/>70</>,
        icon: <BsIcons.BsClockHistory size={'4rem'} color={'rgb(204,204,0)'}/>
    },
    {
        title: 'Bonus Earned',
        numeric: <><BiIcons.BiRupee size={'2rem'}/>70</>,
        icon: <BsIcons.BsFillGiftFill size={'3rem'} color={'rgb(229, 57, 53)'}/>
    }
]

const JuniorPayment = ({currentUser,setJuniorPaymentArray, junior_payment_array}) => {
    useEffect(() => {
        const { telecaller_id } = currentUser;
        fetch('https://aqueous-mesa-28052.herokuapp.com/junior/payments',{
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                telecaller_id: telecaller_id
            })
        })
            .then( resp => resp.json())
            .then( resp => {
                PaymentCardArray.map((item) =>{
                    if(item.title === 'Points Earned'){
                        item.numeric = resp[0].points_earned
                    }
                    if(item.title === 'Payment Received'){
                        item.numeric = resp[0].points_paid
                    }
                    if(item.title === 'Bonus Earned'){
                        item.numeric = resp[0].bonus_earned
                    }
                    if(item.title === 'Referral Earned')
                    {
                        item.numeric = resp[0].referral_points_earned
                    }
                    if(item.title === 'Referral Paid')
                    {
                        item.numeric = resp[0].referral_points_paid
                    }
                    if(item.title === 'Referral Pending')
                    {
                        item.numeric = resp[0].referral_points_earned - resp[0].referral_points_paid
                    }
                    if(item.title === 'Points Pending')
                    {
                        item.numeric = resp[0].points_earned - resp[0].points_paid
                    }
                })
                setJuniorPaymentArray(PaymentCardArray);
            })
            .catch( err => {
                console.log(err);
                toast.warn( `${err}`, {
                    position: toast.POSITION.TOP_CENTER,
                    autoclose: 2500
                })
            })
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
            <ToastContainer/>
        </div>
    );
}
const mapStateToProps = createStructuredSelector({
    junior_payment_array: selectJuniorPaymentArray,
    currentUser: selectCurrentUser
});
const mapDispatchToProps = dispatch => ({
    setJuniorPaymentArray: array => dispatch(setJuniorPaymentArray(array))
});
export default connect(mapStateToProps, mapDispatchToProps)(JuniorPayment);

