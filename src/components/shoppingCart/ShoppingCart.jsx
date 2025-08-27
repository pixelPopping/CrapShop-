import { useContext } from "react";
import { ShoppingCartContext } from "../context/ShoppingCartContext.jsx";
import { NavLink } from "react-router-dom";
import "./ShoppingCart.css";

function ShoppingCart() {
    const { items, price } = useContext(ShoppingCartContext);

    return (
        <>
            <main className="shopping-cart">
                <section className="winkelwagen">
                    <h2>🛒 Winkelwagen</h2>
                    {items.length === 0 ? (
                        <p className="empty-cart">Je winkelwagen is leeg.</p>
                    ) : (
                        <ul className="cart-items">
                            {items.map((item) => (
                                <li key={item.id} className="cart-item">
                                    <img src={item.image} alt={item.title} className="item-image" />
                                    <div className="item-details">
                                        <strong>{item.title}</strong><br />
                                        €{item.price?.toFixed(2)}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                    <p className="total-price">
                        <strong>Totaalprijs:</strong> {price().toFixed(2) ? `€${price().toFixed(2)}` : "€0,00"}
                    </p>
                </section>
            </main>
        </>
    );
}

export default ShoppingCart;




