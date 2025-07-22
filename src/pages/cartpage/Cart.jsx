
import {useContext, useEffect, useState} from "react";
import {ShoppingCartContext} from "../../components/context/ShoppingCartContext.jsx";
import axios from "axios";
import {useParams} from "react-router-dom";
import ShoppingCart from "../../components/shoppingCart/ShoppingCart.jsx";

// stap1 cart component maken
// stap2 abonneren op context
// stap3 state toevoegen voor het opslaan van de items in de cart
// stap4 async await functie schrijven die de request van cart 1 ophaalt die aangemaakt is in de context
// stap5 useEffect toevoegen voor de mounth
// stap6 mappen over de lengte van de cart

function Cart() {
    const [cartItems, setCartItems] = useState([]);
    const {items, reSet,} = useContext(ShoppingCartContext);

    useEffect(() => {
        async function getCartData() {
            try {
                const cartRequest = await axios.get(`https://fakestoreapi.com/carts/1`)
                console.log(cartRequest)
                setCartItems(cartRequest.data);
            } catch (e) {

                console.error(e);
            }
        }

        getCartData();
    }, [])


    return (
        <div>
            <ShoppingCart
                product={items}
                cartItems={cartItems}
            />
             <button onClick={() => reSet()}>Reset</button>
        </div>
    )
}

export default Cart;