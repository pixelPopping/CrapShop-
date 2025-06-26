import { useEffect, useState } from "react";
import './Shop.css';
import ZoekBalk from '../components/searchfilter/ZoekBalk';
import axios from 'axios';

function Shop() {
    const [shop, setShop] = useState([]);
    const [query, setQuery] = useState("");
    const [filterdEvents, setFilterdEvents] = useState([]);

    useEffect(() => {
        async function getData() {
            try {
                const response = await axios.get("https://fakestoreapi.com/products");
                console.log(response.data);
                setShop(response.data);
                setFilterdEvents(response.data);
            } catch (e) {
                console.error(e);
            }
        }
        getData();
    }, []);

    const FilteredEvent = shop.filter((item) => {
        const matched = item.title.toLowerCase().includes(query.toLowerCase()) || item.description.toLowerCase().includes(query.toLowerCase())
        return matched;
    });

    return (
        <div className="shop">
            <h1>zoekBalk</h1>
            <ZoekBalk
                type="tekst"
                inputValue={query}
                inputCallback={setQuery}
            />


            {FilteredEvent.map((item, index) => (
                <li key={index}>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    <img src={item.image} alt={item.title} />
                </li>
            ))}
        </div>
    );
}

export default Shop;


