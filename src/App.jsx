import './App.css';
import { useState } from 'react';


function App() {
  const [results, setResults] = useState('')
  const [spin, setSpin] = useState('')

  function wheelOfFortune() {
    let wheelOfFortune = ["ManChlotes", "FemaleChlotes", "Jewlery", "Electronics", "Vintage",];
    let i = Math.floor(Math.random() * wheelOfFortune.length);
    let selectedItem  = wheelOfFortune[i];
    setResults(selectedItem);

  }
  return (
      <section className="App">
        <div  className="animated-box">
          <ul>
            <li className="item">"ManChlotes"</li>
            <li className="item">"FemaleChlotes"</li>
            <li className="item">"Jewlery"</li>
            <li className="item">"Electronics"</li>
            <li className="item">"Vintage"</li>
            <button onClick={wheelOfFortune}>spin</button>
            {results && <p>You got: <strong>{results}</strong></p>}
          </ul>
        </div>
      </section>

  );
}

export default App

