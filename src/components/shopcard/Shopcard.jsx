import './Shopcard.css';
import React from "react";

function Shopcard({ id, label, image, onClick,  rating, price}) {

    return (
        <article className="card" onClick={onClick}>
            <h3>{label} {id}</h3>
            <img src={image} alt={label} />
            <p>Price €{price}</p>
            <p>{rating} ⭐</p>
        </article>
    );
}

export default Shopcard;










