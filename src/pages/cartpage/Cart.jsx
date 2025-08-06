import { useContext } from "react";
import { ShoppingCartContext } from "../../components/context/ShoppingCartContext.jsx";
import DecrementButton from "../../components/deCrementButton/DecrementButton.jsx";
import InCrementButton from "../../components/counterbutton/InCrementButton.jsx";

function Cart() {
    const {
        items = [],
        price,
        reSet,
        removeItem
    } = useContext(ShoppingCartContext);

    return (
        <div>
            <h2>
                🛒 Winkelwagen – {items.length > 0 ? items.map(item => item.title).join(", ") : "Leeg"}
            </h2>

            {items.length === 0 ? (
                <p>Je winkelwagen is leeg.</p>
            ) : (
                <>
                    {items.map((item) => (
                        <div key={item.id} style={{ marginBottom: "1rem" }}>
                            <img
                                src={item.image}
                                alt={item.title}
                                style={{
                                    width: "80px",
                                    height: "80px",
                                    objectFit: "contain",
                                    marginBottom: "8px"
                                }}
                            />
                            <p>
                                {item.title} – €{item.price} × {item.quantity} = €
                                {(item.price * item.quantity).toFixed(2)}
                            </p>
                            <DecrementButton id={item.id} />
                            <InCrementButton id={item.id} />
                            <button onClick={() => removeItem(item.id)}>Verwijder</button>
                        </div>
                    ))}
                    <p><strong>Totaal aantal stuks:</strong> {items.reduce((sum, i) => sum + i.quantity, 0)}</p>
                    <p><strong>Totaalprijs:</strong> €{price().toFixed(2)}</p>
                    <button onClick={reSet}>Reset</button>
                </>
            )}

            <a href="/shop">Back to store</a>
        </div>
    );
}

export default Cart;




