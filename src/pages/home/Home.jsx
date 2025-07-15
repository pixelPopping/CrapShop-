import {useEffect, useRef, useState} from "react";
import './Home.css';
import ZoekBalk from "../../components/searchFilter/ZoekBalk.jsx";

function Home() {
    const [results, setResults] = useState('');
    const [spin, setSpin] = useState(3);
    const [spinning, setSpinning] = useState(false);
    const timeoutRef = useRef(null);
    const [stophoek, setStophoek] = useState(0);
    const [rotation, setRotation] = useState(0);



    function wheelOfFortune() {
        if (spin <= 0 || spinning) return;


        const items = [
            "ManChlotes", "WomanChlotes", "Jewlery", "Electronics",
            "Vintage", "10% korting", "15% korting", "30% korting"
        ];

        const i = Math.floor(Math.random() * items.length);
        const selectedItem = items[i];
        const anglePerItem = 360 / items.length;
        const randomOffset = Math.random() * anglePerItem;

        const newRotation = rotation + (360 * 5) + (i * anglePerItem) + randomOffset;

        setStophoek(newRotation);
        setRotation(newRotation);
        setSpinning(true);

        timeoutRef.current = setTimeout(() => {
            setSpinning(false);
            setResults(selectedItem);
            setSpin(prev => prev - 1);
        }, 2500);
    }

    useEffect(() => {
        return () => clearTimeout(timeoutRef.current);
    }, []);

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
                            transform: `rotate(${stophoek}deg)`,
                            transition: spinning ? "transform 2.5s ease-out" : "none"
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
                                <span className="font span2"><h5>Vintage</h5></span>
                                <span className="font span3"><h5>15% korting</h5></span>
                                <span className="font span4"><h5>Jewlery</h5></span>
                                <span className="font span5"><h5>30% korting</h5></span>
                            </div>
                        </div>
                    </div>
                    <button onClick={wheelOfFortune} disabled={spin <= 0}>spin ({spin} left)</button>
                    {results && <p>You got: <strong>{results}</strong></p>}
                </div>
            </main>
        </>
    );
}

export default Home;
