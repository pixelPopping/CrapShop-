
import "./wheelspin.css";
import { useContext, useEffect } from "react";
import { SpinContext } from "../context/SpinContext.jsx";

function WheelOfFortune({ buttonLabel = "Spin", onResult }) {
    const { handleSpin, spin, spinning, results } = useContext(SpinContext);

    useEffect(() => {
        if (results && onResult) {
            onResult(results);
        }
    }, [results, onResult]);

    return (
        <div className="wheel-container">
            <button
                className="spin-button"
                onClick={handleSpin}
                disabled={spinning || spin <= 0}
            >
                {spinning ? "Spinning..." : `${buttonLabel} (${spin} left)`}
            </button>

            {results && !spinning && (
                <p className="spin-result">
                    Je hebt gewonnen: <strong>{results}</strong>
                </p>
            )}
        </div>
    );
}

export default WheelOfFortune;





