import { useParams, useNavigate, useLocation, NavLink } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import DetailCard from "../../components/detailcard/DetailCard.jsx";
import ShoppingCart from "../../components/shoppingCart/ShoppingCart.jsx";
import { ShoppingCartContext } from "../../components/context/ShoppingCartContext.jsx";

function DetailPagina() {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const { cart, reSet, items } = useContext(ShoppingCartContext);

    const params = new URLSearchParams(location.search);
    const zoekQuery = params.get("query")?.toLowerCase() || "";

    const [query, setQuery] = useState(zoekQuery);
    const [selectedCategory, setSelectedCategory] = useState("Alle categorieën");
    const [showModal, setShowModal] = useState(zoekQuery.length > 0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [product, setProduct] = useState(null);
    const [allProducts, setAllProducts] = useState([]);

    const categories = [
        "Alle categorieën",
        "men's clothing",
        "women's clothing",
        "jewelery",
        "electronics",
    ];

    useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true);
                const [productRes, allRes] = await Promise.all([
                    axios.get(`https://fakestoreapi.com/products/${id}`),
                    axios.get("https://fakestoreapi.com/products"),
                ]);
                setProduct(productRes.data);
                setAllProducts(allRes.data);
            } catch (e) {
                setError(true);
                console.error(e);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [id]);

    const filteredProducts = allProducts.filter((product) => {
        const matchQuery = product.title.toLowerCase().includes(query.toLowerCase());
        const matchCategory =
            selectedCategory === "Alle categorieën" || product.category === selectedCategory;
        return matchQuery && matchCategory;
    });

    function navigateToShop() {
        navigate("/shop");
    }

    return (
        <>
            <div className="zoekbalk-wrapper">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => {
                        const value = e.target.value;
                        setQuery(value);
                        navigate(`?query=${encodeURIComponent(value)}`);
                        setShowModal(true);
                    }}
                    placeholder="Zoek op product..."
                />
                <select
                    value={selectedCategory}
                    onChange={(e) => {
                        const value = e.target.value;
                        setSelectedCategory(value);
                        setShowModal(true);
                        if (value !== "Alle categorieën") {
                            navigate(`/products/${encodeURIComponent(value)}`);
                        }
                    }}
                >
                    {categories.map((cat, index) => (
                        <option key={index} value={cat}>{cat}</option>
                    ))}
                </select>
            </div>

            {showModal && (
                <div className="zoek-modal">
                    <div className="modal-content">
                        <h3>Zoekresultaten voor: <strong>{query || selectedCategory}</strong></h3>
                        <button onClick={() => setShowModal(false)}>Sluiten</button>
                        <ul>
                            {filteredProducts.length > 0 ? (
                                filteredProducts.map((product) => (
                                    <li key={product.id}>
                                        <NavLink to={`/detailpagina/${product.id}`} onClick={() => setShowModal(false)}>
                                            {product.title}
                                        </NavLink>
                                    </li>
                                ))
                            ) : (
                                <p>Geen resultaten gevonden.</p>
                            )}
                        </ul>
                    </div>
                </div>
            )}

            <div>
                <button className="shopping-cart" type="button" onClick={() => navigate('/cart')}>
                    cart
                </button>
            </div>

            {loading && <p>Bezig met laden...</p>}
            {error && <p>Er ging iets mis bij het ophalen van het product.</p>}

            {!loading && !error && product && (
                <>
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
                    <button onClick={navigateToShop}>Back to store</button>
                </>
            )}
        </>
    );
}

export default DetailPagina;


