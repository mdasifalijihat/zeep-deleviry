import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import PaymentFrom from './PaymentFrom';
const stripePromise = loadStripe('pk_test_6pRNASCoBOKtIshFeQd4XMUh')
const Payment = () => {
    return (
        <Elements stripe={stripePromise}>
            <PaymentFrom></PaymentFrom>
        </Elements>
    );
};

export default Payment;