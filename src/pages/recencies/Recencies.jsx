import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../components/context/AuthContext.jsx";
import { ShoppingCartContext } from "../../components/context/ShoppingCartContext.jsx";
import Navigation from "../../components/navbar/Navigation.jsx";

function Recencies() {
    const [recencies, setRecencies] = useState([]);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const { isAuth, user, logout } = useContext(AuthContext);
    const { items } = useContext(ShoppingCartContext);
    const navigate = useNavigate();

    useEffect(() => {
        const savedRecencies = JSON.parse(localStorage.getItem("recencies")) || [];
        setRecencies(savedRecencies);
    }, []);

    const recenciesMessage = (e) => {
        e.preventDefault();

        const newRecensie = { text: message, author: name, email: email, likes: 0 };
        const updatedRecencies = [...recencies, newRecensie];

        setRecencies(updatedRecencies);
        localStorage.setItem("recencies", JSON.stringify(updatedRecencies));

        setName("");
        setEmail("");
        setMessage("");
    };

    const handleLike = (index) => {
        const updated = [...recencies];
        updated[index].likes += 1;
        setRecencies(updated);
        localStorage.setItem("recencies", JSON.stringify(updated));
    };

    return (
        <main>
            <div>
                <div className="button-container4">
                    {isAuth ? (
                        <>
                            <button className="navbar-toggler" onClick={logout}>LOG UIT</button>
                            <button type="button" className="user-button">
                                Ingelogd als: {user?.username ?? "Onbekend"}
                            </button>
                        </>
                    ) : (
                        <>
                            <button onClick={() => navigate('/signup')}>Sign Up</button>
                            <button onClick={() => navigate('/signin')}>Login</button>
                        </>
                    )}
                    <button onClick={() => navigate('/cart')}>
                        {items ? `cart (${items.length})` : 'cart (0)'}
                    </button>
                    <button onClick={() => navigate('/')}>Home</button>
                </div>
            </div>
            <header>
                <nav>
                    <Navigation />
                </nav>
            </header>
            <form onSubmit={recenciesMessage}>
                <input
                    type="text"
                    placeholder="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="email"
                    placeholder="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <button type="submit">Submit</button>
            </form>
            <h1>Recencies</h1>
            <div className="recencies">
                {recencies.map((m, index) => (
                    <div key={index}>
                        <h1>{m.author}</h1>
                        <p>{m.text}</p>
                        <p>{m.email}</p>
                        <p>Likes: {m.likes}</p>
                        <button onClick={() => handleLike(index)}>❤️ Like</button>
                    </div>
                ))}
            </div>
        </main>
    );
}

export default Recencies;

