import { useParams, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import ZoekBalk from "../../components/searchFilter/ZoekBalk.jsx";
import DetailCard from "../../components/detailcard/DetailCard.jsx";
import ShoppingCart from "../../components/shoppingCart/ShoppingCart.jsx";
import { ShoppingCartContext } from "../../components/context/ShoppingCartContext.jsx";

function CategoryPage() {
    const { category } = useParams();
    const navigate = useNavigate();
    const [query, setQuery] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [products, setProducts] = useState([]);
    const { cart, reSet, items } = useContext(ShoppingCartContext);

    useEffect(() => {
        async function fetchCategoryProducts() {
            setLoading(true);
            setError(false);

            try {
                const response = await axios.get(
                    `https://fakestoreapi.com/products/category/${category}`
                );

                if (response.data.length === 0) {
                    setError(true);
                    setProducts([]);
                } else {
                    setProducts(response.data);
                }
            } catch (err) {
                console.error(err);
                setError(true);
                setProducts([]);
            } finally {
                setLoading(false);
            }
        }

        fetchCategoryProducts();
    }, [category]);


    const filteredProducts = products.filter(product =>
        product.title.toLowerCase().includes(query.toLowerCase())
    );

    function navigateToShop() {
        navigate("/shop");
    }

    return (
        <>
            <div>
                <button onClick={() => navigate('/cart')}>
                    {items ? `cart (${items.length})` : 'cart (0)'}
                </button>
                <button className="shopping-cart" type="button" onClick={() => navigate("/")}>
                    Home
                </button>
            </div>

            {loading && <p>Bezig met laden...</p>}
            {error && <p>Er ging iets mis bij het ophalen van de producten.</p>}

            {!loading && !error && (
                <div className="outer-container">
                    <h1>{category}</h1>
                    <ZoekBalk
                        type="tekst"
                        inputValue={query}
                        inputCallback={setQuery}
                    />
                    <div className="inner-container">
                        {filteredProducts.map(product => (
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
                        ))}
                    </div>
                    <ShoppingCart
                        product={products}
                        resetButton={() => reSet()}
                        cartItems={items}
                    />
                    <button onClick={navigateToShop}>Back to store</button>
                </div>
            )}
        </>
    );
}

export default CategoryPage;
