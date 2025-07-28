import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../components/context/AuthContext.jsx";
import { ShoppingCartContext } from "../../components/context/ShoppingCartContext.jsx";
import Navigation from "../../components/navbar/Navigation.jsx";

function Recencies() {
    const { isAuth, user } = useContext(AuthContext);
    const { items, product } = useContext(ShoppingCartContext);
    const navigate = useNavigate();

    console.log("Items:", items);
    console.log("Product:", product);
    console.log("User:", user);

    return (
        <main>
            <header>
                <h1>Recencies</h1>
            <nav>
                <Navigation/>
                <div>
                    {/* Toon login status */}
                    {isAuth ? (
                        <p>✅ Gebruiker is ingelogd als <strong>{user?.username ?? "Onbekend"}</strong></p>
                    ) : (
                        <p>❌ Gebruiker is niet ingelogd</p>
                    )}

                    {/* Shopping cart info */}
                    <p>🛒 Aantal items in winkelmandje: {items?.length ?? 0}</p>
                    <p>📦 Product info: {product ?? "Geen product geselecteerd"}</p>

                    {/* Navigatie button */}
                    <button type="button" onClick={() => navigate("/cart")}>
                        Ga naar winkelmandje
                    </button>

                    {/* Status button op basis van login */}
                    <button
                        type="button"
                        style={{
                            backgroundColor: isAuth ? "green" : "red",
                            color: "white",
                            marginTop: "1rem",
                            padding: "0.5rem 1rem",
                            borderRadius: "6px"
                        }}
                    >
                        {isAuth ? `Ingelogd als ${user?.username ?? "Onbekend"}` : "Niet ingelogd"}
                    </button>
                </div>
            </nav>
            </header>
            </main>
    );
}

export default Recencies;
