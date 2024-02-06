import React, {useEffect, useState} from "react";
import css from '../style/Success.module.css';
import {useNavigate, Link, useLocation, useParams} from 'react-router-dom';

const Success = () => {
    return(
        <>
            <h1 className={css.h1}>Thank You the order has been successful!</h1>

        </>
    );
}

export default Success;