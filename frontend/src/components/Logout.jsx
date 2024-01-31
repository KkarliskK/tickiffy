import Cookies from "js-cookie";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import css from '../style/Logout.module.css';


const Logout = () => {

    const [isLoggedIn, setIsLoggedIn] = useState(Boolean(Cookies.get('token')));
    const navigate = useNavigate();

    useEffect(() => {
        setIsLoggedIn(Boolean(Cookies.get('token')));
    }, [Cookies.get('token')]);
    const handleLogout = () => {
        Cookies.remove('token');
        setIsLoggedIn(false);
        navigate('/');
    };

    const navigateToHome = () => {
        navigate('/');
    }
    return(
        <>
            <div className={css.cancelContainer}>
                <h2 className={css.h2}>Are you sure you want to Sign Out?</h2>
                <div className={css.buttonContainer}>
                    <button onClick={handleLogout} className={css.signOutButton}>Yes, Sign Out</button>
                    <button onClick={navigateToHome} className={css.cancelButton}>Cancel</button>
                </div>
            </div>
        </>
    );
};

export default Logout;