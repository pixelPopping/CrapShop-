
import { useContext, useState, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faUser,
    faSignOutAlt,
    faShoppingCart,
    faHeart,
} from "@fortawesome/free-solid-svg-icons";
import "./Home.css";
import ClockTime from "../../components/digitaleClock/DigitaleClock.jsx";
import SearchBar from "../../components/searchFilter/SearchBar.jsx";
import WheelOfFortune from "../../components/wheelOfFortune/WheelOfFortune.jsx";
import ShowModal from "../../components/modal/ShowModal.jsx";
import Hamburger from "../../components/hamburmenu/Hamburger.jsx";
import { ShoppingCartContext } from "../../components/context/ShoppingCartContext.jsx";
import { AuthContext } from "../../components/context/AuthContext.jsx";
import { SpinContext } from "../../components/context/SpinContext.jsx";
import { FavoriteContext } from "../../components/context/FavoriteContext.jsx";
import filterProducts from "../../helpers/filteredProducts.jsx";
import getItems from "../../helpers/getItems";
import useHandleLogout from "../../helpers/UseHandleLogout.jsx";

function Home() {
    const navigate = useNavigate();
    const location = useLocation();

    const { isAuth, user } = useContext(AuthContext);
    const { items: cartItems } = useContext(ShoppingCartContext);
    const { items: favoriteItems } = useContext(FavoriteContext);
    const { rotation, spinning } = useContext(SpinContext);

    const params = new URLSearchParams(location.search);
    const zoekQuery = params.get("query")?.toLowerCase() || "";

    const [query, setQuery] = useState(zoekQuery);
    const [selectedCategory, setSelectedCategory] = useState("Alle categorieën");
    const [showModal, setShowModal] = useState(zoekQuery.length > 0);
    const [allProducts, setAllProducts] = useState([]);
    const [categories, setCategories] = useState(["Alle categorieën"]);
    const [menuOpen, setMenuOpen] = useState(false);

    const filteredProductsList = filterProducts(allProducts, query, selectedCategory);
    const wheelItems = getItems();
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

    useEffect(() => {
        function handleClickOutside(e) {
            if (!e.target.closest(".hamburger-menu") && !e.target.closest(".hamburger")) {
                setMenuOpen(false);
            }
        }
        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, []);

    return (
        <div className="outer-container-home">
            <nav className="navbar-four-header">
                <ul className="nav-links4">
                    <li><NavLink to="/products/men's clothing">Men</NavLink></li>
                    <li><NavLink to="/products/women's clothing">Women</NavLink></li>
                    <li><NavLink to="/Shop">Shop</NavLink></li>
                </ul>

                <div className="search-hamburger-container">
                    <section className="search-field">
                        <SearchBar
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
                            categories={categories}
                            showCategories={false}
                        />
                    </section>

                    <section className="burger">
                        <Hamburger
                            menuOpen={menuOpen}
                            setMenuOpen={setMenuOpen}
                            categories={categories}
                        />
                    </section>
                </div>

                <div className="button-container-nav">
                    <div className="icon-bar">
                        <div className="icon-item" onClick={() => navigate("/favorietenpage")} title="Favorits">
                            <FontAwesomeIcon icon={faHeart} />
                            {favoriteItems.length > 0 && <span className="icon-count">{favoriteItems.length}</span>}
                        </div>

                        <div className="icon-item" onClick={() => navigate("/cart")} title="shopping-bag">
                            <FontAwesomeIcon icon={faShoppingCart} />
                            {cartItems.length > 0 && <span className="icon-count">{cartItems.length}</span>}
                        </div>

                        {isAuth ? (
                            <>
                                <div className="icon-item" title={`Ingelogd als ${user?.username ?? "Onbekend"}`}>
                                    <FontAwesomeIcon icon={faUser} />
                                </div>
                                <div className="icon-item" onClick={handleLogout} title="Log Off">
                                    <FontAwesomeIcon icon={faSignOutAlt} />
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
                    </div>
                </div>
            </nav>

            <section>
                {showModal && (
                    <ShowModal
                        query={query}
                        selectedCategory={selectedCategory}
                        filteredProducts={filteredProductsList}
                        setShowModal={setShowModal}
                    />
                )}
            </section>

            <main>
                <div className="header-container">
                    <div className="header">
                        <header>
                            <h1>CrapShop.</h1>
                        </header>
                    </div>
                    <section className="clock">
                        <ClockTime />
                    </section>
                </div>

                <div className="animated-box">
                    <div className="mainbox">
                        <div
                            className="box1"
                            style={{
                                transform: `rotate(${rotation}deg)`,
                                transition: spinning
                                    ? "transform 3s cubic-bezier(0.25, 1, 0.5, 1)"
                                    : "none",
                                transformOrigin: "center center",
                            }}
                        >
                            {wheelItems.map((text, index) => (
                                <span key={index} className={`font span${index + 1}`}>
                                    <h5>{text}</h5>
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="outer-wheel">
                <div className="wheel-container-fortune">
                    <section className="wheel-of-fortune">
                        <WheelOfFortune buttonLabel="spin" />
                    </section>
                </div>
                </div>

                <div className="outer-link-container">
                    <section className="link-container">
                        <ul>
                            <li><NavLink to="/profiel">Profiel</NavLink></li>
                            <li><NavLink to="/recencies">Recensies</NavLink></li>
                            <li><NavLink to="/favorietenpage">Favorieten</NavLink></li>
                        </ul>
                    </section>
                </div>

                <div className="outer-sociale-container">
                    <section className="sociale-container">
                        <img
                            src="/assets/icons/image13.png"
                            alt="LinkedIn icon"
                            onClick={() => window.open("https://nl.linkedin.com/in/yorian-fransz-58111527b", "_blank")}
                            style={{ cursor: "pointer" }}
                        />
                        <img
                            src="/assets/icons/image15.png"
                            alt="GitHub icon"
                            onClick={() => window.open("https://github.com/PixelPopping", "_blank")}
                            style={{ cursor: "pointer" }}
                        />
                        <img
                            src="/assets/icons/image12.png"
                            alt="Mail icon"
                            onClick={() => window.open("mailto:sydney-cook@outlook.com", "_blank")}
                            style={{ cursor: "pointer" }}
                        />
                    </section>
                </div>
            </main>
            <div className="footer-container-home">
                <footer>
                    <h1 className="footer-text">PixelPopping@productions</h1>
                </footer>
            </div>
        </div>
    );
}

export default Home;







































































































































