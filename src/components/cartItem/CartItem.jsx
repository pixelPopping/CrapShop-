import DecrementButton from "../../components/deCrementButton/DecrementButton.jsx";
import InCrementButton from "../../components/counterbutton/InCrementButton.jsx";
import { useContext } from "react";
import { ShoppingCartContext } from "../context/ShoppingCartContext.jsx";

function CartItem({ item }) {
    const { removeItem } = useContext(ShoppingCartContext);

    return (
        <div className="cart-item">
            <img
                src={item.image}
                alt={item.title}
                className="cart-image"
            />
            <p>
                {item.title} – €{item.price} × {item.quantity} = €
                {(item.price * item.quantity).toFixed(2)}
            </p>
            <DecrementButton id={item.id} />
            <InCrementButton id={item.id} />
            <button onClick={() => removeItem(item.id)}>Verwijder</button>
        </div>
    );
}

export default CartItem;
