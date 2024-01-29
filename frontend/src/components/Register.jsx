import React, { useState } from "react";
import css from '../style/Register.module.css';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';


const Register = () => {

    const [name, setName] = useState('');
    const [nameError, setNameError] = useState(false);
    const [username, setUsername] = useState('');
    const [usernameError, setUsernameError] = useState(false);
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    const [repeatPass, setRepeatPass] = useState('');
    const [repeatPassError, setRepeatPassError] = useState(false);

	const navigate = useNavigate();
	if (Cookies.get('token') != undefined) {
		navigate('/');
	}

    const register = e =>{
        e.preventDefault();

        if (password != repeatPass){
            setRepeatPassError(true);
        } else {
            setRepeatPassError(false);
        }
        if (email == undefined || email == ""){
            setEmailError(true);
        } else {
            setEmailError(false);
        }
        if (password == undefined || password == ""){
            setPasswordError(true);
        } else {
            setPasswordError(false);
        }
        if (name == undefined || name == ""){
            setNameError(true);
        } else {
            setNameError(false);
        }
        if (username == undefined || username == ""){
            setUsernameError(true);
        } else {
            setUsernameError(false);
        }
        if(nameError && usernameError && passwordError && repeatPassError){
            return;
        }
        axios
            .post('http://localhost:8000/api/user', {
                name: name,
                username: username,
                email: email,
                password: password,
            })
            .then(function (response) {
                Cookies.set('token', response.data.token);
                navigate('/');
            })
            .catch(function (error){
                console.log(error);
                alert(error.response.data.message);
            });
    }

    return(
        <>
            <h1>Tickiffy Register</h1>
            <form onSubmit={register}>
            <input 
                type='text' 
                placeholder='name'
                value={name}
				onChange={e => setName(e.target.value)}
            />
            {nameError && <p className={style.error}>Name can't be empty.</p>}
            <input 
                type='text'
                placeholder='username'
                value={username}
				onChange={e => setUsername(e.target.value)}
            />
            {usernameError && <p className={style.error}>Username can't be empty.</p>}
            <input 
                type='text'
                placeholder='email'
                value={email}
				onChange={e => setEmail(e.target.value)}
            />
            {emailError && <p className={style.error}>Email can't be empty.</p>}
            <input 
                type='password'
                placeholder='password'
                value={password}
				onChange={e => setPassword(e.target.value)}
            />
            {passwordError && <p className={style.error}>Password can't be empty.</p>}
            <input 
                type='password'
                placeholder='Repeat password'
                value={repeatPass}
				onChange={e => setRepeatPass(e.target.value)}
            />
            {repeatPassError && <p className={style.error}>Passwords must match!</p>}
            <button>Submit</button>
            </form>

        </>
    );
};

export default Register;