import './App.css';
import { useState } from 'react';


function App() {
  const [results, setResults] = useState('')
  const [spin, setSpin] = useState(3)

  function wheelOfFortune() {
    if (spin <= 0) return;
    let wheelOfFortune = ["ManChlotes", "FemaleChlotes", "Jewlery", "Electronics", "Vintage",];
    let i = Math.floor(Math.random() * wheelOfFortune.length);
    let selectedItem = wheelOfFortune[i];
    setResults(selectedItem);




    setSpin(prev => prev -1);

   // if (spin >= 3) {
     /// setSpin(0)
    //}
  }
  return (
      <>
      <section className="App">
        <div  className="animated-box">
          <ul>
            <li className="item">"ManChlotes"</li>
            <li className="item">"FemaleChlotes"</li>
            <li className="item">"Jewlery"</li>
            <li className="item">"Electronics"</li>
            <li className="item">"Vintage"</li>
          </ul>
          <button onClick={wheelOfFortune} disabled={spin <= 0}>spin ({spin} left)</button>
          {results && <p>You got: <strong>{results}</strong></p>}

        </div>
      </section>
        <div className="container">
        </div>

      </>
  );
}

export default App

