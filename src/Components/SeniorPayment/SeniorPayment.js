import React,{useEffect}from 'react';
import {ToastContainer,toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

// redux
import { connect } from 'react-redux';
import {setSeniorPaymentArray, setSeniorPaymentTableLog} from '../../redux/senior-panel/senior-payment/senior.payment.actions.js';

//reselect
import {createStructuredSelector} from "reselect";
import {selectSeniorPaymentArray} from "../../redux/senior-panel/senior-payment/senior.payment.selectors";
// css
import './SeniorPayment.scss';

// component
import PaymentCard from "../PaymentCard/PaymentCard";
import * as HiIcons from 'react-icons/hi';
import * as RiIcons from 'react-icons/ri';
import * as BsIcons from 'react-icons/bs';
import * as BiIcons from 'react-icons/bi';
import SeniorPaymentTable from "./SeniorPaymentTable/SeniorPaymentTable";
import {selectCurrentUser} from "../../redux/user/user.selectors";

const PaymentCardArray = [
    {
        title: 'Points Earned',
        numeric: <><BiIcons.BiRupee size={'2rem'}/>70</>,
        icon: <HiIcons.HiCurrencyRupee size={'4rem'} color={'rgb(57, 73, 171)'}/>
    },
    {
        title: 'Payment Received',
        numeric: <><BiIcons.BiRupee size={'2rem'}/>70</>,
        icon: <RiIcons.RiHandCoinLine size={'4rem'} color={'rgb(67, 160, 71)'}/>
    },
    {
        title: 'Bonus Received',
        numeric: <><BiIcons.BiRupee size={'2rem'}/>70</>,
        icon: <BsIcons.BsFillGiftFill size={'3rem'} color={'rgb(229, 57, 53)'}/>
    }
]

const tableData = [
    {
        telecaller_id: "Jr001",
        telecaller_name: "xyz",
        points_earned: 50
    },
    {
        telecaller_id: "Jr002",
        telecaller_name: "abc",
        points_earned: 60
    },
    {
        telecaller_id: "Jr003",
        telecaller_name: "lmn",
        points_earned: 70
    }
]

const SeniorPayment = ({currentUser,setSeniorPaymentArray, setSeniorPaymentTableLog, senior_payment_array}) => {

    useEffect(() => {
        const {telecaller_id} = currentUser;
        fetch('https://aqueous-mesa-28052.herokuapp.com/senior/payments',{
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                telecaller_id: telecaller_id
            })
        })
            .then( resp => resp.json())
            .then( resp => {
                console.log(resp[0]);
                PaymentCardArray.map((item) => {
                    if(item.title === 'Points Earned'){
                        item.numeric = resp[0].points_earned
                    }
                    if(item.title === 'Payment Received'){
                        item.numeric = resp[0].points_paid
                    }
                    if(item.title === 'Bonus Received'){
                        item.numeric = resp[0].bonus_earned
                    }
                })
                setSeniorPaymentArray(PaymentCardArray);
            })
            .catch( err => {
                console.log(err);
                toast.error( 'Error during payment details',{
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 2500
                })
            })
            fetch('https://aqueous-mesa-28052.herokuapp.com/senior/junior_payments',{
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    telecaller_id: telecaller_id
                })
            })
            .then( resp => resp.json())
            .then( resp => {
                setSeniorPaymentTableLog(resp);
            })
            .catch( err => {
                console.log( err );
                toast.error('junior payment table error.Refresh again',{
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 2500
                });
            })
    }, []);

    return(
        <div className={''}>

            <p style={{fontFamily: 'Open Sans Condensed', fontSize: '2rem', fontWeight: 'bold', textAlign: 'center'}}>Senior Payment Details</p>
            <div className="card-array-container-senior">
                {
                    senior_payment_array.map((item,index) => {
                        return(<PaymentCard key={index} Heading={item.title} numeric={item.numeric} icon={item.icon} />);
                    })
                }
            </div>
            <hr color={'grey'} className={'mt4 mb5'}/>
            <div className={'mb5'}>
                <SeniorPaymentTable/>
            </div>
            <ToastContainer />
        </div>
    );
}

const mapStateToProps = createStructuredSelector({
    senior_payment_array: selectSeniorPaymentArray,
    currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
    setSeniorPaymentArray: array => dispatch(setSeniorPaymentArray(array)),
    setSeniorPaymentTableLog: array => dispatch(setSeniorPaymentTableLog(array))
});

export default connect(mapStateToProps, mapDispatchToProps)(SeniorPayment);