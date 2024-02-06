import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import "../style/Checkout.module.css";
import axios from "axios";
import { useLocation } from 'react-router-dom';

export default function App() {
    const location = useLocation();
    const ticketsToBuy = location.state.ticketsToBuy;

    // Make sure to call loadStripe outside of a component’s render to avoid
    // recreating the Stripe object on every render.
    // This is your test publishable API key.
    const stripePromise = loadStripe("pk_test_51OfGR1C2magmzuqNDAUI4wGd4Rcv72stcLIxLUhI4TyheKTNJjNV5iDTA0mXts6eUAM6Ho5zq2nnOz71DLj71xpj00jiJFLUeC");

    const [clientSecret, setClientSecret] = useState("");

    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        axios.post("http://localhost:8000/api/home/create", { items: ticketsToBuy })
            .then((res) => setClientSecret(res.data.clientSecret))
            .catch((error) => console.error('Error:', error));
    }, [ticketsToBuy]);

    const appearance = {
        theme: 'stripe',
    };
    const options = {
        clientSecret,
        appearance,
    };

    const totalPrice = ticketsToBuy.reduce((total, ticket) => total + ticket.ticket_price * ticket.quantity, 0);

    axios.post("http://localhost:8000/api/home/create", { items: ticketsToBuy, total: totalPrice })

    return (
        <div>
            {ticketsToBuy.map((ticket, index) => (
                <div key={index}>
                    <h2 className='h2'>{ticket.ticket}</h2>
                    <p className='p'>{ticket.ticket_price} EUR</p>
                </div>
            ))}
            <div>
                <h2 className='h2'>Selected Tickets: {ticketsToBuy.reduce((total, ticket) => total + ticket.quantity, 0)}</h2>
                <h2 className='h2'>Total Price: {ticketsToBuy.reduce((total, ticket) => total + ticket.ticket_price * ticket.quantity, 0)} EUR</h2>
            </div>
            {clientSecret && (
                <Elements options={options} stripe={stripePromise}>
                    <CheckoutForm ticketsToBuy={ticketsToBuy} />
                </Elements>
            )}
        </div>
    );
}