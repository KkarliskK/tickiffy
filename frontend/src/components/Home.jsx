import React from "react";
import css from '../style/Home.module.css';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import axios from "axios";
import Cookies from "js-cookie";

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
            <div className={css.eventsContainer}>
                <Link className={css.singleEventLink} to='/singleEvent'>
                    <div className={css.singleEvent}>
                        <img
                            className={css.singleEventImage}
                            src='https://www.billboard.com/wp-content/uploads/2022/10/suicideboys-2022-cr-Max-Beck-billboard-1548.jpg'
                        />
                        <h3 className={css.singleEventTitle}>$uicideboy$</h3>
                        <div className={css.info}>
                            <p className={css.price}>Ticket: 59.99$</p>
                            <p className={css.date}>Date: 31.02.2024</p>
                        </div>
                    </div>
                </Link>
                <Link className={css.singleEventLink} to='/singleEvent'>
                    <div className={css.singleEvent}>
                        <img
                            className={css.singleEventImage}
                            src='https://www.billboard.com/wp-content/uploads/2022/10/suicideboys-2022-cr-Max-Beck-billboard-1548.jpg'
                        />
                        <h3 className={css.singleEventTitle}>$uicideboy$</h3>
                        <div className={css.info}>
                            <p className={css.price}>Ticket: 59.99$</p>
                            <p className={css.date}>Date: 31.02.2024</p>
                        </div>
                    </div>
                </Link>
                <Link className={css.singleEventLink} to='/singleEvent'>
                    <div className={css.singleEvent}>
                        <img
                            className={css.singleEventImage}
                            src='https://www.billboard.com/wp-content/uploads/2022/10/suicideboys-2022-cr-Max-Beck-billboard-1548.jpg'
                        />
                        <h3 className={css.singleEventTitle}>$uicideboy$</h3>
                        <div className={css.info}>
                            <p className={css.price}>Ticket: 59.99$</p>
                            <p className={css.date}>Date: 31.02.2024</p>
                        </div>
                    </div>
                </Link>
                <Link className={css.singleEventLink} to='/singleEvent'>
                    <div className={css.singleEvent}>
                        <img
                            className={css.singleEventImage}
                            src='https://www.billboard.com/wp-content/uploads/2022/10/suicideboys-2022-cr-Max-Beck-billboard-1548.jpg'
                        />
                        <h3 className={css.singleEventTitle}>$uicideboy$</h3>
                        <div className={css.info}>
                            <p className={css.price}>Ticket: 59.99$</p>
                            <p className={css.date}>Date: 31.02.2024</p>
                        </div>
                    </div>
                </Link>
            </div>

        </>
    );
};

export default Home;