import { createContext, useContext, useEffect, useRef, useState } from 'react';

export const FavoriteContext = createContext({});
export const useFavorites = () => useContext(FavoriteContext);

const getStorageKey = (userId) => `favorites_${userId || 'guest'}`;

const FavoriteProvider = ({ children, user }) => {
    const [items, setItems] = useState([]);
    const [isReady, setIsReady] = useState(false);
    const hasInitialized = useRef(false);
    const isLoggedOut = !user?.id;

    useEffect(() => {
        const key = getStorageKey(user?.id);

        if (isLoggedOut) {
            localStorage.removeItem(key);
            setItems([]);
            setIsReady(true);
            return;
        }

        const saved = localStorage.getItem(key);
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
        if (!hasInitialized.current || isLoggedOut) return;
        const key = getStorageKey(user?.id);
        localStorage.setItem(key, JSON.stringify(items));
    }, [items, user?.id]);

    const addFavorite = (item) => setItems((prev) => [...prev, item]);
    const removeFavorite = (id) => setItems((prev) => prev.filter((item) => item.id !== id));
    const toggleFavorite = (item) => {
        setItems((prev) => {
            const exists = prev.some((fav) => fav.id === item.id);
            return exists ? prev.filter((fav) => fav.id !== item.id) : [...prev, item];
        });
    };

    const resetFavorites = () => {
        const key = getStorageKey(user?.id);
        localStorage.removeItem(key);
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
                isReady,
            }}
        >
            {children}
        </FavoriteContext.Provider>
    );
};

export default FavoriteProvider;



