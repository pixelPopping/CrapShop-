import { useContext } from "react";
import { ShoppingCartContext } from "../context/ShoppingCartContext.jsx";
import { NavLink } from "react-router-dom";

function ShoppingCart() {
    const { items, price } = useContext(ShoppingCartContext);

    return (
        <>
            <main>
                <section className="winkelwagen">
                    <h2>Winkelwagen</h2>
                    {items.length === 0 ? (
                        <p>Je winkelwagen is leeg.</p>
                    ) : (
                        <ul>
                            {items.map((item) => (
                                <li key={item.id} style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center' }}>
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        style={{
                                            width: '100px',
                                            height: '100px',
                                            objectFit: 'contain',
                                            marginRight: '1rem',
                                            border: '1px solid #ccc',
                                            borderRadius: '8px'
                                        }}
                                    />
                                    <div>
                                        <strong>{item.title}</strong><br />
                                        €{item.price?.toFixed(2)}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                    <p><strong>Totaalprijs:</strong> {price().toFixed(2) ? `€${price().toFixed(2)}` : '€0,00'}</p>
                </section>
            </main>
        </>
    );
}

export default ShoppingCart;



