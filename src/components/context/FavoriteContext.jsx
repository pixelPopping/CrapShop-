import { createContext, useState, useEffect, useContext } from "react";
import { AuthContext } from "./AuthContext.jsx";

export const FavoriteContext = createContext({});

export const FavoriteProvider = ({ children }) => {
    const { user } = useContext(AuthContext);
    const [items, setItems] = useState([]);

    const getUserId = () => {
        const userId = localStorage.getItem("user_id");
        return userId && userId !== "Onbekend" ? userId : null;
    };

    const getStorageKey = () => {
        const userId = getUserId();
        return userId ? `favorites_user_${userId}` : "favorites_guest";
    };

    useEffect(() => {
        const key = getStorageKey();
        console.log("🔑 Gebruikte storage key:", key);

        const stored = localStorage.getItem(key);
        if (stored) {
            try {
                const parsed = JSON.parse(stored);
                console.log("✅ Gevonden favorieten:", parsed);
                setItems(parsed);
            } catch (e) {
                console.error("❌ Fout bij parsen van favorieten:", e);
            }
        } else {
            console.log("ℹ️ Geen favorieten gevonden voor deze gebruiker.");
        }
    }, [user?.id]);

    useEffect(() => {
        if (user?.id) {
            const key = getStorageKey();
            console.log("💾 Favorieten opslaan onder:", key, items);
            localStorage.setItem(key, JSON.stringify(items));
        }
    }, [items, user?.id]);

    const addFavorite = (item) => {
        console.log("➕ Favoriet toevoegen:", item);
        if (!items.find((i) => i.id === item.id)) {
            setItems((prev) => [...prev, item]);
        }
    };

    const removeFavorite = (id) => {
        console.log("➖ Favoriet verwijderen:", id);
        setItems((prev) => prev.filter((item) => item.id !== id));
    };

    const toggleFavorite = (item) => {
        console.log("🔁 Toggle favoriet:", item);
        if (items.find((i) => i.id === item.id)) {
            removeFavorite(item.id);
        } else {
            addFavorite(item);
        }
    };

    const resetFavorites = () => {
        console.log("🧹 Favorieten resetten");
        setItems([]);
    };

    return (
        <FavoriteContext.Provider
            value={{
                items,
                addFavorite,
                removeFavorite,
                toggleFavorite,
                resetFavorites,
                totalFavorites: items.length,
                setItems,
            }}
        >
            {children}
        </FavoriteContext.Provider>
    );
};

export default FavoriteProvider;







