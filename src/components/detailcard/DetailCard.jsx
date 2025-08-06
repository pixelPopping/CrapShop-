import { useState, useContext } from "react";
import { ShoppingCartContext } from "../context/ShoppingCartContext";
import { FavoriteContext } from "../context/FavoriteContext";
import Dropdown from "../../components/dropdown/Dropdown";

function DetailCard({ id, label, text, image, price }) {
    const { cart, items: cartItems } = useContext(ShoppingCartContext);
    const {  toggleFavorite, items: favorieten } = useContext(FavoriteContext);

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
                style={{ width: '200px', objectFit: 'contain' }}
            />
            <p>{text}</p>
            <p>Prijs: €{price}</p>

            <Dropdown
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
            >
                Voeg toe
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
            >
                {isFavoriet ? "💖 Verwijder uit favorieten" : "🤍 Voeg toe aan favorieten"}
            </button>

            <p>Aantal in winkelwagen: {quantityInCart}</p>
        </div>
    );
}

export default DetailCard;







































