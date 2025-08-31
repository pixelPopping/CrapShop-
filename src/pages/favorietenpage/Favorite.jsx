import { useContext, useEffect, useState } from "react";
import { FavoriteContext } from "../../components/context/FavoriteContext.jsx";
import { AuthContext } from "../../components/context/AuthContext.jsx";
import { ShoppingCartContext } from "../../components/context/ShoppingCartContext.jsx";
import { useNavigate, useLocation, NavLink } from "react-router-dom";
import SearchBar from "../../components/searchFilter/SearchBar.jsx";
import axios from "axios";
import filterProducts from "../../helpers/filteredProducts.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faShoppingCart, faSignOutAlt, faUser } from "@fortawesome/free-solid-svg-icons";
import useHandleLogout from "../../helpers/UseHandleLogout.jsx";
import ShowModal from "../../components/modal/ShowModal.jsx";
import FavorietenItem from "../../components/favorietenItem/FavotietenItem.jsx";

const FavorietenPage = () => {
    const {
        items = [],
        setItems,
        removeFavorite,
        totalFavorites,
        resetFavorites
    } = useContext(FavoriteContext);
    const { user, isAuth } = useContext(AuthContext);
    const { items: cartItems } = useContext(ShoppingCartContext);
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

    useEffect(() => {
        async function fetchData() {
            try {
                const [productsRes, categoriesRes] = await Promise.all([
                    axios.get("https://fakestoreapi.com/products"),
                    axios.get("https://fakestoreapi.com/products/categories")
                ]);
                setAllProducts(productsRes.data);
                setCategories(["Alle categorieën", ...categoriesRes.data]);
            } catch (e) {
                console.error("Fout bij ophalen data:", e);
            }
        }
        fetchData();
    }, []);



    return (
        <>
            <nav className="navbar-four">
                <ul className="nav-links4">
                    <li><NavLink to="/products/men's clothing">Men</NavLink></li>
                    <li><NavLink to="/products/women's clothing">Women</NavLink></li>
                    <li><NavLink to="/Shop">Shop</NavLink></li>
                    <li><NavLink to="/">Home</NavLink></li>
                </ul>

                <SearchBar
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
                        navigate(`?query=${encodeURIComponent(query)}&category=${encodeURIComponent(value)}`);
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
                                <FavorietenItem item={item} />
                                <button onClick={() => removeFavorite(item.id)}>
                                    Verwijder uit favorieten
                                </button>
                            </div>
                        ))}
                        <p><strong>Totaal: €{totaalPrijs}</strong></p>
                        <p><em>Totaal aantal favorieten: {totalFavorites}</em></p>
                    </div>
                )}

                {showModal && (
                    <ShowModal
                        query={query}
                        selectedCategory={selectedCategory}
                        filteredProducts={filteredProducts}
                        setShowModal={setShowModal}
                    />
                )}
            </main>
            <footer>
                <div className="footer-links">
                    <ul>
                        <li><NavLink to="/profiel">Profiel</NavLink></li>
                        <li><NavLink to="/recencies">Recensies</NavLink></li>
                        <li><NavLink to="/favorietenpage">Favorieten</NavLink></li>
                    </ul>
                </div>
            </footer>
        </>
    );
};

export default FavorietenPage;
























