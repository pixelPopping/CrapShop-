import { useEffect, useState } from "react";
import './Shop.css';
import ZoekBalk from '../../components/searchFilter/ZoekBalk.jsx';
import axios from 'axios';
import Shopcard from "../../components/shopcard/Shopcard.jsx";
import { useNavigate } from "react-router-dom";
import Navigation from "../../components/navbar/Navigation.jsx";

//1 data ophalen met een button en loggen in de console
//2 als je juiste data heb opslaan in de state
//3 mounth toevoegen zodat data automatisch renderd
//4 error en loading state toevoegen

function Shop() {
    const [shop, setShop] = useState([]);
    const [query, setQuery] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        setError(false);
        async function getData() {
            try {
                const response = await axios.get("https://fakestoreapi.com/products");
                setShop(response.data);
                console.log(response.data);
            } catch (e) {
                setError(true);
                console.error(e);
            } finally {
                setLoading(false);
            }
        }
        getData();
    }, []);

    const filteredItems = shop.filter((item) =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.description.toLowerCase().includes(query.toLowerCase())
    );

    //function onLinkClick(item) {
       // navigate(`/detailpagina/${item.id}`);
    //}

    return (
        <>
            {loading && <p>Bezig met laden...</p>}
            {error && <p>Er ging iets mis bij het ophalen van de producten.</p>}
            {!loading && !error && (
                <div className="outer-container">
                    <h1>Shop</h1>
                    <ZoekBalk
                        type="tekst"
                        inputValue={query}
                        inputCallback={setQuery}
                    />
                    <div className="inner-container">
                        {filteredItems.map((item) => (
                            <Shopcard
                                key={item.id}
                                onClick={() => navigate(`/detailpagina/${item.id}`)}
                                label={item.title}
                                text={item.description}
                                image={item.image}
                            />
                        ))}
                    </div>
                </div>
            )}
        </>
    );
}

export default Shop;




