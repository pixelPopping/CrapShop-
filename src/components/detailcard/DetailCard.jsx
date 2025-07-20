
import { useNavigate } from 'react-router-dom';

function DetailCard({ id, label, text, image, button,}) {
    const navigate = useNavigate();

    function handleClick() {
        navigate(`/shop/`);
    }

    return (

        <article className="card" >
            <h3>{label} {id}</h3>
            <img src={image} alt={label} style={{ width: '200px', objectFit: 'contain' }} />
            <p>{text}</p>
            <button onClick={button}>add to cart</button>
        </article>
    );
}

export default DetailCard;