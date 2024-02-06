import React, {useEffect, useState} from "react";
import css from '../style/Home.module.css';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import axios from "axios";

const Home = () => {

    const [randomEvents, setRandomEvents] = useState([]);

    useEffect(() => {
        axios
            .get('http://localhost:8000/api/home/random')
            .then(function (response){
                const events = response.data;
                const promises = events.map((event, index) =>
                    new Promise((resolve, reject) => {
                        setTimeout(() => {
                            axios.get(`http://localhost:8000/api/event/ticket/${event.id}`)
                                .then(response => {
                                    event.ticket_price = response.data[0].ticket_price;
                                    resolve(event);
                                })
                                .catch(error => {
                                    console.error(`Error fetching ticket for event id ${event.id}: `, error);
                                    event.ticket_price = 'Error';
                                    resolve(event);
                                });
                        }, index * 1000); // delay of 1 second between each request
                    })
                );
                Promise.all(promises)
                    .then(updatedEvents => {
                        setRandomEvents(updatedEvents);
                    });
            })
            .catch(function (error){
                console.error("Error fetching events: ", error);
            });
    }, []);

    return(
        <>
            <div className={css.eventsContainer}>
                <Link to='/events/2' className={css.eventLink}>
                    <div className={css.eventFestival}>
                        <h1 className={css.eventTitle}>Festivals</h1>
                    </div>
                </Link>
                <Link to='/events/3' className={css.eventLink}>
                    <div className={css.eventConcert}>
                        <h1 className={css.eventTitle}>Concerts</h1>
                    </div>
                </Link>
                <Link to='/events/1' className={css.eventLink}>
                    <div className={css.eventSport}>
                        <h1 className={css.eventTitle}>Sport events</h1>
                    </div>
                </Link>
            </div>
            <h1 className={css.h1}>Random events</h1>
            <div className={css.eventsContainer}>
                {randomEvents.map((event, index) => (
                    <Link key={index} className={css.singleEventLink} to={`/event/${event.id}`}>
                        <div className={css.singleEvent}>
                            <img
                                className={css.singleEventImage}
                                src={event.img_url}
                            />
                            <h3 className={css.singleEventTitle}>{event.event}</h3>
                            <div className={css.info}>
                                <p className={css.price}>Ticket
                                    Price: {event.ticket_price ? event.ticket_price : 'Loading...'} EUR</p>

                                <p className={css.date}>Date: {event.date}</p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </>
    );
};

export default Home;