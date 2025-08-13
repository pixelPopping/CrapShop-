
///stap 1 simpele zoekbalk maken
///stap 2 alle producten ophalen uit de shop.json
///stap 3 state aanmaken om de zoekresultaten op te slaan en een controlt component te maken
// stap 4 querys maken voor zoeken op titel
///stap 4 filter methode gebruiken om zoekresultaten te filteren
///stap 5 state verplaatsen naar app.jsx zodat bij alle componenten de zoekbalk functioneel is

function ZoekBalk({type, inputValue, inputCallback, selectedCategory, onCategoryChange ,categories}) {


    function handleInputChange(e) {
        e.preventDefault();
    }

    return (
        <>
            <div className="search-filter">
                <form onSubmit={handleInputChange}>
                    <input  type={type}
                            value={inputValue}
                            onChange={(e)=> inputCallback(e.target.value)}
                    />
                </form>
                <div className="category-dropdown">
                    <select
                        className="category-select"
                        value={selectedCategory}
                        onChange={(e) =>onCategoryChange(e.target.value)}
                    >
                        <option value="">All categories</option>
                        {(categories || []).map((cat) => (
                            <option key={cat} value={cat}>
                                {cat}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </>
    );
}

export default ZoekBalk;

