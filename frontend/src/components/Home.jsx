import React from "react";
import css from '../style/Home.module.css';
import { useNavigate, Link, useLocation } from 'react-router-dom';

const Home = () => {
    return(
        <>
            <div className={css.eventsContainer}>
                <Link to='/event' className={css.eventLink}>
                    <div className={css.eventFestival}>
                        <h1 className={css.eventTitle}>Festivals</h1>
                    </div>
                </Link>
                <Link to='/event' className={css.eventLink}>
                    <div className={css.eventConcert}>
                        <h1 className={css.eventTitle}>Concerts</h1>
                    </div>
                </Link>
                <Link to='/event' className={css.eventLink}>
                    <div className={css.eventSport}>
                        <h1 className={css.eventTitle}>Sport events</h1>
                    </div>
                </Link>
            </div>
        </>
    );
};

export default Home;