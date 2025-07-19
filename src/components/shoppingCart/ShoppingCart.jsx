
import {useState} from 'react'


function ShoppingCart() {
    const [items, setItems] = useState([]);
    const [cartItems, setCartItems] = useState([])



    function reset (){
        setCartItems([]);
    }

    function totaalPrijs (){
        return items.reduce((totaal, item) => totaal + item.price, 0)
    }




    function addToCart(product){
        setItems([  ...items, product,])
    }


    return (
        <>
            <h2>Producten</h2>
            <ul>
                {items.map(product => (
                    <li key={product.id}>
                        {product.title} {product.price.toFixed(2)}
                        <button  onClick={() => addToCart(product)} type="button">add item</button>
                    </li>
                ))}
            </ul>

        <h2>WinkelWagen</h2>
            <ul>
                {cartItems.length === 0 && <li>leeg</li>}
                {cartItems.map((item, index) => (
                    <li key={index}>
                {item.title} {item.price.toFixed(2)}
            </li>
                    ))}
            </ul>
            <p><strong>Totaalprijs:</strong> €{totaalPrijs().toFixed(2)}</p>
        <button  onClick={reset} type="button">remove item</button>
        </>
    )

}

export default ShoppingCart;