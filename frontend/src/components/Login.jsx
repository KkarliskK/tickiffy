import React, { useEffect, useState } from "react";
import css from '../style/Login.module.css';
import {Link, useNavigate} from "react-router-dom";
import Cookies from "js-cookie";
import axios from 'axios';

const Login = () => {

    const [username, setUsername] = useState('');
    const [usernameError, setUsernameError] = useState(false);
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    const [errorMsg, setErrorMsg] = useState(false);
	const navigate = useNavigate();

    useEffect(() => {
		const checkLoginStatus = () => {
			if (Cookies.get('token') !== undefined) {
				navigate('/');
			}
		};

		checkLoginStatus();
	}, [navigate]);


    const register = e =>{
        e.preventDefault();


        if (password == undefined || password == ""){
            setPasswordError(true);
        } else {
            setPasswordError(false);
        }
        if (username == undefined || username == ""){
            setUsernameError(true);
        } else {
            setUsernameError(false);
        }
        if(usernameError && passwordError){
            return;
        }
        axios
            .post('http://localhost:8000/api/login', {
                username: username,
                password: password,
            })
            .then(function (response) {
				Cookies.set('token', response.data.token);
				navigate('/');
            })
            .catch(function (error){
                console.log(error.response.data.error);
				setErrorMsg(error.response.data.error);
            });
    }

    return(
        <>
            <div className={css.mainContainer}>
                <div className={css.loginContainer}>
                    <form className={css.loginForm} onSubmit={register}>
                        <h2 className={css.h2}>Sign In into Tickiffy</h2>
                        <div className={css.formSplit}>
                            <label className={css.label}>Username:</label>
                        </div>
                            <input
                                className={css.input}
                                type='text'
                                placeholder='e.g. JohnDoe123'
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                            />
                            {usernameError && <p className={css.error}>Username can't be empty.</p>}
                        <div className={css.formSplit}>
                            <label className={css.label}>Password:</label>
                        </div>
                            <input
                                className={css.input}
                                type='password'
                                placeholder='Must have at least 6 characters'
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                            {passwordError && <p className={css.error}>Password can't be empty.</p>}
                            {errorMsg && <p className={css.error}>Invalid username or password.</p>}
                        <div className={css.loginFooter}>
                            <button className={css.loginButton}>Sign In</button>
                            <p className={css.p}>Forgot your password?
                                <Link className={css.link} to='/forgotpass'> Ask for new!</Link>
                            </p>
                            <p className={css.p}>Don't have an account?
                                <Link className={css.link} to='/register'> Sign Up here!</Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Login;