import './CategoryCard.css'

const CategoryCard = ({ image, label, text, price, rating, onClick }) => {
    return (
        <div className="category-container">
        <section onClick={onClick} className="category-card">
            <div className="category-card-content">
            <img src={image} alt={label} />
            <h3>{label}</h3>
            <p>{text}</p>
            <p>{price}</p>
            <p>⭐ {rating}</p>
            </div>
        </section>
        </div>
    );
};

export default CategoryCard;



