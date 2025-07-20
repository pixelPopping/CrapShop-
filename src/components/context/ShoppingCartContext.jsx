import {createContext, useEffect, useState} from "react";
import App from "../../App.jsx";
import axios from "axios";
import {useParams} from "react-router-dom";


export const ShoppingCartContext = createContext({});



export const ShoppingCartProvider = ({children}) => {
    const [product, setProduct] = useState(null);
    const [cartItems, setCartItems] = useState([]);
    const {id} = useParams();


    useEffect(() => {
        async function getCartData() {
            try {
                const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
                const newCart = { userId: 1, products: [{ id: 1 }] };
                const getNewCart = await axios.post('https://fakestoreapi.com/carts', newCart)
                const cartRequest = await axios.get('https://fakestoreapi.com/carts/1')
                console.log(cartRequest)
                console.log(getNewCart);
                console.log(response.data);
                setProduct(response.data);
                setCartItems(cartRequest.data);
                setCartItems(getNewCart.data);
            } catch (e) {

                console.error(e);
            }
        }

        getCartData();
    }, [id])


    const data = {
        product,
        cartItems,
        cart: addToCart,
        reSet: reset,
    }
console.log(data);

    function addToCart(cartItems) {
       localStorage.setItem("cartItems", JSON.stringify(data));
        if (product) {
            setCartItems([...cartItems, product]);
        }
    }

    function reset() {
        setCartItems([]);
    }



    return (
        <ShoppingCartContext.Provider value={data}>
            {children}
        </ShoppingCartContext.Provider>
    )

}


export default ShoppingCartProvider

