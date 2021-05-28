import React,{useEffect}from 'react';

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

const SeniorPayment = ({setSeniorPaymentArray, setSeniorPaymentTableLog, senior_payment_array}) => {

    useEffect(() => {
        setSeniorPaymentArray(PaymentCardArray);
        setSeniorPaymentTableLog(tableData);
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
        </div>
    );
}

const mapStateToProps = createStructuredSelector({
    senior_payment_array: selectSeniorPaymentArray
});

const mapDispatchToProps = dispatch => ({
    setSeniorPaymentArray: array => dispatch(setSeniorPaymentArray(array)),
    setSeniorPaymentTableLog: array => dispatch(setSeniorPaymentTableLog(array))
});

export default connect(mapStateToProps, mapDispatchToProps)(SeniorPayment);