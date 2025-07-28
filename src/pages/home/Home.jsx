import { useContext } from "react";
import "./Home.css";
import { ShoppingCartContext } from "../../components/context/ShoppingCartContext.jsx";
import {NavLink, useNavigate} from "react-router-dom";
import ClockTime from "../../components/digitaleClock/DigitaleClock.jsx";
import { AuthContext } from "../../components/context/AuthContext.jsx";
import { SpinContext } from "../../components/context/SpinContext.jsx";
import Navigation from "../../components/navbar/Navigation.jsx";

function Home() {
    const navigate = useNavigate();
    const { isAuth, user, logout } = useContext(AuthContext);
    const { items, product } = useContext(ShoppingCartContext);
    const {
        spin,
        handleSpin,
        spinning,
        rotation,
        results,
        setSpin
    } = useContext(SpinContext);

    return (
        <>
            <header>
                <h1>CrapShop</h1>
                <ClockTime />
            </header>
            <nav className="navbar-four">
                <ul className="nav-links4">
                    <li><NavLink to="/products/men's clothing" className={({isActive}) => isActive === true ? 'active-link' : 'default-link'}>Men</NavLink></li>
                    <li><NavLink to="/products/women's clothing" className={({isActive}) => isActive === true ? 'active-link' : 'default-link'}>Women</NavLink></li>
                    <li><NavLink to="/Shop" className={({isActive}) => isActive === true ? 'active-link' : 'default-link'}>Shop</NavLink></li>
                </ul>
                <div className="button-container4">
                    {isAuth ? (
                        <button className="navbar-toggler" onClick={logout}>LOG UIT</button>
                    ) : (
                        <>
                            <button onClick={() => navigate('/signup')}>Sign Up</button>
                            <button onClick={() => navigate('/signin')}>Login</button>
                        </>
                    )}
                    <button onClick={() => navigate('/cart')}>
                        {items ? `cart (${items.length})` : 'cart (0)'}
                    </button>
                </div>
            </nav>

            <div>
                <p>{isAuth
                    ? <>✅ Gebruiker is ingelogd als <strong>{user?.username ?? "Onbekend"}</strong></>
                    : <>❌ Gebruiker is niet ingelogd</>}
                </p>
                <p>🛒 Aantal items in winkelmandje: {items?.length ?? 0}</p>
                <p>📦 Product info: {product ?? "Geen product geselecteerd"}</p>
            </div>

            <main>
                <button onClick={handleSpin} disabled={spinning || spin <= 0}>
                    {spinning ? "Spinning..." : `Spin (${spin} left)`}
                </button>

                <div className="animated-box">
                    <div className="mainbox">
                        <div
                            className="box1"
                            style={{
                                transform: `rotate(${rotation}deg)`,
                                transition: spinning ? "transform 3s cubic-bezier(0.25, 1, 0.5, 1)" : "none",
                                transformOrigin: "center center"
                            }}
                        >
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
                <div>
                    <li><NavLink to="/profiel" className={({isActive}) => isActive === true ? 'active-link' : 'default-link'}>Profiel</NavLink></li>
                    <li><NavLink to="/recencies" className={({isActive}) => isActive === true ? 'active-link' : 'default-link'}>Recencies</NavLink></li>
                </div>
            </main>
        </>
    );
}

export default Home;











