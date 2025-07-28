import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import Shopcard from "../../components/shopcard/Shopcard.jsx";

function Jewellery() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [category, setCategory] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        setError(false);
        async function getData() {
            try {
                //   const response = await axios.get("https://fakestoreapi.com/products");
                const categories = await axios.get('https://fakestoreapi.com/products/category/jewelery');
                setCategory(categories.data);
                //   setShop(response.data);
            } catch (e) {
                setError(true);
                console.error(e);
            } finally {
                setLoading(false);
            }
        }
        getData();
    }, []);


    //function onLinkClick(item) {
    // navigate(`/detailpagina/${item.id}`);
    //}

    return (
        <>
            {loading && <p>Bezig met laden...</p>}
            {error && <p>Er ging iets mis bij het ophalen van de producten.</p>}
            {!loading && !error && (
                <div className="outer-container">
                    <h1>Jewelery</h1>
                    <div className="inner-container">
                        {category.map(item => (
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

export default Jewellery;