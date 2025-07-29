import { useContext } from "react";
import { ShoppingCartContext } from "../context/ShoppingCartContext.jsx";

function IncrementButton() {
    const {increaseQuantity} = useContext(ShoppingCartContext);
    return (
        <div className="button">
            <button className="counter-button" onClick={increaseQuantity} type="button">+</button>
        </div>
    );
}

export default IncrementButton;
