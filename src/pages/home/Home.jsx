import { useEffect, useRef, useState } from "react";
import './Home.css';

function getItems() {
    return [
        "Man Chlotes", "Woman Chlotes", "Jewlery", "Electronics",
        "Vintage", "10% korting", "extra spin", "15% korting", "gift", "30% korting"
    ];
}

function getRandomIndex(items) {
    return Math.floor(Math.random() * items.length);
}

function getAnglePerItem(items) {
    return 360 / items.length;
}

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

        const items = getItems();
        const anglePerItem = getAnglePerItem(items);
        const index = getRandomIndex(items);

        const middleOfSegment = index * anglePerItem + anglePerItem / 2;
        const extraRotation = 360 * 5 + middleOfSegment;
        const newRotation = rotation + extraRotation;

        setRotation(newRotation);
        setSpinning(true);

        timeoutRef.current = setTimeout(() => {
            setSpinning(false);
            setResults(items[index]);

            const spans = document.querySelectorAll(".box1 span");
            spans.forEach(span => span.classList.remove("highlighted"));
            if (spans[index]) {
                spans[index].classList.add("highlighted");
            }

            setSpin(prev => items[index] === "extra spin" ? prev : prev - 1);
        }, 3000);
    }

    return (
        <>
            <header>
                <h1>CrapShop</h1>
            </header>

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

            <main>
                <div className="animated-box">
                    <div
                        className="mainbox"
                        style={{
                            transform: `rotate(${rotation}deg)`,
                            transition: spinning ? "transform 3s cubic-bezier(0.25, 1, 0.5, 1)" : "none"

                        }}
                    >
                        <div className="box" id="box">
                            <div className="box1">
                                <span className="font span1"><h5>Man Chlotes</h5></span>
                                <span className="font span2"><h5>Woman Chlotes</h5></span>
                                <span className="font span3"><h5>Jewlery</h5></span>
                                <span className="font span4"><h5>Electronics</h5></span>
                                <span className="font span5"><h5>Vintage</h5></span>
                                <span className="font span6"><h5>10% korting</h5></span>
                                <span className="font span7"><h5>extra spin</h5></span>
                                <span className="font span8"><h5>15% korting</h5></span>
                                <span className="font span9"><h5>gift</h5></span>
                                <span className="font span10"><h5>30% korting</h5></span>
                            </div>
                        </div>
                    </div>

                    <button onClick={wheelOfFortune} disabled={spinning || spin <= 0}>
                        {spinning ? 'Spinning...' : `Spin (${spin} left)`}
                    </button>

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







