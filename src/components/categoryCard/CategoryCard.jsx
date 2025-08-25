const CategoryCard = ({ image, label, text, price, rating, onClick }) => {
    return (
        <div className="category-card" onClick={onClick}>
            <img src={image} alt={label} />
            <h3>{label}</h3>
            <p>{text}</p>
            <p>{price}</p>
            <p>⭐ {rating}</p>
        </div>
    );
};

export default CategoryCard;



