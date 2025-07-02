import {useParams, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import ZoekBalk from "../../components/searchFilter/ZoekBalk.jsx";
import DetailCard from "../../components/detailcard/DetailCard.jsx";

function DetailPagina () {
    const [shop, setShop] = useState([]);
    const [query, setQuery] = useState("");
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        setError(false);
        async function ShopDetails() {
            try {
                const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
                setShop(response.data);
            } catch (e) {
                setError(true);
                console.error(e);
            } finally {
                setLoading(false);
            }
        }
        ShopDetails();
    }, [id]);

    function handleNavigate() {
        navigate("/shop");
    }



    return (
        <>
            {loading && <p>Bezig met laden...</p>}
            {error && <p>Er ging iets mis bij het ophalen van de producten.</p>}

            {!loading && !error && shop && (
        <div className="outer-container">
            <ZoekBalk
                type="tekst"
                inputValue={query}
                inputCallback={setQuery}
            />
            <div className="inner-container">
                {shop && (
                    <DetailCard
                        key={shop.id}
                        label={shop.title}
                        text={shop.description}
                        image={shop.image}
                    />
                    )}
            </div>
        </div>
    )}
</>
);
}

export default DetailPagina;