import { useParams, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import ZoekBalk from "../../components/searchFilter/ZoekBalk.jsx";
import DetailCard from "../../components/detailcard/DetailCard.jsx";
import ShoppingCart from "../../components/shoppingCart/ShoppingCart.jsx";
import { ShoppingCartContext } from "../../components/context/ShoppingCartContext.jsx";

function DetailPagina() {
    const [query, setQuery] = useState("");
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [product, setProduct] = useState(null);
    const { cart, reSet, items } = useContext(ShoppingCartContext);

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

    function navigateToShop(){
        navigate("/shop");
    }

    return (
        <>
            <div>
                <button className="shopping-cart" type="button" onClick={() => navigate('/cart')}>
                    cart
                </button>
            </div>

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
                        <DetailCard
                            key={product.id}
                            id={product.id}
                            label={product.title}
                            text={product.description}
                            price={product.price}
                            image={product.image}
                            cart={() =>
                                cart({
                                    id: product.id,
                                    title: product.title,
                                    description: product.description,
                                    image: product.image,
                                    price: product.price,
                                })
                            }
                        />
                        <ShoppingCart
                            product={product}
                            resetButton={() => reSet()}
                            cartItems={items}
                        />
                    </div>
                    <button onClick={() => navigateToShop()}>Back to store</button>
                </div>
            )}
        </>
    );
}

export default DetailPagina;







