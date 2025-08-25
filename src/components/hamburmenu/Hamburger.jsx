import React from "react";
import "./Hamburger.css";

function Hamburger ({ menuOpen, setMenuOpen }){
    return (

        <div
            className={`hamburger ${menuOpen ? "open" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu openen/sluiten"
        >
            <span></span>
            <span></span>
            <span></span>
        </div>
    );
}

export default Hamburger;