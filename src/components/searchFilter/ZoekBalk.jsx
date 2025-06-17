///stap 1 simpele zoekbalk maken
///stap 2 alle producten ophalen uit de shop.json
///stap 3 state aanmaken om de zoekresultaten op te slaan en een controlt component te maken
// stap 4 querys maken voor zoeken op titel
///stap 4 filter methode gebruiken om zoekresultaten te filteren
///stap 5 state verplaatsen naar app.jsx zodat bij alle componenten de zoekbalk functioneel is

import {useState} from "react";

function ZoekBalk({type}) {
const [filter, setFilter] = useState('');

    return (
        <>
        <input  type={type}
                value={filter}
                onChange={(e) =>  setFilter(e.target.value)}
                />
        <section>
        <p>{filter}</p>
        </section>
            </>
    )
}

export default ZoekBalk;