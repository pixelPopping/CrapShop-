
///stap 1 simpele zoekbalk maken
///stap 2 alle producten ophalen uit de shop.json
///stap 3 state aanmaken om de zoekresultaten op te slaan en een controlt component te maken
// stap 4 querys maken voor zoeken op titel
///stap 4 filter methode gebruiken om zoekresultaten te filteren
///stap 5 state verplaatsen naar app.jsx zodat bij alle componenten de zoekbalk functioneel is
import React from "react";

const ZoekBalk = ({
                      inputValue,
                      inputCallback,
                      selectedCategory,
                      onCategoryChange,
                      categories
                  }) => {
    return (
        <div className="zoekbalk-container">
            <input
                type="text"
                value={inputValue}
                onChange={(e) => inputCallback(e.target.value)}
                placeholder="Zoek op product..."
            />
            <select
                value={selectedCategory}
                onChange={(e) => onCategoryChange(e.target.value)}
            >
                {categories.map((cat) => (
                    <option key={cat} value={cat}>
                        {cat}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default ZoekBalk;


