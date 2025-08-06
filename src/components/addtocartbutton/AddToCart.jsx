import {useContext} from "react";
import {ShoppingCartContext} from "../context/ShoppingCartContext.jsx";

function AddToCart(id, label, text, image, price) {
    const {cart} = useContext(ShoppingCartContext);
    return (
        <button onClick={() => cart({ id, label, text, image, price, quantity: 1 })}>
            add to cart
        </button>
    )
}

export default AddToCart;