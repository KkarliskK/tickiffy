import React, { useState } from "react";
import css from '../style/Register.module.css';
import axios from 'axios';
import {Link, useNavigate} from "react-router-dom";
import Cookies from 'js-cookie';


const Register = () => {

    const [name, setName] = useState('');
    const [nameError, setNameError] = useState(false);
    const [username, setUsername] = useState('');
    const [usernameError, setUsernameError] = useState(false);
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [mobile, setMobile] = useState('');
    const [mobileError, setMobileError] = useState(false);
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    const [repeatPass, setRepeatPass] = useState('');
    const [repeatPassError, setRepeatPassError] = useState(false);
    const [repeatPasswordError, setRepeatPasswordError] = useState(false);

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
        if (mobile == undefined || mobile == ""){
            setMobileError(true);
        } else {
            setMobileError(false);
        }
        if (repeatPass == undefined || repeatPass == ""){
            setRepeatPasswordError(true);
        } else {
            setRepeatPasswordError(false);
        }
        if(nameError && usernameError && passwordError && repeatPassError && mobileError){
            return;
        }
        axios
            .post('http://localhost:8000/api/user', {
                name: name,
                username: username,
                email: email,
                mobile: mobile,
                password: password,
            })
            .then(function (response) {
                Cookies.set('token', response.data.token);
                navigate('/');
            })
            .catch(function (error){
                console.log(error);
            });
    }

    return(
        <>
            <div className={css.mainContainer}>
                <div className={css.registerContainer}>
                    <form className={css.registerForm} onSubmit={register}>
                        <h2 className={css.h2}>Sign Up into Ticckify</h2>
                        <div className={css.containerBox}>
                            <div className={css.splitContainer}>
                                <div className={css.formSplit}>
                                    <label className={css.label}>Name:</label>
                                </div>
                                <input
                                    className={css.input}
                                    type='text'
                                    placeholder='e.g. John Doe'
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                />
                                {nameError && <p className={css.error}>Name can't be empty.</p>}
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
                                    <label className={css.label}>Email:</label>
                                </div>
                                <input
                                    className={css.input}
                                    type='text'
                                    placeholder='e.g. johndoe@example.net'
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                />
                                {emailError && <p className={css.error}>Email can't be empty.</p>}
                            </div>
                            <div className={css.splitContainer}>
                                <div className={css.formSplit}>
                                    <label className={css.label}>Phone Number:</label>
                                </div>
                                <input
                                    className={css.input}
                                    type='text'
                                    placeholder='+123 1234567890'
                                    value={mobile}
                                    onChange={e => setMobile(e.target.value)}
                                />
                                {mobileError && <p className={css.error}>Phone Number can't be empty.</p>}
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
                                <div className={css.formSplit}>
                                    <label className={css.label}>Repeat password:</label>
                                </div>
                                <input
                                    className={css.input}
                                    type='password'
                                    placeholder='Repeat your password'
                                    value={repeatPass}
                                    onChange={e => setRepeatPass(e.target.value)}
                                />
                                {repeatPasswordError && <p className={css.error}>Repeat password field can't be empty.</p>}
                            </div>
                        </div>
                        {repeatPassError && <p className={css.error}>Passwords must match!</p>}
                        <div className={css.registerFooter}>
                            <button className={css.registerButton}>Sign Up</button>
                            <p className={css.p}>Already have an account?
                                <Link className={css.link} to='/login'> Sign In here!</Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Register;