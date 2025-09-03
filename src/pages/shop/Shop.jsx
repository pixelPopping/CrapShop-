import { useContext, useEffect, useState } from "react";
import './Shop.css';
import SearchBar from '../../components/searchFilter/SearchBar.jsx';
import axios from 'axios';
import Shopcard from "../../components/shopcard/Shopcard.jsx";
import { NavLink, useNavigate } from "react-router-dom";
import { ShoppingCartContext } from "../../components/context/ShoppingCartContext.jsx";
import { AuthContext } from "../../components/context/AuthContext.jsx";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useHandleLogout from "../../helpers/UseHandleLogout.jsx";
import {
    faSignOutAlt, faUser, faShoppingCart, faHeart
} from '@fortawesome/free-solid-svg-icons';
import {FavoriteContext} from "../../components/context/FavoriteContext.jsx";

function ShopPagina() {
    const [shop, setShop] = useState([]);
    const [query, setQuery] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [category, setCategory] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");

    const navigate = useNavigate();
    const { items } = useContext(ShoppingCartContext);
    const { isAuth, user } = useContext(AuthContext);
    const { items: favoriteItems } = useContext(FavoriteContext);
    const handleLogout = useHandleLogout();

    useEffect(() => {
        async function getData() {
            setLoading(true);
            setError(false);
            try {
                const response = await axios.get("https://fakestoreapi.com/products");
                const categories = await axios.get("https://fakestoreapi.com/products/categories");
                setShop(response.data);
                setCategory(categories.data);
            } catch (e) {
                setError(true);
                console.error(e);
            } finally {
                setLoading(false);
            }
        }
        getData();
    }, []);

    const filteredItems = shop.filter((item) => {
        const matchSearch =
            item.title.toLowerCase().includes(query.toLowerCase()) ||
            item.description.toLowerCase().includes(query.toLowerCase()) ||
            item.category.toLowerCase().includes(query.toLowerCase());

        const matchCategory = selectedCategory === "" || item.category === selectedCategory;

        return matchSearch && matchCategory;
    });

    return (
        <div className="shop-outercontainer">
            <div className="shop">
                <h1>Shop.</h1>
            </div>
            <section className="shop-outer">
            <header className="shop-header">
                <nav className="navbar-four">
                    <ul className="nav-links4-shop">
                        <li><NavLink to="/products/men's clothing">Men</NavLink></li>
                        <li><NavLink to="/products/women's clothing">Women</NavLink></li>
                        <li><NavLink to="/">Home </NavLink></li>
                    </ul>
                </nav>
                <div className="searchbar">
                    <SearchBar
                        type="text"
                        inputValue={query}
                        inputCallback={setQuery}
                        selectedCategory={selectedCategory}
                        onCategoryChange={setSelectedCategory}
                        categories={["Alle categorieën", ...category]}
                    />
                </div>

                <div className="icon-bar">
                    <div className="icon-item" onClick={() => navigate("/favorietenpage")} title="Favorieten">
                        <FontAwesomeIcon icon={faHeart} />
                        {favoriteItems.length > 0 && <span className="icon-count">{favoriteItems.length}</span>}
                    </div>

                    <div className="icon-item" onClick={() => navigate("/cart")} title="Winkelwagen">
                        <FontAwesomeIcon icon={faShoppingCart} />
                        {items.length > 0 && <span className="icon-count">{items.length}</span>}
                    </div>

                    {isAuth ? (
                        <>
                            <div className="icon-item" title={`Ingelogd als ${user?.username ?? "Onbekend"}`}>
                                <FontAwesomeIcon icon={faUser} />
                            </div>
                            <div className="icon-item" onClick={handleLogout} title="Log uit">
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
            </header>
            </section>

            <div className="inner-container">
                <nav className="sidebar">
                    <ul>
                        <li><NavLink to="/products/jewelery">Jewelery</NavLink></li>
                        <li><NavLink to="/products/electronics">Electronics</NavLink></li>
                        <li><NavLink to="/products/men's clothing">Men</NavLink></li>
                        <li><NavLink to="/products/women's clothing">Women</NavLink></li>
                    </ul>
                </nav>

                <main className="shop-products">
                    {loading && <p>Bezig met laden...</p>}
                    {error && <p>Er ging iets mis bij het ophalen van de producten.</p>}
                    {!loading && !error && filteredItems.length === 0 && <p>Geen zoekresultaten gevonden.</p>}
                    {!loading && !error && (
                        <section className="product-list">
                            {filteredItems.map((item) => (
                                <Shopcard
                                    key={item.id}
                                    onClick={() => navigate(`/detailpagina/${item.id}`)}
                                    label={item.title}
                                    text={item.description}
                                    image={item.image}
                                    price={item.price}
                                    rating={item.rating.rate}
                                />
                            ))}
                        </section>
                    )}
                </main>
            </div>

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

export default ShopPagina;


































































































