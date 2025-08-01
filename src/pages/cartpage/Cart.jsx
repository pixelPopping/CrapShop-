
import {useContext, useEffect, useState} from "react";
import {ShoppingCartContext} from "../../components/context/ShoppingCartContext.jsx";
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";
import ShoppingCart from "../../components/shoppingCart/ShoppingCart.jsx";

// stap1 cart component maken
// stap2 abonneren op context
// stap3 state toevoegen voor het opslaan van de items in de cart
// stap4 async await functie schrijven die de request van cart 1 ophaalt die aangemaakt is in de context
// stap5 useEffect toevoegen voor de mounth
// stap6 mappen over de lengte van de cart

function Cart() {
    const {
        items,
        price,
        lengthcart,
        reSet,
        increaseQuantity,
        decreaseQuantity,
        removeItem
    } = useContext(ShoppingCartContext);

    return (
        <div>
            <h2>🛒 Winkelwagen</h2>

            {items.length === 0 ? (
                <p>Je winkelwagen is leeg.</p>
            ) : (
                <>
                    {items.map((item) => (
                        <div key={item.id} style={{ marginBottom: "1rem" }}>
                            <p>
                                {item.title} – €{item.price} × {item.quantity} = €{(item.price * item.quantity).toFixed(2)}
                            </p>
                            <button onClick={() => decreaseQuantity(item.id)}>-</button>
                            <button onClick={() => increaseQuantity(item.id)}>+</button>
                            <button onClick={() => removeItem(item.id)}>Verwijder</button>
                        </div>
                    ))}
                    <p><strong>Totaal aantal stuks:</strong> {items.reduce((sum, i) => sum + i.quantity, 0)}</p>
                    <p><strong>Totaalprijs:</strong> €{price().toFixed(2)}</p>
                    <button onClick={reSet}>Reset</button>
                </>
            )}

            <a href="/">Back to store</a>
        </div>
    );
}

export default Cart;

