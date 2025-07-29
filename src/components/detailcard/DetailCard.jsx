import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { ShoppingCartContext } from '../context/ShoppingCartContext.jsx';
import DecrementButton from "../deCrementButton/DecrementButton.jsx";
import IncrementButton from '../counterButton/IncrementButton.jsx'

function DetailCard({ id, label, text, image, cart, price }) {
    const navigate = useNavigate();
    const { items, increaseQuantity, decreaseQuantity } = useContext(ShoppingCartContext);

    const currentItem = items.find(item => item.id === id);
    const quantity = currentItem?.quantity ?? 0;

    return (
        <article className="card">
            <h3>{label} {id}</h3>
            <img
                src={image}
                alt={label}
                style={{ width: '200px', objectFit: 'contain' }}
            />
            <p>{text}</p>
            <p>{price}</p>

            <button onClick={() => cart({ id, label, text, image, price, quantity: 1 })}>
                add to cart
            </button>

            {quantity > 0 && (
                <div className="quantity-control">
                    <DecrementButton onClick={() => decreaseQuantity(id)} />
                    <span style={{ margin: "0 8px" }}>{quantity}</span>
                    <IncrementButton onClick={() => increaseQuantity(id)} />
                </div>
            )}
        </article>
    );
}

export default DetailCard;







