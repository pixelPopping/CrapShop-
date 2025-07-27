import { useContext } from "react";
import { SpinContext } from "../context/SpinContext";
import "./wheelspin.css";

function WheelOfFortune() {
    const {
        handleSpin,
        spin,
        spinning
    } = useContext(SpinContext);

    return (
        <button className="spin-button" onClick={() =>handleSpin()} disabled={spinning || spin <= 0}>
            {spinning ? "Spinning..." : `Spin (${spin} left)`}
        </button>
    );
}

export default WheelOfFortune;





