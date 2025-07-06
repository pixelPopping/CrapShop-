import {useState} from "react";
import './Home.css';
import ZoekBalk from "../../components/searchFilter/ZoekBalk.jsx";
import Navigation from "../../components/navbar/Navigation.jsx";


function Home() {
    const [results, setResults] = useState('')
    const [spin, setSpin] = useState(3)
    const [spinning, setSpinng] = useState(false);
    const [filter, setFilter] = useState('');

    const handleSearchSubmit = (value) => {
       setFilter(value)
    };

    function wheelOfFortune() {

        if (spin <= 0) return;
        let wheelOfFortune = ["ManChlotes", "WomanChlotes", "Jewlery", "Electronics", "Vintage", "10% korting", "15% korting", "30% korting",];
        let i = Math.floor(Math.random() * wheelOfFortune.length);
        let selectedItem = wheelOfFortune[i];


        setSpinng(true)

        setTimeout(() => {
            setSpinng(false)
            setResults(selectedItem);
            setSpin(prev => prev - 1);
        }, 2000)
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
            <form>
            <ZoekBalk
                type="text"
                inputValue={filter}
                inputCalback={handleSearchSubmit}/>
            </form>
            </div>
        </nav>

        <header>
            <h1>CrapShop</h1>
        </header>
        <main>

            <section className="App">
                <div className="animated-box">
                </div>
            </section>
            <div className={`mainbox ${spinning ? 'spinning' : ''}`}>
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
                <button onClick={wheelOfFortune} disabled={spin <= 0}>spin ({spin} left)</button>
                {results && <p>You got: <strong>{results}</strong></p>}
            </div>
        </main>
</>
)
}


export default Home;