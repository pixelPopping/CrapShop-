import {useContext, useEffect, useState} from 'react';
import DetailCard from "../detailcard/DetailCard.jsx";
import axios from "axios";
import { useParams } from "react-router-dom";
import {ShoppingCartContext} from "../context/ShoppingCartContext.jsx";

//({ resetButton, cartItems})

function ShoppingCart({ resetButton, cartItems}){


   // const { id } = useParams();

    //useEffect(() => {
        //async function fetchProduct() {
           // try {
               // const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
               // setProduct(response.data);
           // } catch (e) {
               // console.error(e);
          //  }
       // }
       // fetchProduct();
   // }, [id]);

    //function reset() {
       // setCartItems([]);
   // }


    function totaalPrijs() {
       return cartItems.reduce((totaal, item) => totaal + item.price, 0);
    }


    //function addToCart() {
       // if (product) {
          //  setCartItems([...cartItems, product]);
        //}
    //}

    return (
        <>
            <div className="inner-container"></div>

            <h2>Winkelwagen</h2>
            <ul>
                {cartItems.length === 0 && <li>leeg</li>}
                {cartItems.map((item) => (
                    <li key={item.id}>
                        {item.title} - €{item.price}
                    </li>
                ))}
            </ul>
            <p><strong>Totaalprijs:</strong> €{totaalPrijs().toFixed(2)}</p>
            <button onClick={resetButton}>reset</button>

    />
            </>
    );
}

export default ShoppingCart;
