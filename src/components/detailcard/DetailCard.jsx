import { useContext, useState } from "react";
import { ShoppingCartContext } from "../context/ShoppingCartContext.jsx";
import { FavoriteContext } from "../context/FavoriteContext.jsx";
import DropDown from "../dropdown/DropDown.jsx";
import './DetailCard.css';

function DetailCard({ id, label, text, image, price }) {
    const { cart, items: cartItems } = useContext(ShoppingCartContext);
    const { toggleFavorite, items: favorieten } = useContext(FavoriteContext);
    const [selectedQuantity, setSelectedQuantity] = useState(1);

    const itemInCart = cartItems.find(item => item.id === id);
    const quantityInCart = itemInCart?.quantity || 0;

    const isFavoriet = favorieten.some(item => item.id === id);

    return (
        <div className="outer-container3">
            <section>
                <article>
                    <div className="card-content">
                        <div className="card-header">
                            <h2>{label}</h2>
                            <p>{text}</p>
                            <p><strong>Prijs:</strong> €{price}</p>
                        </div>
                        <div className="main-img">
                            <img src={image} alt={label} />
                        </div>
                    </div>

                    <div className="card-container">
                        <div className="cart-buttons">
                            <DropDown
                                value={selectedQuantity}
                                onChange={setSelectedQuantity}
                            />
                            <button
                                className="add-button"
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
                                Cart
                            </button>
                            <button
                                className={`favorite-button ${isFavoriet ? "favoriet" : ""}`}
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
                                {isFavoriet ? "💖" : "🤍"}
                            </button>
                        </div>
                    </div>
                </article>
            </section>
        </div>
    );
}

export default DetailCard;


















































































