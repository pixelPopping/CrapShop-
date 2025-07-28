import {useNavigate} from "react-router-dom";

function  Menchlotes () {
    const navigate = useNavigate();
    return (
        <>
            <h1>Men Clothes</h1>
            <button type="button" onClick={() => navigate("/")}>Home</button>
        </>
    )
}

export default Menchlotes;