import React, {useEffect, useState} from "react";
import css from '../style/Events.module.css';
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


    const [quantity, setQuantity] = useState(0);

    const decreaseQuantity = () => {
        if (quantity > 0) {
            setQuantity(quantity - 1);
        }
    };
    const increaseQuantity = () => {
        setQuantity(quantity + 1);
    };

    useEffect(() => {
        axios
            .get(`http://localhost:8000/api/event/single/${id}`)
            .then(response => {
                setEventData(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, [id]);

    useEffect(() => {
        axios
            .get(`http://localhost:8000/api/event/ticket/${id}`)
            .then(function (response){
                console.log(response.data);
                setTicketData(response.data);
                setIsLoading(false); // Set loading to false after data is loaded
            })
            .catch(function (error){
                console.error(error);
            });
    }, [id]);


    const handleCheckout = () => {
        // Calculate the new quantity
        const newQuantity = ticketData[0].quantity - quantity;
        if(quantity == 0){
            setQuantityError('You can not buy 0 tickets!');
            setSuccessMessage('');
        }else {
            setQuantityError('');
            // Send a PUT or PATCH request to update the quantity
            axios.put(`http://localhost:8000/api/event/${ticketData[0].event_id}/ticket/${ticketData[0].id}`, {
                quantity: newQuantity,
            }, {
                headers: {Authorization: `Bearer ${Cookies.get('token')}`}
            })
                .then(response => {
                    console.log('Ticket quantity updated successfully');
                    setSuccessMessage('Payment Successful!');
                    // Update the ticketData state with the new quantity
                    setTicketData(prevState => ({
                        ...prevState,
                        [0]: {
                            ...prevState[0],
                            quantity: newQuantity,
                        },
                    }));
                })
                .catch(error => {
                    console.error(error);
                });
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
                                <p className={css.p}>Available: {ticketData[0].quantity}</p>
                            </div>
                            <div className={css.ticketListContainer}>
                                <p className={css.p}>{ticketData[0].ticket}</p>
                                <p className={css.p}>{ticketData[0].ticket_price} EUR</p>
                                <div className={css.quantityDiv}>
                                    <button className={css.quantityButton} onClick={decreaseQuantity}
                                            disabled={quantity === 0}>-
                                    </button>
                                    <input className={css.quantityWindow} type="text" value={quantity} readOnly/>
                                    <button className={css.quantityButton} onClick={increaseQuantity}>+</button>
                                </div>
                            </div>
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