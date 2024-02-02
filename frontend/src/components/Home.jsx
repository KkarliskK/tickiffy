import React, {useEffect, useState} from "react";
import css from '../style/Home.module.css';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import axios from "axios";
import Cookies from "js-cookie";

const Home = () => {

    const [randomEvents, setRandomEvents] = useState([]);

    useEffect(() => {
        axios
            .get(
                'http://localhost:8000/api/home/random'
            )
            .then(function (response){            //this is for getting 5 random events from database
                console.log(response.data);
                setRandomEvents(response.data)
            })
            .catch(function (error){
                console.error(error);
            });
    }, []);



    return(
        <>
            <div className={css.eventsContainer}>
                <Link to='/category/2' className={css.eventLink}>
                    <div className={css.eventFestival}>
                        <h1 className={css.eventTitle}>Festivals</h1>
                    </div>
                </Link>
                <Link to='/category/3' className={css.eventLink}>
                    <div className={css.eventConcert}>
                        <h1 className={css.eventTitle}>Concerts</h1>
                    </div>
                </Link>
                <Link to='/category/1' className={css.eventLink}>
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
                                <p className={css.price}>Ticket: {event.ticket_price} EUR</p>
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