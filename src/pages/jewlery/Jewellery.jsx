import {useNavigate} from "react-router-dom";

function  Jewlery () {
    const navigate = useNavigate();
    return (
        <>
            <h1>Jewlery</h1>
            <button type="button" onClick={() => navigate("/")}>Home</button>
        </>
    )
}

export default Jewlery;