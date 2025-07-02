
import { useNavigate } from 'react-router-dom';

function DetailCard({ id, label, text, image }) {
    const navigate = useNavigate();

    function handleClick() {
        navigate(`/shop/`);
    }

    return (
        <article className="card" onClick={handleClick}>
            <h3>{label} {id}</h3>
            <img src={image} alt={label} style={{ width: '200px', objectFit: 'contain' }} />
            <p>{text}</p>
        </article>
    );
}

export default DetailCard;