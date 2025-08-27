import { useParams, useNavigate, useLocation, NavLink } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";

import DetailCard from "../../components/detailcard/DetailCard.jsx";
import ShoppingCart from "../../components/shoppingCart/ShoppingCart.jsx";
import ZoekBalk from "../../components/searchFilter/ZoekBalk.jsx";
import ShowModal from "../../components/modal/ShowModal.jsx";

import { ShoppingCartContext } from "../../components/context/ShoppingCartContext.jsx";
import { AuthContext } from "../../components/context/AuthContext.jsx";
import { FavoriteContext } from "../../components/context/FavoriteContext.jsx";
import useHandleLogout from "../../helpers/UseHandleLogout.jsx";
import filterProducts from "../../helpers/filteredProducts.jsx";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faShoppingCart, faSignOutAlt, faUser } from "@fortawesome/free-solid-svg-icons";

import "./DetailPagina.css";

function DetailPagina() {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    const { cart, reSet, items } = useContext(ShoppingCartContext);
    const { isAuth, user } = useContext(AuthContext);
    const { items: favoriteItems } = useContext(FavoriteContext);
    const handleLogout = useHandleLogout();

    const params = new URLSearchParams(location.search);
    const zoekQuery = params.get("query")?.toLowerCase() || "";

    const [query, setQuery] = useState(zoekQuery);
    const [selectedCategory, setSelectedCategory] = useState("Alle categorieën");
    const [showModal, setShowModal] = useState(zoekQuery.length > 0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [product, setProduct] = useState(null);
    const [allProducts, setAllProducts] = useState([]);
    const [categories, setCategories] = useState(["Alle categorieën"]);

    const filteredProducts = filterProducts(allProducts, query, selectedCategory);

    useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true);
                const [productRes, allRes] = await Promise.all([
                    axios.get(`https://fakestoreapi.com/products/${id}`),
                    axios.get("https://fakestoreapi.com/products")
                ]);
                const catRes = await axios.get("https://fakestoreapi.com/products/categories");

                setProduct(productRes.data);
                setAllProducts(allRes.data);
                setCategories(["Alle categorieën", ...catRes.data]);
            } catch (e) {
                setError(true);
                console.error(e);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [id]);

    return (
        <div className="outer-container">
            <header className="shop-header-detail">
                <nav className="navbar-four">
                    <ul className="nav-links4">
                        <li><NavLink to="/products/men's clothing">Men</NavLink></li>
                        <li><NavLink to="/products/women's clothing">Women</NavLink></li>
                        <li><NavLink to="/Shop">Shop</NavLink></li>
                        <li><NavLink to="/">Home</NavLink></li>
                    </ul>
                </nav>

                <div className="icon-bar">
                    <div className="icon-item-detail" onClick={() => navigate("/favorietenpage")} title="Favorieten">
                        <FontAwesomeIcon icon={faHeart} />
                        {favoriteItems.length > 0 && <span className="icon-count">{favoriteItems.length}</span>}
                    </div>

                    <div className="icon-item-detail" onClick={() => navigate("/cart")} title="Winkelwagen">
                        <FontAwesomeIcon icon={faShoppingCart} />
                        {items.length > 0 && <span className="icon-count">{items.length}</span>}
                    </div>

                    {isAuth ? (
                        <>
                            <div className="icon-item-detail" title={`Ingelogd als ${user?.username ?? "Onbekend"}`}>
                                <FontAwesomeIcon icon={faUser} />
                            </div>
                            <div className="icon-item-detail" onClick={handleLogout} title="Log uit">
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
                <div className="searchbar">
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
                </div>
            </header>
            <section>
            {showModal && (
                <ShowModal
                    query={query}
                    selectedCategory={selectedCategory}
                    filteredProducts={filteredProducts}
                    setShowModal={setShowModal}
                />
            )}
            </section>
            <main className="inner-container">
                {loading && <p>Bezig met laden...</p>}
                {error && <p>Er ging iets mis bij het ophalen van het product.</p>}

                {!loading && !error && product && (
                    <>
                        <DetailCard
                            key={product.id}
                            id={product.id}
                            label={product.title}
                            text={product.description}
                            price={product.price}
                            image={product.image}
                            cart={() =>
                                cart({
                                    id: product.id,
                                    title: product.title,
                                    description: product.description,
                                    image: product.image,
                                    price: product.price
                                })
                            }
                        />
                        <ShoppingCart
                            product={product}
                            resetButton={() => reSet()}
                            cartItems={items}
                        />
                    </>
                )}
                <div className="view-all-products">
                    <li><NavLink to="/Shop" className={({ isActive }) => isActive ? 'active-link' : 'default-link'}>View All</NavLink></li>
                </div>
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

export default DetailPagina;























