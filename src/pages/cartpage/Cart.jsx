import { useContext, useState, useEffect } from "react";
import { ShoppingCartContext } from "../../components/context/ShoppingCartContext.jsx";
import { AuthContext } from "../../components/context/AuthContext.jsx";
import { FavoriteContext } from "../../components/context/FavoriteContext.jsx";
import { useNavigate, useLocation, NavLink } from "react-router-dom";
import ZoekBalk from "../../components/searchFilter/ZoekBalk.jsx";
import DecrementButton from "../../components/deCrementButton/DecrementButton.jsx";
import InCrementButton from "../../components/counterbutton/InCrementButton.jsx";
import axios from "axios";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeart, faShoppingCart, faSignOutAlt, faUser} from "@fortawesome/free-solid-svg-icons";
import filterProducts from "../../helpers/filteredProducts.jsx";

function Cart() {
    const { items = [], price, reSet, removeItem } = useContext(ShoppingCartContext);
    const { isAuth, user, logout } = useContext(AuthContext);
    const { items: favoriteItems, resetFavorites } = useContext(FavoriteContext);
    const navigate = useNavigate();
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const zoekQuery = params.get("query")?.toLowerCase() || "";
    const [query, setQuery] = useState(zoekQuery);
    const [selectedCategory, setSelectedCategory] = useState("Alle categorieën");
    const [showModal, setShowModal] = useState(zoekQuery.length > 0);
    const [allProducts, setAllProducts] = useState([]);
    const [categories, setCategories] = useState(["Alle categorieën"]);
    const filteredProducts = filterProducts(allProducts, query, selectedCategory);


    useEffect(() => {
        async function fetchProducts() {
            try {
                const res = await axios.get("https://fakestoreapi.com/products");
                setAllProducts(res.data);
                const cat = await axios.get("https://fakestoreapi.com/products/categories");
                setCategories(["Alle categorieën", ...cat.data]);
            } catch (e) {
                console.error(e);
            }
        }
        fetchProducts();
    }, []);


    const handleLogout = () => {
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
                            {items.length > 0 && <span className="icon-count">{items.length}</span>}
                        </div>
                    </div>

                    <div className="icon-item" onClick={() => navigate("/favorietenpage")} title="Favorieten">
                        <div className="icon-wrapper">
                            <FontAwesomeIcon icon={faHeart} />
                            {favoriteItems.length > 0 && <span className="icon-count">{favoriteItems.length}</span>}
                        </div>
                    </div>
                    <button onClick={() => navigate('/')}>Home</button>
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
                <h2>
                    🛒 Winkelwagen – {items.length > 0 ? items.map(item => item.title).join(", ") : "Leeg"}
                </h2>

                {items.length === 0 ? (
                    <p>Je winkelwagen is leeg.</p>
                ) : (
                    <>
                        {items.map((item) => (
                            <div key={item.id} style={{ marginBottom: "1rem" }}>
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    style={{
                                        width: "100px",
                                        height: "100px",
                                        objectFit: "contain",
                                        marginBottom: "8px"
                                    }}
                                />
                                <p>
                                    {item.title} – €{item.price} × {item.quantity} = €
                                    {(item.price * item.quantity).toFixed(2)}
                                </p>
                                <DecrementButton id={item.id} />
                                <InCrementButton id={item.id} />
                                <button onClick={() => removeItem(item.id)}>Verwijder</button>
                            </div>
                        ))}
                        <p><strong>Totaal aantal stuks:</strong> {items.reduce((sum, i) => sum + i.quantity, 0)}</p>
                        <p><strong>Totaalprijs:</strong> €{price().toFixed(2)}</p>
                        <button onClick={reSet}>Reset</button>
                    </>
                )}

                <div>
                    <ul>
                        <li><NavLink to="/profiel">Profiel</NavLink></li>
                        <li><NavLink to="/recencies">Recencies</NavLink></li>
                        <li><NavLink to="/favorietenpage">Favorieten</NavLink></li>
                    </ul>
                </div>
            </main>
        </>
    );
}

export default Cart;





