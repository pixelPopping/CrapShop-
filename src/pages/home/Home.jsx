import { useContext, useState, useEffect } from "react";
import "./Home.css";
import { ShoppingCartContext } from "../../components/context/ShoppingCartContext.jsx";
import {NavLink, useNavigate, useLocation, useParams} from "react-router-dom";
import ClockTime from "../../components/digitaleClock/DigitaleClock.jsx";
import { AuthContext } from "../../components/context/AuthContext.jsx";
import { SpinContext } from "../../components/context/SpinContext.jsx";
import { FavoriteContext } from "../../components/context/FavoriteContext.jsx";
import ZoekBalk from "../../components/searchFilter/ZoekBalk.jsx";
import axios from "axios";
import filterProducts from "../../helpers/filteredProducts.jsx";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faUser,
    faSignOutAlt,
    faShoppingCart,
    faHeart
} from '@fortawesome/free-solid-svg-icons';

function Home() {
    const navigate = useNavigate();
    const location = useLocation();
    const { isAuth, user, logout } = useContext(AuthContext);
    const { items: cartItems } = useContext(ShoppingCartContext);
    const { items: favoriteItems, resetFavorites } = useContext(FavoriteContext);
    const { spin, handleSpin, spinning, rotation, results, setSpin } = useContext(SpinContext);

    const params = new URLSearchParams(location.search);
    const zoekQuery = params.get("query")?.toLowerCase() || "";
    const [query, setQuery] = useState(zoekQuery);
    const [selectedCategory, setSelectedCategory] = useState("Alle categorieën");
    const [showModal, setShowModal] = useState(zoekQuery.length > 0);
    const [allProducts, setAllProducts] = useState([]);
    const filteredProducts = filterProducts(allProducts, query, selectedCategory);
    const [categories, setCategories] = useState(["Alle categorieën"]);


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
                <h1>CrapShop</h1>
                <ClockTime />
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
                            navigate(`?query=${encodeURIComponent(query)}&category=${encodeURIComponent(value)}`);
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
                <div className="animated-box">
                    <div className="mainbox">
                        <div
                            className="box1"
                            style={{
                                transform: `rotate(${rotation}deg)`,
                                transition: spinning
                                    ? "transform 3s cubic-bezier(0.25, 1, 0.5, 1)"
                                    : "none",
                                transformOrigin: "center center"
                            }}
                        >
                            {[
                                "Men's Clothes", "Women's Clothes", "Jewelry", "Electronics",
                                "Vintage", "10% korting", "extra spin", "15% korting",
                                "gift", "30% korting"
                            ].map((text, i) => (
                                <span key={i} className={`font span${i + 1}`}>
                                    <h5>{text}</h5>
                                </span>
                            ))}
                        </div>
                    </div>

                    <button onClick={handleSpin} disabled={spinning || spin <= 0}>
                        {spinning ? "Spinning..." : `Spin (${spin} left)`}
                    </button>

                    <button onClick={() => setSpin(3)} disabled={spinning}>
                        Reset Spins
                    </button>

                    {results && !spinning && (
                        <p>You got: <strong>{results}</strong></p>
                    )}
                </div>

                <div>
                    <ul>
                        <li><NavLink to="/profiel">Profiel</NavLink></li>
                        <li><NavLink to="/recencies">Recensies</NavLink></li>
                        <li><NavLink to="/favorietenpage">Favorieten</NavLink></li>
                    </ul>
                </div>

                <section>
                    <img
                        src="/assets/icons/image13.png"
                        alt="LinkedIn icon"
                        onClick={() =>
                            window.open("https://nl.linkedin.com/in/yorian-fransz-58111527b", "_blank")
                        }
                        style={{ cursor: "pointer" }}
                    />
                    <img
                        src="/assets/icons/image15.png"
                        alt="GitHub icon"
                        onClick={() =>
                            window.open("https://github.com/PixelPopping", "_blank")
                        }
                        style={{ cursor: "pointer" }}
                    />
                    <img
                        src="/assets/icons/image12.png"
                        alt="Mail icon"
                        onClick={() =>
                            window.open("mailto:sydney-cook@outlook.com", "_blank")
                        }
                        style={{ cursor: "pointer" }}
                    />
                </section>
            </main>
        </>
    );
}

export default Home;







































