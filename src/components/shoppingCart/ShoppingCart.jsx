import { useContext } from "react";
import { ShoppingCartContext } from "../context/ShoppingCartContext.jsx";

function ShoppingCart() {
    const { items, price,} = useContext(ShoppingCartContext);

    return (
        <section className="winkelwagen">
            <h2>Winkelwagen</h2>
            {items.length === 0 && <p>Je winkelwagen is leeg.</p>}
            <ul>
                {items.map((item) => (
                    <li key={item.id} style={{ marginBottom: '1rem' }}>
                        <img
                            src={item.image}
                            alt={item.title}
                            style={{ width: '60px', height: '60px', objectFit: 'contain', marginRight: '1rem' }}
                        />
                        <strong>{item.title}</strong> – €{item.price?.toFixed(2)}
                    </li>
                ))}
            </ul>

            <p><strong>Totaalprijs:</strong> {price().toFixed(2) ? `€${price().toFixed(2)}` : '€0,00'}</p>
        </section>
    );
}

export default ShoppingCart;

