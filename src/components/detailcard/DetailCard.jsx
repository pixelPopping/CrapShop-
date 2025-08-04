import { useState, useContext } from "react";
import { ShoppingCartContext } from "../context/ShoppingCartContext";
import Dropdown from "../../components/dropdown/Dropdown";

function DetailCard({ id, label, text, image, price }) {
    const { cart, items } = useContext(ShoppingCartContext);
    const [selectedQuantity, setSelectedQuantity] = useState(1);

    const itemInCart = items.find(item => item.id === id);
    const quantityInCart = itemInCart?.quantity || 0;

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
                max={10}
                label="Aantal"
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

            <p>Aantal in winkelwagen: {quantityInCart}</p>
        </div>
    );
}

export default DetailCard;






































