import React, { useContext, useState, useEffect } from "react";
import { ShoppingCartContext } from "../../components/context/ShoppingCartContext.jsx";
import { AuthContext } from "../../components/context/AuthContext.jsx";
import { FavoriteContext } from "../../components/context/FavoriteContext.jsx";
import { useNavigate, useLocation, NavLink } from "react-router-dom";
import ZoekBalk from "../../components/searchFilter/ZoekBalk.jsx";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faShoppingCart, faSignOutAlt, faUser } from "@fortawesome/free-solid-svg-icons";
import filterProducts from "../../helpers/filteredProducts.jsx";
import useHandleLogout from "../../helpers/UseHandleLogout.jsx";
import ShowModal from "../../components/modal/ShowModal.jsx";
import CartItem from "../../components/cartItem/CartItem.jsx";

function Cart() {
    const { items = [], price, reSet, } = useContext(ShoppingCartContext);
    const { isAuth, user } = useContext(AuthContext);
    const { items: favoriteItems } = useContext(FavoriteContext);
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
    const handleLogout = useHandleLogout();

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
                    categories={categories}
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
                        <FontAwesomeIcon icon={faShoppingCart} />
                        {items.length > 0 && <span className="icon-count">{items.length}</span>}
                    </div>

                    <div className="icon-item" onClick={() => navigate("/favorietenpage")} title="Favorieten">
                        <FontAwesomeIcon icon={faHeart} />
                        {favoriteItems.length > 0 && <span className="icon-count">{favoriteItems.length}</span>}
                    </div>

                    <button onClick={() => navigate('/')}>Home</button>
                </div>
            </nav>

            {showModal && (
                <ShowModal
                    query={query}
                    selectedCategory={selectedCategory}
                    filteredProducts={filteredProducts}
                    setShowModal={setShowModal}
                />
            )}

            <main>
                <h2>🛒 Winkelwagen – {items.length > 0 ? items.map(item => item.title).join(", ") : "Leeg"}</h2>

                {items.length === 0 ? (
                    <p>Je winkelwagen is leeg.</p>
                ) : (
                    <>
                        {items.map((item) => (
                            <CartItem key={item.id} item={item} />
                        ))}
                        <p><strong>Totaal aantal stuks:</strong> {items.reduce((sum, i) => sum + i.quantity, 0)}</p>
                        <p><strong>Totaalprijs:</strong> €{price().toFixed(2)}</p>
                        <button onClick={reSet}>Reset</button>
                    </>
                )}
            </main>

            <footer>
                <ul>
                    <li><NavLink to="/profiel">Profiel</NavLink></li>
                    <li><NavLink to="/recencies">Recensies</NavLink></li>
                    <li><NavLink to="/favorietenpage">Favorieten</NavLink></li>
                </ul>
            </footer>
        </>
    );
}

export default Cart;








