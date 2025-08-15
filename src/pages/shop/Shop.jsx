



//1 data ophalen met een button en loggen in de console
//2 als je juiste data heb opslaan in de state
//3 mounth toevoegen zodat data automatisch renderd
//4 error en loading state toevoegen
// code zoekbalk verplaatsen naar component

import { useContext, useEffect, useState } from "react";
import './Shop.css';
import ZoekBalk from '../../components/searchFilter/ZoekBalk.jsx';
import axios from 'axios';
import Shopcard from "../../components/shopcard/Shopcard.jsx";
import { NavLink, useNavigate } from "react-router-dom";
import { ShoppingCartContext } from "../../components/context/ShoppingCartContext.jsx";
import { AuthContext } from "../../components/context/AuthContext.jsx";
import { FavoriteContext } from "../../components/context/FavoriteContext.jsx";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faUser,
    faSignOutAlt,
    faShoppingCart,
    faHeart
} from '@fortawesome/free-solid-svg-icons';


function Shop() {
    const [shop, setShop] = useState([]);
    const [query, setQuery] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [category, setCategory] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const navigate = useNavigate();
    const { items } = useContext(ShoppingCartContext);
    const { isAuth, user, logout } = useContext(AuthContext);
    const { items: favoriteItems, resetFavorites } = useContext(FavoriteContext);

    useEffect(() => {
        async function getData() {
            try {
                setLoading(true);
                const [productsRes, categoriesRes] = await Promise.all([
                    axios.get("https://fakestoreapi.com/products"),
                    axios.get("https://fakestoreapi.com/products/categories")
                ]);
                setShop(productsRes.data);
                setCategory(categoriesRes.data);
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

        return matchCategory && matchSearch;
    });

    const getStorageKey = (userId) => `Favorieten_${userId || "guest"}`;

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
                    inputCallback={setQuery}
                    selectedCategory={selectedCategory}
                    onCategoryChange={setSelectedCategory}
                    categories={["Alle categorieën", ...category]}
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
                </div>



            </nav>
            <section>
                <li><NavLink to="/" className={({isActive}) => isActive === true ? 'active-link' : 'default-link'}>Home Page</NavLink></li>
                <li><NavLink to="/products/jewelery" className={({isActive}) => isActive === true ? 'active-link' : 'default-link'}>Jewelery</NavLink></li>
                <li><NavLink to="/products/electronics" className={({isActive}) => isActive === true ? 'active-link' : 'default-link'}>Electronics</NavLink></li>
                <li><NavLink to="/products/men's clothing" className={({isActive}) => isActive === true ? 'active-link' : 'default-link'}>Men</NavLink></li>
                <li><NavLink to="/products/women's clothing" className={({isActive}) => isActive === true ? 'active-link' : 'default-link'}>Women</NavLink></li>
            </section>
            {!loading && !error && filteredItems.length === 0 && <p>Geen zoekresultaten gevonden.</p>}
            {loading && <p>Bezig met laden...</p>}
            {error && <p>Er ging iets mis bij het ophalen van de producten.</p>}

            {!loading && !error && (
                <div className="outer-container">
                    <h1>Shop</h1>
                    <div className="inner-container">
                        {filteredItems.map((item) => (
                            <Shopcard
                                key={item.id}
                                onClick={() => navigate(`/detailpagina/${item.id}`)}
                                label={item.title}
                                text={item.description}
                                image={item.image}
                                rating={item.rating.rate}
                            />
                        ))}
                    </div>
                </div>
            )}
        </>
    );
}

export default Shop;









