import React from "react";
import "./CategorieModal.css";

const CategorieModal = ({ categories, onSelect, onClose }) => {
    return (
        <div className="categorie-modal-overlay" onClick={onClose}>
            <div className="categorie-modal" onClick={(e) => e.stopPropagation()}>
                <h2>Kies een categorie</h2>
                <ul>
                    {categories.map((cat) => (
                        <li key={cat} onClick={() => onSelect(cat)}>
                            {cat}
                        </li>
                    ))}
                </ul>
                <button onClick={onClose}>Sluiten</button>
            </div>
        </div>
    );
};

export default CategorieModal;
