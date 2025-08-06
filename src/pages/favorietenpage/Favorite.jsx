import { useFavorites } from '../../components/context/FavoriteContext.jsx';

const FavorietenPage = () => {
    const { items, isReady } = useFavorites();

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
        <div>
            <h2>Je favorieten</h2>
            {countedItems.map((item) => (
                <div key={item.id} style={{ marginBottom: '1rem' }}>
                    <h3>
                        {item.label} {item.count > 1 ? `(x${item.count})` : ''}
                    </h3>
                    <img src={item.image} alt={item.label} style={{ width: 120 }} />
                    <p>{item.text}</p>
                    <p>Prijs: €{item.price}</p>
                </div>
            ))}
        </div>
    );
};

export default FavorietenPage;




