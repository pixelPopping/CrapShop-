
import { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation, NavLink } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faShoppingCart, faSignOutAlt, faUser } from "@fortawesome/free-solid-svg-icons";

import RecensieForm from "../../components/recensieForm/RecensieForm.jsx";
import RecensieItem from "../../helpers/RecensieItem.jsx";
import SearchBar from "../../components/searchFilter/SearchBar.jsx";
import ShowModal from "../../components/modal/ShowModal.jsx";

import { AuthContext } from "../../components/context/AuthContext.jsx";
import { ShoppingCartContext } from "../../components/context/ShoppingCartContext.jsx";
import { FavoriteContext } from "../../components/context/FavoriteContext.jsx";

import useHandleLogout from "../../helpers/UseHandleLogout.jsx";
import filterProducts from "../../helpers/filteredProducts.jsx";
import HandleLike from "../../helpers/HandleLike.jsx";

import "./Recencies.css";

function Recencies() {
    const [recencies, setRecencies] = useState([]);
    const [allProducts, setAllProducts] = useState([]);
    const [categories, setCategories] = useState(["Alle categorieën"]);

    const location = useLocation();
    const navigate = useNavigate();
    const params = new URLSearchParams(location.search);
    const zoekQuery = params.get("query")?.toLowerCase() || "";

    const [query, setQuery] = useState(zoekQuery);
    const [selectedCategory, setSelectedCategory] = useState("Alle categorieën");
    const [showModal, setShowModal] = useState(zoekQuery.length > 0);

    const { isAuth, user } = useContext(AuthContext);
    const { items: cartItems } = useContext(ShoppingCartContext);
    const { items: favoriteItems } = useContext(FavoriteContext);

    const handleLogout = useHandleLogout();
    const handleLike = HandleLike(setRecencies, recencies);
    const filtered = filterProducts(allProducts, query, selectedCategory);

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem("recencies")) || [];
        setRecencies(saved);
    }, []);

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
        <div className="layout-recencies">
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
                        {cartItems.length > 0 && <span className="icon-count">{cartItems.length}</span>}
                    </div>

                    <div className="icon-item" onClick={() => navigate("/favorietenpage")} title="Favorieten">
                        <FontAwesomeIcon icon={faHeart} />
                        {favoriteItems.length > 0 && <span className="icon-count">{favoriteItems.length}</span>}
                    </div>
                </div>
            </nav>

            <main>
                {showModal && (
                    <ShowModal
                        query={query}
                        selectedCategory={selectedCategory}
                        filteredProducts={filtered}
                        setShowModal={setShowModal}
                    />
                )}

                <div className="recencies-header">
                    <h1>Recencies</h1>
                </div>

                <div className="form-outer">
                    <section className="form-inner">
                        <RecensieForm recencies={recencies} setRecencies={setRecencies} />
                    </section>
                </div>

                <section className="outer-recencies">
                    <article className="inner-recencies">
                        <div className="recencies-content">
                            {recencies.map((m, index) => (
                                <RecensieItem
                                    key={index}
                                    label={m.author}
                                    text={m.text}
                                    likes={m.likes}
                                    onLike={() => handleLike(index)}
                                />
                            ))}
                        </div>
                    </article>
                </section>
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
        </div>
    );
}

export default Recencies;


