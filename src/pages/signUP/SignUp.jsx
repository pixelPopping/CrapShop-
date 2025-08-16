import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate, NavLink } from "react-router-dom";
import ZoekBalk from "../../components/searchFilter/ZoekBalk.jsx";
import "./SignUp.css";
import React, {useContext, useEffect, useState} from "react";
import filterProducts from "../../helpers/filteredProducts.jsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeart, faShoppingCart, faSignOutAlt, faUser} from "@fortawesome/free-solid-svg-icons";
import {AuthContext} from "../../components/context/AuthContext.jsx";
import {ShoppingCartContext} from "../../components/context/ShoppingCartContext.jsx";
import {FavoriteContext} from "../../components/context/FavoriteContext.jsx";

function SignUp() {
    const navigate = useNavigate();
    const { isAuth, user, logout } = useContext(AuthContext);
    const { items: cartItems } = useContext(ShoppingCartContext);
    const { items: favoriteItems, resetFavorites } = useContext(FavoriteContext);
    const params = new URLSearchParams(location.search);
    const zoekQuery = params.get("query")?.toLowerCase() || "";
    const [query, setQuery] = useState(zoekQuery);
    const [selectedCategory, setSelectedCategory] = useState("Alle categorieën");
    const [showModal, setShowModal] = useState(zoekQuery.length > 0);
    const [allProducts, setAllProducts] = useState([]);
    const filteredProducts = filterProducts(allProducts, query, selectedCategory);
    const getStorageKey = (userId) => `Favorieten_${userId || "guest"}`;
    const [categories, setCategories] = useState(["Alle categorieën"]);

    const {
        handleSubmit,
        formState: { errors },
        register,
    } = useForm();


    const handleLogout = () => {
        const key = getStorageKey(user?.id);
        localStorage.removeItem(key);
        resetFavorites();
        logout();
    };

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


    const handleFormSubmit = async (data) => {
        try {
            const response = await axios.post(
                `/api/users`,
                {
                    username: data.username,
                    email: data.email,
                    password: data.password,
                    roles: ["string"],
                },
                {
                    headers: {
                        'accept': 'application/json',
                        'novi-education-project-id': 'b72992a3-9bd0-4e8c-84d5-0e24aff4e81b',
                        'content-type': 'application/json',
                    }
                }
            );

            console.log('Create succesvol:', response.data);
            navigate('/signin');
        } catch (error) {
            console.error('Fout bij create:', error.message);
        }
    };

    return (
        <div className="signup-container">
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


            <form className="form" onSubmit={handleSubmit(handleFormSubmit)}>
                <h2>Nieuw bij CrapShop</h2>
                <p>Maak een nieuw account en begin met bestellen</p>
                <p>Persoonlijke gegevens</p>

                <label htmlFor="gender-man">
                    Man:
                    <input
                        {...register("gender", { required: "Selecteer een gender" })}
                        type="radio"
                        name="gender"
                        value="man"
                        id="gender-man"
                    />
                </label>
                <label htmlFor="gender-woman">
                    Woman:
                    <input
                        {...register("gender", { required: "Selecteer een gender" })}
                        type="radio"
                        name="gender"
                        value="woman"
                        id="gender-woman"
                    />
                </label>
                <label htmlFor="gender-neutral">
                    Neutral:
                    <input
                        {...register("gender", { required: "Selecteer een gender" })}
                        type="radio"
                        name="gender"
                        value="neutral"
                        id="gender-neutral"
                    />
                </label>
                {errors.gender && <p>{errors.gender.message}</p>}

                <label htmlFor="username-field">
                    Username:
                    <input
                        type="text"
                        id="username-field"
                        {...register("username", { required: "Username is verplicht" })}
                    />
                    {errors.username && <p>{errors.username.message}</p>}
                </label>

                <label htmlFor="lastname-field">
                    Lastname:
                    <input
                        type="text"
                        id="lastname-field"
                        {...register("lastname", { required: "Lastname is verplicht" })}
                    />
                    {errors.lastname && <p>{errors.lastname.message}</p>}
                </label>

                <label htmlFor="postalcode-field">
                    Postal Code:
                    <input
                        type="text"
                        id="postalcode-field"
                        {...register("postalcode", { required: "Postal code is verplicht" })}
                    />
                    {errors.postalcode && <p>{errors.postalcode.message}</p>}
                </label>

                <label htmlFor="unit-field">
                    Unit:
                    <input
                        type="number"
                        id="unit-field"
                        {...register("unit", { required: "Unit is verplicht" })}
                    />
                    {errors.unit && <p>{errors.unit.message}</p>}
                </label>

                <label htmlFor="homeadress-field">
                    Home Adress:
                    <input
                        type="text"
                        id="homeadress-field"
                        {...register("homeadress", { required: "Home adress is verplicht" })}
                    />
                    {errors.homeadress && <p>{errors.homeadress.message}</p>}
                </label>

                <label htmlFor="city-field">
                    City:
                    <input
                        type="text"
                        id="city-field"
                        {...register("city", { required: "City is verplicht" })}
                    />
                    {errors.city && <p>{errors.city.message}</p>}
                </label>

                <label htmlFor="phonenumber-field">
                    Phone number:
                    <input
                        type="tel"
                        id="phonenumber-field"
                        {...register("phonenumber", { required: "Phone number is verplicht" })}
                    />
                    {errors.phonenumber && <p>{errors.phonenumber.message}</p>}
                </label>

                <label htmlFor="date-field">
                    Date of birth:
                    <input
                        type="date"
                        id="date-field"
                        {...register("date", { required: "Date is verplicht" })}
                    />
                    {errors.date && <p>{errors.date.message}</p>}
                </label>

                <h3>Accountgegevens</h3>

                <label htmlFor="email-field">
                    Email:
                    <input
                        type="email"
                        id="email-field"
                        {...register("email", {
                            required: "Email is verplicht",
                            validate: value =>
                                value.includes('@') || "Ongeldig e-mailadres"
                        })}
                    />
                    {errors.email && <p>{errors.email.message}</p>}
                </label>

                <label htmlFor="password-field">
                    Wachtwoord:
                    <input
                        type="password"
                        id="password-field"
                        {...register("password", {
                            required: "Wachtwoord is verplicht",
                            minLength: {
                                value: 8,
                                message: "Minimaal 8 tekens"
                            },
                        })}
                    />
                    {errors.password && <p className="error">{errors.password.message}</p>}
                </label>

                <button type="submit">Registreer</button>
            </form>

            <div className="profiel-links">
                <ul>
                    <li><NavLink to="/profiel">Profiel</NavLink></li>
                    <li><NavLink to="/recencies">Recensies</NavLink></li>
                    <li><NavLink to="/favorietenpage">Favorieten</NavLink></li>
                </ul>
            </div>
        </div>
    );
}

export default SignUp;










