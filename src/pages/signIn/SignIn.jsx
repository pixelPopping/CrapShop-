import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../components/context/AuthContext.jsx";
import { ShoppingCartContext } from "../../components/context/ShoppingCartContext.jsx";
import { FavoriteContext } from "../../components/context/FavoriteContext.jsx";
import axios from "axios";
import Navigation from "../../components/navbar/Navigation.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faShoppingCart, faSignOutAlt, faUser } from "@fortawesome/free-solid-svg-icons";

function SignIn() {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const {
        handleSubmit,
        formState: { errors },
        register,
    } = useForm();

    const { login, logout, isAuth, user } = useContext(AuthContext);
    const { items: cartItems } = useContext(ShoppingCartContext);
    const { items: favoriteItems, resetFavorites } = useContext(FavoriteContext);

    const getStorageKey = (userId) => `Favorieten_${userId || "guest"}`;

    const handleLogout = () => {
        const key = getStorageKey(user?.id);
        localStorage.removeItem(key);
        resetFavorites();
        logout();
    };

    const handleFormSubmit = async (data) => {
        setLoading(true);
        setErrorMessage("");

        try {
            const response = await axios.post(
                `/api/login`,
                {
                    email: data.email,
                    password: data.password,
                },
                {
                    headers: {
                        accept: "application/json",
                        "content-type": "application/json",
                        "novi-education-project-id": "b72992a3-9bd0-4e8c-84d5-0e24aff4e81b",
                    },
                }
            );

            const token = response.data.token;
            console.log("Login succesvol:", response.data);
            localStorage.setItem("token", token);
            login(token);
            navigate("/");
        } catch (error) {
            console.error("Fout bij login:", error.message);
            setErrorMessage("Login mislukt. Controleer je gegevens en probeer opnieuw.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Navigation />
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

            <header>
                <h1>CrapShop</h1>
                <h2>Inloggen</h2>
            </header>

            <form className="form" onSubmit={handleSubmit(handleFormSubmit)}>
                <label htmlFor="email-field">
                    Email:
                    <input
                        type="text"
                        id="email-field"
                        {...register("email", {
                            required: "Email is verplicht",
                            validate: (value) =>
                                value.includes("@") || 'Email moet een "@" bevatten',
                        })}
                    />
                    {errors.email && <p className="error">{errors.email.message}</p>}
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
                                message: "Minimaal 8 tekens",
                            },
                        })}
                    />
                    {errors.password && <p className="error">{errors.password.message}</p>}
                </label>

                <button type="submit" disabled={loading}>
                    {loading ? "Even geduld..." : "Inloggen"}
                </button>

                {errorMessage && <p className="error">{errorMessage}</p>}
            </form>
        </>
    );
}

export default SignIn;




