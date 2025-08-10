import { FavoriteContext } from '../../components/context/FavoriteContext.jsx';
import { useContext } from 'react';

const FavorietenPage = () => {
    const { items, isReady, removeFavorite } = useContext(FavoriteContext);

    if (!isReady) {
        return <p>Favorieten worden geladen...</p>;
    }

    if (items.length === 0) {
        return (
            <div>
                <h2>Je favorieten</h2>
                <p>Je hebt nog geen favorieten toegevoegd.</p>
            </div>
        );
    }

    const getItemCounts = () => {
        const map = new Map();
        items.forEach((item) => {
            const found = map.get(item.id);
            if (found) {
                found.count += 1;
            } else {
                map.set(item.id, { ...item, count: 1 });
            }
        });
        return Array.from(map.values());
    };

    const countedItems = getItemCounts();

    return (
        <div style={{ padding: '2rem' }}>
            <h2>Je favorieten</h2>
            {countedItems.map((item) => (
                <div key={item.id} style={{ marginBottom: '1.5rem', borderBottom: '1px solid #ccc', paddingBottom: '1rem' }}>
                    <h3>
                        {item.label || item.title} {item.count > 1 ? `(x${item.count})` : ''}
                    </h3>
                    {item.image && (
                        <img src={item.image} alt={item.label || item.title} style={{ width: 120, marginBottom: '0.5rem' }} />
                    )}
                    <p>{item.text}</p>
                    <p>Prijs: €{item.price}</p>
                    <button onClick={() => removeFavorite(item.id)}>Verwijder uit favorieten</button>
                </div>
            ))}
        </div>
    );
};

export default FavorietenPage;




















































