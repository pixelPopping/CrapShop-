import axios from 'axios'
import data  from  '../constants/data.json'
import {useState} from "react";


function Shop (){
    const [shop,setShop]= useState([])
    const show = data.map((shop) => shop.id === shop.id);
    console.log(show);

    const getData = async () => {
        try {
            const response = await axios.get(`'https://fakestoreapi.com/products'`, )
            console.log(response.data);
            setShop(response.data);
        } catch (error) {
            console.log(error)
        }
        return show
    };


    return (
        <>
            <h1>Countries and Populations</h1>
            <button type="button" onClick={getData}>Apply</button>
            <ul>
                {shop.map((id, index) => (
                    <li key={index}>
                        {id.title}
                    </li>
                ))}
            </ul>
        </>


    )

}

export default Shop

