const CategoryCard = ({ image, label, text, rating, onClick }) => {
    return (
        <div className="category-card" onClick={onClick}>
            <img src={image} alt={label} />
            <h3>{label}</h3>
            <p>{text}</p>
            <span>⭐ {rating}</span>
        </div>
    );
};

export default CategoryCard;
