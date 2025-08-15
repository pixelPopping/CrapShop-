import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate, useLocation, NavLink } from "react-router-dom";
import axios from "axios";
import ZoekBalk from "../../components/searchFilter/ZoekBalk.jsx";
import { AuthContext } from "../../components/context/AuthContext.jsx";
import { ShoppingCartContext } from "../../components/context/ShoppingCartContext.jsx";
import { FavoriteContext } from "../../components/context/FavoriteContext.jsx";
import  filterProducts  from "../../helpers/filteredProducts.jsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeart, faShoppingCart, faSignOutAlt, faUser} from "@fortawesome/free-solid-svg-icons";

const CategoryPage = () => {
    const { category } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const { isAuth, user, logout } = useContext(AuthContext);
    const { items: cartItems } = useContext(ShoppingCartContext);
    const { items: favoriteItems, resetFavorites } = useContext(FavoriteContext);
    const params = new URLSearchParams(location.search);
    const zoekQuery = params.get("query")?.toLowerCase() || "";
    const [query, setQuery] = useState(zoekQuery);
    const [selectedCategory, setSelectedCategory] = useState(category || "Alle categorieën");
    const [showModal, setShowModal] = useState(zoekQuery.length > 0);
    const [products, setProducts] = useState([]);
    const [allProducts, setAllProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const filteredProducts = filterProducts(allProducts, query, selectedCategory);

    const categories = [
        "men's clothing",
        "women's clothing",
        "jewelery",
        "electronics"
    ];

    useEffect(() => {
        async function fetchProducts() {
            try {
                const res = await axios.get("https://fakestoreapi.com/products");
                setAllProducts(res.data);
                const filtered = res.data.filter(item => item.category === category);
                setProducts(filtered);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }
        fetchProducts();
    }, [category]);

    const getStorageKey = (userId) => `Favorieten_${userId || "guest"}`;

    const handleLogout = () => {
        const key = getStorageKey(user?.id);
        localStorage.removeItem(key);
        resetFavorites();
        logout();
    };

    return (
        <>
            <header>
                <h1>Categorie: {category}</h1>
            </header>

            <nav className="navbar-four">
                <ul className="nav-links4">
                    <li><NavLink to="/products/men's clothing">Men</NavLink></li>
                    <li><NavLink to="/products/women's clothing">Women</NavLink></li>
                    <li><NavLink to="/Shop">Shop</NavLink></li>
                </ul>

                <ZoekBalk
                    type="text"
                    inputValue={query}
                    inputCallback={(value) => {
                        setQuery(value);
                        navigate(`?query=${encodeURIComponent(value)}`);
                        setShowModal(true);
                    }}
                    selectedCategory={selectedCategory}
                    onCategoryChange={(value) => {
                        setSelectedCategory(value);
                        setShowModal(true);
                        if (value !== "Alle categorieën") {
                            navigate(`/products/${encodeURIComponent(value)}`);
                        }
                    }}
                    categories={["Alle categorieën", ...categories]}
                />

                <div className="button-container4">
                    {isAuth ? (
                        <>
                            <div className="icon-item" onClick={handleLogout} title="Log uit">
                                <FontAwesomeIcon icon={faSignOutAlt} />
                            </div>
                            <div className="icon-item" title={`Ingelogd als ${user?.username ?? "Onbekend"}`}>
                                <FontAwesomeIcon icon={faUser} />
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="icon-item" onClick={() => navigate("/signup")} title="Sign Up">
                                <FontAwesomeIcon icon={faUser} />
                            </div>
                            <div className="icon-item" onClick={() => navigate("/signin")} title="Login">
                                <FontAwesomeIcon icon={faUser} />
                            </div>
                        </>
                    )}

                    <div className="icon-item" onClick={() => navigate("/cart")} title="Winkelwagen">
                        <div className="icon-wrapper">
                            <FontAwesomeIcon icon={faShoppingCart} />
                            {cartItems.length > 0 && <span className="icon-count">{cartItems.length}</span>}
                        </div>
                    </div>

                    <div className="icon-item" onClick={() => navigate("/favorietenpage")} title="Favorieten">
                        <div className="icon-wrapper">
                            <FontAwesomeIcon icon={faHeart} />
                            {favoriteItems.length > 0 && <span className="icon-count">{favoriteItems.length}</span>}
                        </div>
                    </div>
                </div>
            </nav>

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

            <main>
                {loading ? (
                    <p>Producten laden...</p>
                ) : (
                    <div className="product-grid">
                        {products.map(product => (
                            <div key={product.id} className="product-card">
                                <img
                                    src={product.image}
                                    alt={product.title}
                                    className="product-image"
                                    onClick={() => navigate(`/detailpagina/${product.id}`)}
                                    style={{ cursor: 'pointer' }}
                                />
                                <h3>{product.title}</h3>
                                <p><strong>€{product.price}</strong></p>
                                <p>Rating: {product.rating.rate} ⭐</p>
                            </div>
                        ))}
                    </div>
                )}

                <div>
                    <ul>
                        <li><NavLink to="/profiel">Profiel</NavLink></li>
                        <li><NavLink to="/recencies">Recencies</NavLink></li>
                        <li><NavLink to="/favorietenpage">Favorieten</NavLink></li>
                        <li><NavLink to="/home">Home</NavLink></li>
                    </ul>
                </div>
            </main>
        </>
    );
};

export default CategoryPage;













