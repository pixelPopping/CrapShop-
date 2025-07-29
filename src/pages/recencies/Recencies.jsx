import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../components/context/AuthContext.jsx";
import { ShoppingCartContext } from "../../components/context/ShoppingCartContext.jsx";
import Navigation from "../../components/navbar/Navigation.jsx";

function Recencies() {
    const { isAuth, user, logout } = useContext(AuthContext);
    const { items, product } = useContext(ShoppingCartContext);
    const navigate = useNavigate();

    console.log("Items:", items);
    console.log("Product:", product);
    console.log("User:", user);

    return (
        <main>
            <div>
                <div className="button-container4">
                    {isAuth ? (
                        <button className="navbar-toggler" onClick={logout}>LOG UIT</button>
                    ) : (
                        <>
                            <button onClick={() => navigate('/signup')}>Sign Up</button>
                            <button onClick={() => navigate('/signin')}>Login</button>
                        </>
                    )}
                    {isAuth && (
                        <button type="button" className="user-button">
                            Ingelogd als: {user?.username ?? "Onbekend"}
                        </button>
                    )}
                    <button onClick={() => navigate('/cart')}>
                        {items ? `cart (${items.length})` : 'cart (0)'}
                    </button>
                    <button onClick={() => navigate('/')}>Home</button>
                </div>
            </div>
            <header>
                <h1>Recencies</h1>
            <nav>
                <Navigation/>
            </nav>
            </header>
            </main>
    );
}

export default Recencies;
