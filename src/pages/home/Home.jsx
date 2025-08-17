import { useContext, useState, useEffect } from "react";
import "./Home.css";
import { ShoppingCartContext } from "../../components/context/ShoppingCartContext.jsx";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
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
import WheelOfFortune from "../../components/wheelOfFortune/WheelOfFortune.jsx";
import getItems from "../../helpers/getItems";
import ShowModal from "../../components/modal/ShowModal.jsx";
import useHandleLogout from "../../helpers/UseHandleLogout.jsx";

function Home() {
    const navigate = useNavigate();
    const location = useLocation();
    const { isAuth, user, } = useContext(AuthContext);
    const { items: cartItems } = useContext(ShoppingCartContext);
    const { items: favoriteItems} = useContext(FavoriteContext);
    const { rotation, spinning } = useContext(SpinContext);
    const params = new URLSearchParams(location.search);
    const zoekQuery = params.get("query")?.toLowerCase() || "";
    const [query, setQuery] = useState(zoekQuery);
    const [selectedCategory, setSelectedCategory] = useState("Alle categorieën");
    const [showModal, setShowModal] = useState(zoekQuery.length > 0);
    const [allProducts, setAllProducts] = useState([]);
    const filteredProducts = filterProducts(allProducts, query, selectedCategory);
    const [categories, setCategories] = useState(["Alle categorieën"]);
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
                            {favoriteItems.length > 0 && <span className="icon-count">{favoriteItems.length}</span>}
                        </div>
                    </div>
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
                            {wheelItems.map((text, index) => (
                                <span key={index} className={`font span${index + 1}`}>
                                 <h5>{text}</h5>
                                 </span>
                            ))}
                        </div>
                    </div>
                    <WheelOfFortune buttonLabel="spin" />
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
            <footer className="footer">
                <h1>PixelPopping@productions</h1>
            </footer>
        </>
    );
}

export default Home;








































