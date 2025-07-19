//stap 1 functie scrhijven voor de wheel of fortune
//stap 2 array van items
//stap 3 ul list maken items in wheel spin
//stap 4 spin button maken en interactief maken
//stap 5 spin button disabeld na 3 spins
//stap 6 react context gebruiken als een nieuwe gebruiker inlogt spin counter reset naar 3 spins
//stap 7 wheel of fortune interactief maken

import { useEffect, useRef, useState } from "react";
import getAnglePerItem from "../../helpers/getAnglePerItem";
import getItems from "../../helpers/getItems";
import getRandomIndex from "../../helpers/getRandomIndex";
import "./wheelspin.css";


function WheelOfFortune({ setResults,  spin, setSpin, spinning, setSpinning, rotation, setRotation,  timeoutRef,  }) {

    useEffect(() => {
        return () => clearTimeout(timeoutRef.current);
    }, []);

        function handleSpin() {
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
        <button onClick={handleSpin} disabled={spinning || spin <= 0}>
            {spinning ? 'Spinning...' : `Spin (${spin} left)`}
        </button>

)
}

export default WheelOfFortune;

