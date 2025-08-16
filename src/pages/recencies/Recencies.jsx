import { useNavigate, useLocation, NavLink } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../components/context/AuthContext.jsx";
import { ShoppingCartContext } from "../../components/context/ShoppingCartContext.jsx";
import { FavoriteContext } from "../../components/context/FavoriteContext.jsx";
import ZoekBalk from "../../components/searchFilter/ZoekBalk.jsx";
import  filterProducts  from "../../helpers/filteredProducts.jsx";
import axios from "axios";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeart, faShoppingCart, faSignOutAlt, faUser} from "@fortawesome/free-solid-svg-icons";

function Recencies() {
    const [recencies, setRecencies] = useState([]);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const { isAuth, user, logout } = useContext(AuthContext);
    const { items: cartItems } = useContext(ShoppingCartContext);
    const { items: favoriteItems, resetFavorites } = useContext(FavoriteContext);
    const navigate = useNavigate();
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const zoekQuery = params.get("query")?.toLowerCase() || "";
    const [query, setQuery] = useState(zoekQuery);
    const [selectedCategory, setSelectedCategory] = useState("Alle categorieën");
    const [showModal, setShowModal] = useState(zoekQuery.length > 0);
    const [allProducts, setAllProducts] = useState([]);
    const filteredProducts = filterProducts(allProducts, query, selectedCategory);
    const [categories, setCategories] = useState(["Alle categorieën"]);



    useEffect(() => {
        const savedRecencies = JSON.parse(localStorage.getItem("recencies")) || [];
        setRecencies(savedRecencies);
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

    const recenciesMessage = (e) => {
        e.preventDefault();
        const newRecensie = { text: message, author: name, email: email, likes: 0 };
        const updatedRecencies = [...recencies, newRecensie];
        setRecencies(updatedRecencies);
        localStorage.setItem("recencies", JSON.stringify(updatedRecencies));
        setName("");
        setEmail("");
        setMessage("");
    };

    const handleLike = (index) => {
        const updated = [...recencies];
        updated[index].likes += 1;
        setRecencies(updated);
        localStorage.setItem("recencies", JSON.stringify(updated));
    };

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
                <div>
                    <button onClick={() => navigate('/')}>Home</button>
                </div>
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
                <form onSubmit={recenciesMessage}>
                    <input
                        type="text"
                        placeholder="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input
                        type="email"
                        placeholder="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    <button type="submit">Submit</button>
                </form>

                <h1>Recencies</h1>
                <div className="recencies">
                    {recencies.map((m, index) => (
                        <div key={index}>
                            <h1>{m.author}</h1>
                            <p>{m.text}</p>
                            <p>{m.email}</p>
                            <p>Likes: {m.likes}</p>
                            <button onClick={() => handleLike(index)}>❤️ Like</button>
                        </div>
                    ))}
                </div>

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

export default Recencies;


