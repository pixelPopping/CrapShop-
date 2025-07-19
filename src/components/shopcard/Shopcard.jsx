import './Shopcard.css';
import { useNavigate } from 'react-router-dom';

function Shopcard({ id, label, text, image, onClick }) {
    const navigate = useNavigate();

   // function handleClick() {
       // navigate(`/detailpagina/${id}`);
    //}

    return (
        <article className="card" onClick={onClick}>
            <h3>{label} {id}</h3>
            <img src={image} alt={label} />
            <p>{text}</p>
        </article>
    );
}

export default Shopcard;
