import { createContext, useContext, useEffect, useRef, useState } from "react";
import getItems from "../../helpers/getItems";
import getAnglePerItem from "../../helpers/getAnglePerItem";
import getRandomIndex from "../../helpers/getRandomIndex";
import { AuthContext } from "./AuthContext.jsx";
import { useNavigate } from "react-router-dom";

export const SpinContext = createContext({});

export const SpinProvider = ({ children }) => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [results, setResults] = useState("");
    const timeoutRef = useRef(null);
    const hasInitialized = useRef(false);
    const [spin, setSpin] = useState(3);
    const [spinning, setSpinning] = useState(false);
    const [rotation, setRotation] = useState(0);
    const getStorageKey = (userId) => `spinsLeft_${userId}`;

   
    useEffect(() => {
        return () => clearTimeout(timeoutRef.current);
    }, []);


    useEffect(() => {
        if (!user?.id) return;

        const savedSpins = localStorage.getItem(getStorageKey(user.id));
        if (savedSpins !== null && !isNaN(savedSpins)) {
            setSpin(Number(savedSpins));
        } else {
            setSpin(3);
            localStorage.setItem(getStorageKey(user.id), "3");
        }

        hasInitialized.current = true;
    }, [user?.id]);


    useEffect(() => {
        if (user?.id && hasInitialized.current) {
            localStorage.setItem(getStorageKey(user.id), spin.toString());
        }
    }, [spin, user?.id]);

    useEffect(() => {
        if (!results) return;

        const delay = setTimeout(() => {
            switch (results) {
                case "jewelery":
                case "men's clothing":
                case "women's clothing":
                case "electronics":
                    navigate(`/products/${encodeURIComponent(results)}`);
                    break;
            }

            setResults("");
        }, 2500);

        return () => clearTimeout(delay);
    }, [results, navigate]);




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
        <SpinContext.Provider
            value={{
                spin,
                setSpin,
                handleSpin,
                results,
                spinning,
                rotation,
                setRotation,
                setSpinning,
                timeoutRef
            }}
        >
            {children}
        </SpinContext.Provider>
    );
};

export default SpinProvider;



