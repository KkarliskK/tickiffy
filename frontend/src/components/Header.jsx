import React, { useState, useEffect } from "react";
import css from '../style/Header.module.css';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import logo from '../assets/tickiffy-logo-black-bg.png';
import Cookies from 'js-cookie';

const Header = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(Boolean(Cookies.get('token')));
    const navigate = useNavigate();

    useEffect(() => {
        setIsLoggedIn(Boolean(Cookies.get('token')));
    }, [Cookies.get('token')]);

    return(
        <header className={css.header}>
            <Link to='/' className={css.link}>
                <h2 className={css.logo}>
                    <img src={logo} alt="Tickiffy logo"/>
                </h2>
            </Link>
            {isLoggedIn ? (
                <Link to='/logout' className={css.link}>
                    <h3>Sign Out</h3>
                </Link>
            ) : (
                <Link to='/login' className={css.link}>
                    <h3>Sign in</h3>
                </Link>
            )}
            <Link to='/events' className={css.link}>
                <h3>Events</h3>
            </Link>
            {isLoggedIn && (
                <Link to='/orderHistory' className={css.link}>
                    <h3>Order History</h3>
                </Link>
            )}
        </header>
    );
};

export default Header;
