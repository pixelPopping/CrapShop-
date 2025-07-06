import {useParams, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import ZoekBalk from "../../components/searchFilter/ZoekBalk.jsx";
import DetailCard from "../../components/detailcard/DetailCard.jsx";
import ShoppingCart from "../../components/shoppingCart/ShoppingCart.jsx";


function DetailPagina () {

    const [query, setQuery] = useState("");
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [product, setProduct] = useState(null);
    const [cartItems, setCartItems] = useState([]);


    useEffect(() => {
        setLoading(true);
        setError(false);
        async function ProductDetailsId() {
            try {
                const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
                setProduct(response.data);
            } catch (e) {
                setError(true);
                console.error(e);
            } finally {
                setLoading(false);
            }
        }
        ProductDetailsId();
    }, [id]);

    function handleNavigate() {
        navigate("/shop");
    }

    function addToCart() {
        if (product) {
            setCartItems([...cartItems, product]);
        }
    }

    function reset() {
        setCartItems([]);
    }



    return (
        <>
            {loading && <p>Bezig met laden...</p>}
            {error && <p>Er ging iets mis bij het ophalen van de producten.</p>}

            {!loading && !error && product && (
        <div className="outer-container">
            <ZoekBalk
                type="tekst"
                inputValue={query}
                inputCallback={setQuery}
            />
            <div className="inner-container">
            {product && (
                <DetailCard
                    key={product.id}
                    label={product.title}
                    text={product.description}
                    image={product.image}
                    button={addToCart}
                />
            )}
                <ShoppingCart
                product={product}
                resetButton={reset}
                cartItems={cartItems}
            />

            </div>
        </div>
    )}
</>
);
}

export default DetailPagina;