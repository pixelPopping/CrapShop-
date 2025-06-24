import axios from 'axios';
import {useEffect, useState} from "react";
import './Shop.css';

function Shop() {
    const [shop, setShop] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
     async function  getData() {
         setError(false);
            try {
                const response = await axios.get("https://fakestoreapi.com/products");
                console.log(response.data);
                setShop(response.data);
            } catch (e) {
                console.error(e);
                error(true);
            } finally {

            }
        }
            getData();
        })


        return (
            <div className="shop">
                <h1>Shop Producten</h1>

                <ul>
                    {shop.map((item) => (
                        <li key={item.id}>
                            <h3>{item.title}</h3>
                            <p>{item.description}</p>
                            <img src={item.image} alt={item.title} style={{width: "100px"}}/>
                        </li>
                    ))}
                </ul>
            </div>
        );
}

export default Shop;


