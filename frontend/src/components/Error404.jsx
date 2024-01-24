import React from "react";
import css from '../style/Error404.module.css';

const Error404 = () => {
    return(
        <div className={css.errorContainer}>
            <div className={css.errorHeader}>
                <h1>Error 404</h1>
            </div>
            <h2>Page not found ;( </h2>
        </div>
    );
};

export default Error404;