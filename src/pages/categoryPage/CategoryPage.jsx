import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const CategoryPage = () => {
    const { category } = useParams();
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await axios.get('https://fakestoreapi.com/products');
                const filtered = res.data.filter(item => item.category === category);
                setProducts(filtered);
            } catch (error) {
                console.error('Fout bij ophalen producten:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [category]);

    if (loading) return <p>Producten laden...</p>;

    return (
        <div className="category-page">
            <h1>{category}</h1>
            <div className="product-grid">
                {products.map(product => (
                    <div key={product.id} className="product-card">
                        <img
                            src={product.image}
                            alt={product.title}
                            className="product-image"
                            onClick={() => navigate(`/detailpagina/${product.id}`)}
                            style={{ cursor: 'pointer' }}
                        />
                        <h3>{product.title}</h3>
                        <p><strong>€{product.price}</strong></p>
                        <p>Rating: {product.rating.rate} ⭐</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CategoryPage;












