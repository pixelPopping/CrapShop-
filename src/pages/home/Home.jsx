import {useContext, useRef, useState} from "react";
import "./Home.css";
import Wheelspin from "../../components/ui/WheelOfFortune";
import {ShoppingCartContext} from "../../components/context/ShoppingCartContext.jsx";
import {useNavigate} from "react-router-dom";
import ClockTime from "../../components/digitaleClock/DigitaleClock.jsx";

function Home() {
    const [results, setResults] = useState("");
    const [spin, setSpin] = useState(3);
    const [spinning, setSpinning] = useState(false);
    const [rotation, setRotation] = useState(0);
    const timeoutRef = useRef(null);
    const navigate = useNavigate();
    const {items, product} = useContext(ShoppingCartContext);
    console.log(items);
    console.log(product);



    return (
        <>
            <header>
                <h1>CrapShop</h1>
              <ClockTime/>
            </header>
            {items.length}
            {product}
            <nav className="navbar-four">
                <ul className="nav-links4">
                    <li><a href="/public">Heren</a></li>
                    <li><a href="/public">Dames</a></li>
                </ul>
                <div className="button-container4">
                    <button className="button-primary" type="button">Sign Up</button>
                    <button className="button-secondary" type="button">Login</button>
                    <button  className="shopping-cart" type="button" onClick={() => navigate('/cart')}>cart</button>
                </div>
            </nav>

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









