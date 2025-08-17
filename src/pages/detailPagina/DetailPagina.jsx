import { useParams, useNavigate, useLocation, NavLink } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import DetailCard from "../../components/detailcard/DetailCard.jsx";
import ShoppingCart from "../../components/shoppingCart/ShoppingCart.jsx";
import ZoekBalk from "../../components/searchFilter/ZoekBalk.jsx";
import { ShoppingCartContext } from "../../components/context/ShoppingCartContext.jsx";
import { AuthContext } from "../../components/context/AuthContext.jsx";
import { FavoriteContext } from "../../components/context/FavoriteContext.jsx";
import filterProducts from "../../helpers/filteredProducts.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faShoppingCart, faSignOutAlt, faUser } from "@fortawesome/free-solid-svg-icons";
import useHandleLogout from "../../helpers/UseHandleLogout.jsx";
import ShowModal from "../../components/modal/ShowModal.jsx";

function DetailPagina() {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const { cart, reSet, items } = useContext(ShoppingCartContext);
    const { isAuth, user, } = useContext(AuthContext);
    const { items: favoriteItems } = useContext(FavoriteContext);

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
    const handleLogout = useHandleLogout();

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
        <div>
            <header>
                <h1>Detail Pagina</h1>
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
                            navigate(`/products/${encodeURIComponent(value)}`);
                        }
                    }}
                    categories={categories}
                />
            </nav>
            <main>
            <div className="button-container4">
            <section>
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

                <button onClick={() => navigate('/')}>Home</button>
            </section>
            </div>
            {showModal && (
                <ShowModal
                    query={query}
                    selectedCategory={selectedCategory}
                    filteredProducts={filteredProducts}
                    setShowModal={setShowModal}
                />
            )}

            {loading && <p>Bezig met laden...</p>}
            {error && <p>Er ging iets mis bij het ophalen van het product.</p>}

            {!loading && !error && product && (
                <>
                    <div className="inner-container">
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
                    </div>
                    <button onClick={() => navigate('/shop')}>Back to store</button>
                </>
            )}
            </main>
            <div>
                <footer>
                    <ul>
                        <li><NavLink to="/profiel">Profiel</NavLink></li>
                        <li><NavLink to="/recencies">Recensies</NavLink></li>
                        <li><NavLink to="/favorietenpage">Favorieten</NavLink></li>
                    </ul>
                </footer>
            </div>
        </div>
    );
}

export default DetailPagina;












