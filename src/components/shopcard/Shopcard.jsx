import './Shopcard.css';
import { useNavigate } from 'react-router-dom';
import React from "react";

function Shopcard({ id, label, text, image, onClick,  rating}) {
    const navigate = useNavigate();

    // function handleClick() {
    // navigate(`/detailpagina/${id}`);
    //}

    return (
        <article className="card" onClick={onClick}>
            <h3>{label} {id}</h3>
            <img src={image} alt={label} />
            <p>{rating} ⭐</p>
        </article>
    );
}

export default Shopcard;



