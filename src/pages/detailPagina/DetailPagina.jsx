import {useParams, useNavigate} from "react-router-dom";

function DetailPagina () {
    const { productId } = useParams();
    const navigate = useNavigate();

    function handleNavigate() {
        navigate("/shop");
    }

    return (
        <>
        <h1>DetailPagina Page {productId}</h1>
    <h2 onClick={handleNavigate}>terug naar blog Shop</h2>
        </>
    )
}

export default DetailPagina;