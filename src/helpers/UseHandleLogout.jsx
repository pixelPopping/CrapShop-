import {useContext} from "react";
import {FavoriteContext} from "../components/context/FavoriteContext.jsx";
import {AuthContext} from "../components/context/AuthContext.jsx";

function UseHandleLogout() {
    const {resetFavorites} = useContext(FavoriteContext);
    const {logout, user} = useContext(AuthContext);

    const getStorageKey = (userId) => `Favorieten_${userId || "guest"}`;

    return () => {
        const key = getStorageKey(user?.id);
        localStorage.removeItem(key);
        resetFavorites();
        logout();
    };
}


export default UseHandleLogout;
