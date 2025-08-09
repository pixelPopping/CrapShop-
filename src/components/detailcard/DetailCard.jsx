import { useContext, useState } from "react";
import { ShoppingCartContext } from "../context/ShoppingCartContext.jsx";
import { FavoriteContext } from "../context/FavoriteContext.jsx";
import DropDown from "../dropdown/DropDown.jsx";

function DetailCard({ id, label, text, image, price }) {
    const { cart, items: cartItems } = useContext(ShoppingCartContext);
    const { toggleFavorite, items: favorieten } = useContext(FavoriteContext);

    const [selectedQuantity, setSelectedQuantity] = useState(1);

    const itemInCart = cartItems.find(item => item.id === id);
    const quantityInCart = itemInCart?.quantity || 0;

    const isFavoriet = favorieten.some(item => item.id === id);

    return (
        <div className="detail-card">
            <h2>{label}</h2>
            <img
                src={image}
                alt={label}
                style={{ width: "200px", height: "200px", objectFit: "contain", borderRadius: "8px" }}
            />

            <p style={{ fontStyle: "italic" }}>{text}</p>
            <p><strong>Prijs:</strong> €{price}</p>

            <DropDown
                value={selectedQuantity}
                onChange={setSelectedQuantity}
            />

            <button
                onClick={() =>
                    cart({
                        id,
                        label,
                        text,
                        image,
                        price,
                        quantity: selectedQuantity
                    })
                }
                style={{ marginTop: "10px" }}
            >
                🛒 Voeg toe
            </button>

            <button
                onClick={() =>
                    toggleFavorite({
                        id,
                        label,
                        text,
                        image,
                        price,
                        quantity: selectedQuantity
                    })
                }
                style={{ marginTop: "10px" }}
            >
                {isFavoriet ? "💖 Verwijder uit favorieten" : "🤍 Voeg toe aan favorieten"}
            </button>

            <p style={{ marginTop: "10px" }}>
                Aantal in winkelwagen: <strong>{quantityInCart}</strong>
            </p>
        </div>
    );
}

export default DetailCard;
















































































