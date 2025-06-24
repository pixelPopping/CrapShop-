import axios from 'axios'
import data from  '../constants/data.json'


function getShop () {
    const getData = async () => {
        try {
            const response = await axios.get(`'https://fakestoreapi.com/products'`, )
            console.log(response.data);
        } catch (error) {
            console.log(error)
        }
    };


return (
    <button type="button" onClick={getData}></button>
)

}

export default getShop
