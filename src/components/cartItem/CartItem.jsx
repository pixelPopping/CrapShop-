import DecrementButton from "../../components/deCrementButton/DecrementButton.jsx";
import InCrementButton from "../../components/counterbutton/InCrementButton.jsx";
import { useContext } from "react";
import { ShoppingCartContext } from "../context/ShoppingCartContext.jsx";
import './CartItem.css'

function CartItem({ item }) {
    const { removeItem } = useContext(ShoppingCartContext);

    return (
        <section className="outer-cart">
        <div className="cart-item-inner">
            <div className="image-wrapper">
            <img
                src={item.image}
                alt={item.title}
            />
            </div>
        <div className="cart-text-buttons">
            <p>
                {item.title} – €{item.price} × {item.quantity} = €
                {(item.price * item.quantity).toFixed(2)}
            </p>
            <div className="buttons-cart">
            <DecrementButton id={item.id} />
            <InCrementButton id={item.id} />
            <button onClick={() => removeItem(item.id)}>Verwijder</button>
            </div>
        </div>
        </div>
        </section>
    );
}

export default CartItem;
