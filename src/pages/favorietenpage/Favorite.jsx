import { useContext, useEffect, useState } from "react";
import { FavoriteContext } from "../../components/context/FavoriteContext.jsx";
import { AuthContext } from "../../components/context/AuthContext.jsx";
import { ShoppingCartContext } from "../../components/context/ShoppingCartContext.jsx";
import { useNavigate, useLocation, NavLink } from "react-router-dom";
import ZoekBalk from "../../components/searchFilter/ZoekBalk.jsx";
import axios from "axios";
import filterProducts from "../../helpers/filteredProducts.jsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeart, faShoppingCart, faSignOutAlt, faUser} from "@fortawesome/free-solid-svg-icons";

const FavorietenPage = () => {
    const {
        items = [],
        setItems,
        removeFavorite,
        totalFavorites,
        resetFavorites
    } = useContext(FavoriteContext);
    const { user, isAuth, logout } = useContext(AuthContext);
    const { items: cartItems } = useContext(ShoppingCartContext);
    const navigate = useNavigate();
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const zoekQuery = params.get("query")?.toLowerCase() || "";
    const [query, setQuery] = useState(zoekQuery);
    const [selectedCategory, setSelectedCategory] = useState("Alle categorieën");
    const [showModal, setShowModal] = useState(zoekQuery.length > 0);
    const [allProducts, setAllProducts] = useState([]);
    const filtered = filterProducts(allProducts, query, selectedCategory);

    const getStorageKey = (userId) => `Favorieten_${userId || "guest"}`;

    const totaalPrijs = items
        .reduce((acc, item) => acc + item.price * item.quantity, 0)
        .toFixed(2);

    useEffect(() => {
        const key = getStorageKey(user?.id);
        const stored = localStorage.getItem(key);
        if (stored) {
            try {
                const parsed = JSON.parse(stored);
                setItems(parsed);
            } catch (e) {
                console.error(e);
            }
        }
    }, [user?.id]);

    useEffect(() => {
        const key = getStorageKey(user?.id);
        localStorage.setItem(key, JSON.stringify(items));
    }, [items, user?.id]);

    useEffect(() => {
        if (!user) {
            resetFavorites();
        }
    }, [user]);

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
            } catch (e) {
                console.error(e);
            }
        }
        fetchProducts();
    }, []);

    const handleLogout = () => {
        const key = getStorageKey(user?.id);
        localStorage.removeItem(key);
        resetFavorites();
        logout();
    };

    return (
        <>
            <nav className="navbar-four">
                <ul className="nav-links4">
                    <li><NavLink to="/products/men's clothing">Men</NavLink></li>
                    <li><NavLink to="/products/women's clothing">Women</NavLink></li>
                    <li><NavLink to="/Shop">Shop</NavLink></li>
                </ul>

                <button onClick={() => navigate('/')}>Home</button>

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
                            {items.length > 0 && <span className="icon-count">{items.length}</span>}
                        </div>
                    </div>
                </div>
            </nav>

            <main>
                <h2>
                    ❤️ Favorieten –{" "}
                    {items.length > 0
                        ? items.map((item) => item.title).join(", ")
                        : "Leeg"}
                </h2>

                {items.length === 0 ? (
                    <p>Je hebt nog geen favorieten toegevoegd.</p>
                ) : (
                    <div>
                        {items.map((item) => (
                            <div key={item.id} style={{ marginBottom: "1rem" }}>
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    onError={(e) => { e.target.src = "/assets/image/fallback.png"; }}
                                    style={{
                                        width: "200px",
                                        height: "200px",
                                        objectFit: "contain",
                                        marginBottom: "8px"
                                    }}
                                />
                                <p>
                                    {item.title} – €{item.price} × {item.quantity} = €
                                    {(item.price * item.quantity).toFixed(2)}
                                </p>
                                <button onClick={() => removeFavorite(item.id)}>
                                    Verwijder uit favorieten
                                </button>
                            </div>
                        ))}
                        <p><strong>Totaal: €{totaalPrijs}</strong></p>
                        <p><em>Totaal aantal favorieten: {totalFavorites}</em></p>
                    </div>
                )}

                <div>
                    <ul>
                        <li><NavLink to="/profiel">Profiel</NavLink></li>
                        <li><NavLink to="/recencies">Recencies</NavLink></li>
                        <li><NavLink to="/favorietenpage">Favorieten</NavLink></li>
                    </ul>
                </div>

                {showModal && (
                    <div className="modal">
                        <p>🔍 Zoekresultaten voor: <strong>{query}</strong></p>
                        {filtered.length > 0 ? (
                            <ul>
                                {filtered.map((product) => (
                                    <li key={product.id}>{product.title}</li>
                                ))}
                            </ul>
                        ) : (
                            <p>Geen producten gevonden.</p>
                        )}
                    </div>
                )}
            </main>
        </>
    );
};

export default FavorietenPage;






















