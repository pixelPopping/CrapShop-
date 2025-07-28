import {useNavigate} from "react-router-dom";

function  Vintage () {
    const navigate = useNavigate();
    return (
        <>
            <h1>Vintage</h1>
            <button type="button" onClick={() => navigate("/")}>Home</button>
        </>
    )
}

export default Vintage;