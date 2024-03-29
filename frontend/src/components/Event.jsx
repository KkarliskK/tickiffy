import React, {useEffect, useState} from "react";
import css from '../style/Event.module.css';
import {useNavigate, Link, useLocation, useParams} from 'react-router-dom';
import axios from "axios";
import {Calendar, Coins, Info, MapPin} from "@phosphor-icons/react";
import Cookies from "js-cookie";

const Event = () => {

    const {id} = useParams();
    const [eventData, setEventData] = useState('');
    const [ticketData, setTicketData] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [quantityError, setQuantityError] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    const [quantity, setQuantity] = useState([]);

    const decreaseQuantity = (index) => {
        setQuantity(prevQuantity => {
            const newQuantity = [...prevQuantity];
            if (newQuantity[index] > 0) {
                newQuantity[index]--;
            }
            return newQuantity;
        });
    };

    const increaseQuantity = (index) => {
        setQuantity(prevQuantity => {
            const newQuantity = [...prevQuantity];
            if (!isNaN(newQuantity[index])) {
                newQuantity[index]++;
            } else {
                newQuantity[index] = 1;
            }
            return newQuantity;
        });
    };

    useEffect(() => {
        axios
            .get(`http://localhost:8000/api/event/single/${id}`)
            .then(response => {
                setEventData(response.data);
                //console.log(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, [id]);

    useEffect(() => {
        axios
            .get(`http://localhost:8000/api/event/ticket/${id}`)
            .then(function (response){
                //console.log(response.data);
                setTicketData(Array.isArray(response.data) ? response.data : [response.data]);
                setQuantity(new Array(response.data.length).fill(0)); // Initialize quantity with zeros
                setIsLoading(false); // Set loading to false after data is loaded
            })
            .catch(function (error){
                console.error(error);
            });
    }, [id]);



    const handleCheckout = () => {
        // Filter out tickets with zero quantity and include the quantity
        const ticketsToBuy = ticketData
            .map((ticket, index) => ({ ...ticket, quantity: quantity[index] }))
            .filter(ticket => ticket.quantity > 0);

        if (ticketsToBuy.length === 0) {
            // No tickets selected, show error message
            setQuantityError('You can not buy 0 tickets!');
            setSuccessMessage('');
        } else {
            // Tickets selected, clear error message and show success message
            setQuantityError('');
            setSuccessMessage('Redirecting to checkout...');

            navigate('/checkout', { state: { ticketsToBuy } });
        }
    };




    if (isLoading) {
        return <div><h3 className={css.h3}>Loading...</h3></div>;
    } else {


        return (
            <>
                <div className={css.mainContainer}>
                    <div className={css.infoContainer} style={{backgroundImage: `url(${eventData.img_url})`}}>
                        <div className={css.bottomContainer}>
                            <div className={css.infoBody}>
                                <h2 className={css.h2}>{eventData.event}</h2>
                                <div className={css.info}>
                                    <div className={css.listContainer}>
                                        <Info className={css.icon} size={32}/>
                                        <p className={css.p}>{eventData.description}</p>
                                    </div>
                                    <div className={css.listContainer}>
                                        <Calendar className={css.icon} size={32}/>
                                        <p className={css.p}>Event's
                                            date: {eventData.date} at: {eventData.time}</p>
                                    </div>
                                    <div className={css.listContainer}>
                                        <MapPin className={css.icon} size={32}/>
                                        <p className={css.p}>Event's
                                            location: {eventData.location}</p>
                                    </div>
                                    <div className={css.listContainer}>
                                        <Coins className={css.icon} size={32}/>
                                        <p className={css.p}>Event's ticket price: {ticketData[0].ticket_price} EUR</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={css.ticketContainer}>
                        <h2 className={css.h2}>Tickets</h2>
                        <div className={css.info}>
                            <div className={css.ticketListContainerMain}>
                                <p className={css.p}>Ticket:</p>
                                <p className={css.p}>Price:</p>
                                <p className={css.p}>Available: </p>
                                <p className={css.p}>Select: </p>
                            </div>
                            {ticketData.map((ticket, index) => (
                                <div key={index} className={css.ticketListContainer}>
                                    <div className={css.contents}><p className={css.p}> {ticket.ticket}</p></div>
                                    <div className={css.contents}><p className={css.p}> {ticket.ticket_price} EUR</p></div>
                                    <div className={css.contents}><p className={css.p}> {ticket.quantity}</p></div>
                                    <div className={css.quantityDiv}>
                                        <button className={css.quantityButton} onClick={() => decreaseQuantity(index)}
                                                disabled={quantity[index] === 0}>-
                                        </button>
                                        <input className={css.quantityWindow} type="text" value={quantity[index]} readOnly/>
                                        <button className={css.quantityButton} onClick={() => increaseQuantity(index)}>+</button>
                                    </div>
                                </div>
                            ))}

                            <button className={css.checkoutButton} onClick={handleCheckout}>Go to Checkout</button>
                            {successMessage && <p className={css.successMessage}>{successMessage}</p>}
                            {quantityError && <p className={css.errorMessage}>{quantityError}</p>}
                        </div>
                    </div>
                </div>
            </>
        );
    }
    ;
}

    export default Event;