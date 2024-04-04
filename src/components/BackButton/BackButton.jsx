import React from 'react';
import { Link } from 'react-router-dom';
import '../BackButton/BackButton.css';


const BackButton = () => {
    return (
        <Link className='back_container' to="#" onClick={() => window.history.back()}>
            <i className="bx bx-chevron-left"></i>
        </Link>
    );
};

export default BackButton;