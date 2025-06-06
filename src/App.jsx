//prioriteiten
// 1 wheel of fortune
// 2 shopping cart
// 3 registreren en inloggen
// 4 zoek filter/ categorieen box


import './App.css';
import { useState } from 'react';


function App() {
  const [results, setResults] = useState('')
  const [spin, setSpin] = useState(3)
  const [spinning, setSpinng] = useState(false);

  function wheelOfFortune() {
    if (spin <= 0) return;
    let wheelOfFortune = ["ManChlotes", "FemaleChlotes", "Jewlery", "Electronics", "Vintage",];
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
      <section className="App">
        <div  className="animated-box">
          <ul>

          </ul>
          <button onClick={wheelOfFortune} disabled={spin <= 0}>spin ({spin} left)</button>
          {results && <p>You got: <strong>{results}</strong></p>}

        </div>
      </section>
        <div className={`wheel ${spinning ? 'spinning' : ''}`}>
          <li className="item">"ManChlotes"</li>
          <li className="item">"FemaleChlotes"</li>
          <li className="item">"Jewlery"</li>
          <li className="item">"Electronics"</li>
          <li className="item">"Vintage"</li>
        </div>


      </>
  );
}

export default App

