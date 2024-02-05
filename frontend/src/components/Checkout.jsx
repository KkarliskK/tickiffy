import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import "../style/Checkout.module.css";
import axios from "axios";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe("pk_test_51OfGR1C2magmzuqNDAUI4wGd4Rcv72stcLIxLUhI4TyheKTNJjNV5iDTA0mXts6eUAM6Ho5zq2nnOz71DLj71xpj00jiJFLUeC");

export default function App() {
    const [clientSecret, setClientSecret] = useState("");

    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        axios.post("http://localhost:8000/api/home/create", { items: [{ id: "ticket-vip" }] })
            .then((res) => setClientSecret(res.data.clientSecret))
            .catch((error) => console.error('Error:', error));
    }, []);

    const appearance = {
        theme: 'stripe',
    };
    const options = {
        clientSecret,
        appearance,
    };

    return (
        <div>
            {clientSecret && (
                <Elements options={options} stripe={stripePromise}>
                    <CheckoutForm />
                </Elements>
            )}
        </div>
    );
}