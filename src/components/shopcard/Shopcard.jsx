import './Shopcard.css';

function Shopcard({ id, label, text, image}) {
    return(
        <>
            <div className="inner-container">
            <article className="card">
                <h3>{label} (#{id})</h3>
                <p>{text}</p>
                <img src={image} alt={label} />
            </article>
            </div>
        </>

    )
}

export default Shopcard;