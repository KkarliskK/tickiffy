import React, {useEffect, useState} from "react";
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import css from '../style/Checkout.module.css';
import {useNavigate, Link, useLocation, useParams} from 'react-router-dom';
import axios from "axios";


const stripePromise = loadStripe('pk_test_51OfGR1C2magmzuqNDAUI4wGd4Rcv72stcLIxLUhI4TyheKTNJjNV5iDTA0mXts6eUAM6Ho5zq2nnOz71DLj71xpj00jiJFLUeC');
const Checkout = () => {

    const options = {
        // passing the client secret obtained from the server
        clientSecret: '{{CLIENT_SECRET}}',
    };

    return(
        <Elements stripe={stripePromise} options={options}>
            <CheckoutForm />
        </Elements>
    );
};

export default Checkout;

