function RecensieItem({ label, text, likes, onLike }) {
    return (
        <div className="recensie-item">
            <p><strong>{label}</strong>: {text}</p>
            <p>Likes: {likes}</p>
            <button onClick={onLike}>Like</button>
        </div>
    );
}

export default RecensieItem;

