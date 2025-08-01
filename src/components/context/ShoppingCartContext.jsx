import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const ShoppingCartContext = createContext({});

export const ShoppingCartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const savedCart = localStorage.getItem("cartItems");

        if (savedCart) {
            const parsed = JSON.parse(savedCart);
            const unique = parsed.reduce((acc, item) => {
                const existing = acc.find(i => i.id === item.id);
                if (existing) {
                    existing.quantity += item.quantity;
                } else {
                    acc.push({ ...item });
                }
                return acc;
            }, []);
            setCartItems(unique);
        } else {
            async function getCartData() {
                try {
                    const postCart = await axios.post('https://fakestoreapi.com/carts');
                    const productIds = postCart.data.map(item => item.id);

                    const fetchProducts = await Promise.all(
                        productIds.map(id => axios.get(`https://fakestoreapi.com/products/${id}`))
                    );

                    const enrichedItems = fetchProducts.map(res => ({
                        ...res.data,
                        quantity: 1
                    }));

                    setCartItems(enrichedItems);
                } catch (e) {
                    console.error(e);
                }
            }

            getCartData();
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }, [cartItems]);

    function cart(newItem) {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(item => item.id === newItem.id);
            if (existingItem) {
                return prevItems.map(item =>
                    item.id === newItem.id
                        ? { ...item, quantity: item.quantity + (newItem.quantity || 1) }
                        : item
                );
            } else {
                return [...prevItems, { ...newItem, quantity: newItem.quantity || 1 }];
            }
        });
    }

    function reset() {
        setCartItems([]);
    }

    function totalPrice() {
        return cartItems.reduce((totaal, item) =>
            totaal + (parseFloat(item.price) || 0) * (item.quantity || 1), 0);
    }

    function amountCart() {
        return cartItems.length;
    }

    function increaseQuantity(id) {
        setCartItems(prev =>
            prev.map(item =>
                item.id === id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
            )
        );
    }

    function decreaseQuantity(id) {
        setCartItems(prev =>
            prev
                .map(item =>
                    item.id === id
                        ? { ...item, quantity: (item.quantity || 1) - 1 }
                        : item
                )
                .filter(item => item.quantity > 0)
        );
    }

    function setQuantity(id, amount) {
        setCartItems(prev =>
            prev.map(item =>
                item.id === id ? { ...item, quantity: amount } : item
            )
        );
    }

    function removeItem(id) {
        setCartItems(prev => prev.filter(item => item.id !== id));
    }

    const data = {
        items: cartItems,
        cart,
        reSet: reset,
        price: totalPrice,
        lengthcart: amountCart,
        increaseQuantity,
        decreaseQuantity,
        setQuantity,
        removeItem,
    };

    return (
        <ShoppingCartContext.Provider value={data}>
            {children}
        </ShoppingCartContext.Provider>
    );
};

export default ShoppingCartProvider;















