import {useContext, useEffect, useState} from 'react';
import DetailCard from "../detailcard/DetailCard.jsx";
import axios from "axios";
import { useParams } from "react-router-dom";
import {ShoppingCartContext} from "../context/ShoppingCartContext.jsx";

//({ resetButton, cartItems})


function ShoppingCart() {
const {items, price, lengthcart, reSet} = useContext(ShoppingCartContext);

    //const { id } = useParams();

   // useEffect(() => {
       // async function fetchProduct() {
         //   try {
               // const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
              //  setProduct(response.data);
          //  } catch (e) {
               // console.error(e);
          //  }
//}
      //  fetchProduct();
   //}, [id]);

    //function reset() {
     //   setCartItems([]);
   //}


    //function totaalPrijs() {
    //   return cartItems.reduce((totaal, item) => totaal + item.price, 0);
    //}


    ///functie schrijven met reduce om de lengte van de shoppingcart te berekenen


   // function totaalAantal() {
   //     return cartItems.reduce((aantal, item) => aantal + 1, 0);
   // }



    // function addToCart() {
      //  if (product)
          //  items([...items, product]);
       // }


    return (
        <>
            <div className="inner-container"></div>

            <h2>Winkelwagen</h2>
            <ul>
                {items.length === 0 && <li>leeg</li>}
                {items.map((item) => (
                    <li key={item.id}>
                        {item.title}  {item.price}
                    </li>
                ))}
            </ul>
            <p><strong>Totaalprijs:</strong> €{price().toFixed(2)}</p>
            <p><strong>Totaalproducten: {lengthcart()}</strong></p>
            <button onClick={()=> reSet()}>reset</button>
            </>
    );
}

export default ShoppingCart;
