
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { ShoppingCartContext } from '../context/ShoppingCartContext.jsx';

function DetailCard({ id, label, text, image, cart }) {
    const navigate = useNavigate();

    return (
        <article className="card">
            <h3>{label} {id}</h3>
            <img
                src={image}
                alt={label}
                style={{ width: '200px', objectFit: 'contain' }}
            />
            <p>{text}</p>
            <button onClick={() => cart({ id, label, text, image })}>add to cart</button>

        </article>
    );
}


export default DetailCard;
