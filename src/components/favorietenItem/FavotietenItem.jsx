function FavorietenItem({ item }) {
    return (
        <div style={{ marginBottom: "1rem" }}>
            <img
                src={item.image}
                alt={item.title}
                onError={(e) => { e.target.src = "/assets/image/fallback.png"; }}
                style={{
                    width: "200px",
                    height: "200px",
                    objectFit: "contain",
                    marginBottom: "8px"
                }}
            />
            <p>
                {item.title} – €{item.price.toFixed(2)} × {item.quantity ?? 1} = €{(item.price * (item.quantity ?? 1)).toFixed(2)}
            </p>
        </div>
    );
}

export default FavorietenItem;


