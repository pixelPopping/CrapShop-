import { useEffect, useRef, useState } from "react";
import './Home.css';
import ZoekBalk from "../../components/searchFilter/ZoekBalk.jsx";

function Home() {
    const [results, setResults] = useState('');
    const [spin, setSpin] = useState(3);
    const [spinning, setSpinning] = useState(false);
    const [rotation, setRotation] = useState(0);
    const timeoutRef = useRef(null);

    useEffect(() => {
        return () => clearTimeout(timeoutRef.current);
    }, []);

    function wheelOfFortune() {
        if (spin <= 0 || spinning) return;

        const items = [
            "ManChlotes", "WomanChlotes", "Jewlery", "Electronics",
            "Vintage", "10% korting", "15% korting", "30% korting", "gift", "extra spin",
        ];

        const anglePerItem = 360 / items.length;
        const i = Math.floor(Math.random() * items.length);

        const middleOfSegment = i * anglePerItem + anglePerItem / 2;
        const extraRotation = 360 * 5 + middleOfSegment;
        const newRotation = rotation + extraRotation;

        setRotation(newRotation);
        setSpinning(true);

        timeoutRef.current = setTimeout(() => {
            const result = items[i];
            setSpinning(false);
            setResults(result);
            setSpin(prev => result === "extra spin" ? prev : prev - 1);
        }, 3000);
    }

    return (
        <>
            <nav className="navbar-four">
                <ul className="nav-links4">
                    <li><a href="/public">Heren</a></li>
                    <li><a href="/public">Dames</a></li>
                </ul>
                <div className="button-container4">
                    <button className="button-primary" type="button">Sign Up</button>
                    <button className="button-secondary" type="button">Login</button>
                </div>
            </nav>

            <header>
                <h1>CrapShop</h1>
            </header>

            <main>
                <div className="animated-box">
                    <div className="pointer">▲</div>

                    <div
                        className="mainbox"
                        style={{
                            transform: `rotate(${rotation}deg)`,
                            transition: spinning ? "transform 3s ease-out" : "none"
                        }}
                    >
                        <div className="box" id="box">
                            <div className="box1">
                                <span className="font span1"><h5>Man Chlotes</h5></span>
                                <span className="font span2"><h5>Female Chlotes</h5></span>
                                <span className="font span3"><h5>Electronics</h5></span>
                                <span className="font span4"><h5>Jewlery</h5></span>
                                <span className="font span5"><h5>Vintage</h5></span>
                            </div>
                            <div className="box2">
                                <span className="font span1"><h5>10% korting</h5></span>
                                <span className="font span2"><h5>extra spin</h5></span>
                                <span className="font span3"><h5>15% korting</h5></span>
                                <span className="font span4"><h5>gift</h5></span>
                                <span className="font span5"><h5>30% korting</h5></span>
                            </div>
                        </div>
                    </div>

                    <button onClick={wheelOfFortune} disabled={spinning || spin <= 0}>
                        {spinning ? 'Spinning...' : `Spin (${spin} left)`}
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





