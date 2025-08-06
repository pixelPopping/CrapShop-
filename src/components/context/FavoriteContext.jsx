import { createContext, useContext, useEffect, useRef, useState } from 'react';

export const FavoriteContext = createContext();
export const useFavorites = () => useContext(FavoriteContext);

const getStorageKey = (userId) => `favorites_${userId}`;

const FavoriteProvider = ({ children, user }) => {
    const [items, setItems] = useState([]);
    const [isReady, setIsReady] = useState(false);
    const hasInitialized = useRef(false);

    useEffect(() => {
        if (!user?.id) {
            setIsReady(true); // fallback als er geen user is
            return;
        }

        const saved = localStorage.getItem(getStorageKey(user.id));
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                setItems(Array.isArray(parsed) ? parsed : []);
            } catch {
                setItems([]);
            }
        } else {
            setItems([]);
        }

        hasInitialized.current = true;
        setIsReady(true);
    }, [user?.id]);

    useEffect(() => {
        if (!user?.id || !hasInitialized.current) return;
        localStorage.setItem(getStorageKey(user.id), JSON.stringify(items));
    }, [items, user?.id]);

    const addFavorite = (item) => setItems((prev) => [...prev, item]);
    const removeFavorite = (id) => setItems((prev) => prev.filter((item) => item.id !== id));

    const toggleFavorite = (item) => {
        setItems((prev) => {
            const exists = prev.some((fav) => fav.id === item.id);
            return exists ? prev.filter((fav) => fav.id !== item.id) : [...prev, item];
        });
    };

    return (
        <FavoriteContext.Provider
            value={{ items, addFavorite, removeFavorite, toggleFavorite, isReady }}
        >
            {children}
        </FavoriteContext.Provider>
    );
};

export default FavoriteProvider;








