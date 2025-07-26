import {useContext, useRef, useState} from "react";
import "./Home.css";
import Wheelspin from "../../components/ui/WheelOfFortune";
import {ShoppingCartContext} from "../../components/context/ShoppingCartContext.jsx";
import {useNavigate} from "react-router-dom";
import ClockTime from "../../components/digitaleClock/DigitaleClock.jsx";
import {AuthContext} from "../../components/context/AuthContext.jsx";

function Home() {
    const [results, setResults] = useState("");
    const [spin, setSpin] = useState(3);
    const [spinning, setSpinning] = useState(false);
    const [rotation, setRotation] = useState(0);
    const timeoutRef = useRef(null);
    const navigate = useNavigate();
    const { isAuth, user, logout } = useContext(AuthContext);
    const { items, product } = useContext(ShoppingCartContext);

    console.log("Items:", items);
    console.log("Product:", product);
    console.log("User:", user);

    return (
        <>
            <header>
                <h1>CrapShop</h1>
                <ClockTime/>
            </header>
            <nav className="navbar-four">
                <ul className="nav-links4">
                    <li><a href="/public">Heren</a></li>
                    <li><a href="/public">Dames</a></li>
                </ul>
                <div className="button-container4">
                    {isAuth ? (
                        <button className="navbar-toggler" onClick={logout}>LOG UIT</button>
                    ) : (
                        <>
                            <button className="button-primary" onClick={() => navigate('/signup')} type="button">Sign Up</button>
                            <button className="button-secondary" onClick={() => navigate('/signin')} type="button">Login</button>
                        </>
                    )}
                    <button className="shopping-cart" type="button" onClick={() => navigate('/cart')}> {items ? `cart (${items.length})` : 'cart (0)'}</button>
                </div>
            </nav>
            <div>
                {isAuth ? (
                    <p>✅ Gebruiker is ingelogd als <strong>{user?.username ?? "Onbekend"}</strong></p>
                ) : (
                    <p>❌ Gebruiker is niet ingelogd</p>
                )}

                <p>🛒 Aantal items in winkelmandje: {items?.length ?? 0}</p>
                <p>📦 Product info: {product ?? "Geen product geselecteerd"}</p>

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

            <main>
                <Wheelspin
                    setResults={setResults}
                    spin={spin}
                    setSpin={setSpin}
                    spinning={spinning}
                    setSpinning={setSpinning}
                    rotation={rotation}
                    setRotation={setRotation}
                    timeoutRef={timeoutRef}
                />

                <div className="animated-box">
                    <div
                        className="mainbox"
                        style={{
                            transform: `rotate(${rotation}deg)`,
                            transition: spinning ? "transform 3s cubic-bezier(0.25, 1, 0.5, 1)" : "none"
                        }}
                    >
                        <div className="box1">
                            <span className="font span1"><h5>Men's Clothes</h5></span>
                            <span className="font span2"><h5>Women's Clothes</h5></span>
                            <span className="font span3"><h5>Jewelry</h5></span>
                            <span className="font span4"><h5>Electronics</h5></span>
                            <span className="font span5"><h5>Vintage</h5></span>
                            <span className="font span6"><h5>10% korting</h5></span>
                            <span className="font span7"><h5>extra spin</h5></span>
                            <span className="font span8"><h5>15% korting</h5></span>
                            <span className="font span9"><h5>gift</h5></span>
                            <span className="font span10"><h5>30% korting</h5></span>
                        </div>
                    </div>

                    <button onClick={() => setSpin(3)} disabled={spinning}>
                        Reset Spins
                    </button>

                    {results && !spinning && (
                        <p>You got: <strong>{results}</strong></p>
                    )}
                </div>
            </main>
        </>
    );
}

export default Home;










