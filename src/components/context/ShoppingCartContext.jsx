import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export const ShoppingCartContext = createContext({});

export const ShoppingCartProvider = ({ children }) => {
    const [product, setProduct] = useState(null);
    const [cartItems, setCartItems] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        async function getCartData() {
            try {
                const newCart = { userId: 1, products: [{ id: 1 }, { id: 2 }] };
                const postCart = await axios.post('https://fakestoreapi.com/carts', newCart);
                const productIds = postCart.data.products.map(item => item.id);

                const fetchProducts = await Promise.all(
                    productIds.map(id => axios.get(`https://fakestoreapi.com/products/${id}`))
                );

                const enrichedItems = fetchProducts.map(res => res.data);
                setCartItems(enrichedItems);

                if (id) {
                    const selectedProduct = await axios.get(`https://fakestoreapi.com/products/${id}`);
                    setProduct(selectedProduct.data);
                }
            } catch (e) {
                console.error(e);
            }
        }

        getCartData();
    }, [id]);

    function cart(item) {
        setCartItems(prev => [...prev, item]);
    }


    function reset() {
        setCartItems([]);
    }

    function totalPrice() {
        return cartItems.reduce((totaal, item) =>
            totaal + (parseFloat(item.price) || 0), 0);
    }

    function amountCart() {
        return cartItems.length;
    }

    const data = {
        product,
        items: cartItems,
        cart: cart,
        reSet: reset,
        price: totalPrice,
        lengthcart: amountCart,
    };

    return (
        <ShoppingCartContext.Provider value={data}>
            {children}
        </ShoppingCartContext.Provider>
    );
};

export default ShoppingCartProvider;


