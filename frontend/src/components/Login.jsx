import React, { useEffect, useState } from "react";
import css from '../style/Login.module.css';
import { useNavigate } from "react-router-dom";
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
            <h1>Tickiffy Login</h1>
            <form onSubmit={register}>
            <input 
                type='text'
                placeholder='username'
                value={username}
				onChange={e => setUsername(e.target.value)}
            />
            {usernameError && <p className={css.error}>Username can't be empty.</p>}
            <input 
                type='password'
                placeholder='password'
                value={password}
				onChange={e => setPassword(e.target.value)}
            />
            {passwordError && <p className={css.error}>Password can't be empty.</p>}
            {errorMsg && <p className={css.error}>Invalid username or password.</p>}
            <button>Sign In</button>
            </form>

        </>
    );
};

export default Login;