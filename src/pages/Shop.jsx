import { useEffect, useState } from "react";
import './Shop.css';
import ZoekBalk from '../components/searchfilter/ZoekBalk';
import axios from 'axios';
import Shopcard from "../components/shopcard/Shopcard.jsx";

function Shop() {
    const [shop, setShop] = useState([]);
    const [query, setQuery] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        setLoading(true);
        setError(false);
        async function getData() {
            try {
                const response = await axios.get("https://fakestoreapi.com/products");
                console.log(response.data);
                setShop(response.data);
            } catch (e) {
                setError(true);
                console.error(e);
            } finally {
                setLoading(false);
            }
        }
        getData();
    }, []);

    const filteredItems = shop.filter((item) => {
        return (
            item.title.toLowerCase().includes(query.toLowerCase()) ||
            item.description.toLowerCase().includes(query.toLowerCase())
        );
    });

    return (
        <>
            {loading && <p>Bezig met laden...</p>}
            {error && <p>Er ging iets mis bij het ophalen van de producten.</p>}
            {!loading && !error && (
                <div className="outer-container">
                    <h1>ZoekBalk</h1>
                    <ZoekBalk
                        type="tekst"
                        inputValue={query}
                        inputCallback={setQuery}
                    />
                    <div className="outercontainer-card">
                    <div className="inner-container">
                    {filteredItems.map((item) => (
                        <Shopcard
                            key={item.id}
                            label={item.title}
                            text={item.description}
                            image={item.image}
                        />
                    ))}
                    </div>
                </div>
                </div>
            )}
        </>
    );
}

export default Shop;



