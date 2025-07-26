//prioriteiten
// 1 wheel of fortune
// 2 shopping cart
// 3 registreren en inloggen
// 4 zoek filter/ categorieen box
import {Routes, Route, Navigate,} from 'react-router-dom';
import './App.css';
import './components/ui/wheelspin.css';
import Home from './pages/home/Home.jsx';
import Shop from './pages/shop/Shop.jsx';
import Menchlotes from './pages/menchlotes/Menchlotes.jsx';
import WomanChlotes from './pages/womanchlotes/WomanChlotes.jsx';
import Electronics from './pages/electronics/Electronics.jsx';
import Jewlery from './pages/jewlery/Jewlery.jsx';
import DetailPagina from './pages/detailPagina/DetailPagina.jsx';
import Navigation from './components/navbar/Navigation';
import ShoppingCartContext from "./components/context/ShoppingCartContext.jsx";
import Cart from './pages/cartpage/Cart.jsx';
import Profiel from "./pages/profiel/Profiel.jsx";
import SignUp from "./pages/signUP/SignUp.jsx";
import SignIn from "./pages/signIn/SignIn.jsx";
import {useContext} from "react";
import {AuthContext} from "./components/context/AuthContext.jsx";




function App () {
    const {isAuth} = useContext(AuthContext);
    return (
        <>
            <Navigation />
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/profiel" element={ isAuth ? <Profiel/> : <Navigate to="/signin"/>}/>
                <Route path="/signup" element={<SignUp/>}/>
                <Route path="/signin" element={<SignIn/>}/>
                <Route path="/Shop" element={<Shop/>} />
                <Route path="/Menchlotes" element={<Menchlotes/>}/>
                <Route path="/Womanchlotes" element={<WomanChlotes/>}/>
                <Route path="/Electronics"   element={<Electronics/>} />
                <Route path="/Jewlery" element={<Jewlery/>} />
                <Route path="/detailpagina/:id" element={<DetailPagina/>}/>
                <Route path="/cart/" element={<Cart/>} />

            </Routes>


        </>
    )

}
export default App

