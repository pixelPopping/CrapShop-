import { useContext, useEffect } from 'react';
import { FavoriteContext } from '../../components/context/FavoriteContext.jsx';
import { AuthContext } from '../../components/context/AuthContext.jsx';

const FavorietenPage = () => {
    const {
        items = [],
        setItems,
        removeFavorite,
        totalFavorites,
        resetFavorites,
    } = useContext(FavoriteContext);

    const { user } = useContext(AuthContext);

    const getStorageKey = (userId) => `Favorieten_${userId || 'guest'}`;

    const totaalPrijs = items
        .reduce((acc, item) => acc + item.price * item.quantity, 0)
        .toFixed(2);

    useEffect(() => {
        const key = getStorageKey(user?.id);
        console.log('🔑 Gebruikte storage key:', key);

        const stored = localStorage.getItem(key);
        if (stored) {
            try {
                const parsed = JSON.parse(stored);
                console.log('✅ Gevonden favorieten:', parsed);
                setItems(parsed);
            } catch (e) {
                console.error('❌ Fout bij parsen van favorieten:', e);
            }
        } else {
            console.log('ℹ️ Geen favorieten gevonden voor deze gebruiker.');
        }
    }, [user?.id]);

    useEffect(() => {
        const key = getStorageKey(user?.id);
        localStorage.setItem(key, JSON.stringify(items));
    }, [items, user?.id]);


    useEffect(() => {
        if (!user) {
            resetFavorites();
        }
    }, [user]);

    return (
        <div>
            <h2>
                ❤️ Favorieten –{' '}
                {items.length > 0
                    ? items.map((item) => item.title).join(', ')
                    : 'Leeg'}
            </h2>

            {items.length === 0 ? (
                <p>Je hebt nog geen favorieten toegevoegd.</p>
            ) : (
                <div>
                    {items.map((item) => (
                        <div key={item.id} style={{ marginBottom: '1rem' }}>
                            <img
                                src={item.image}
                                alt={item.title}
                                style={{
                                    width: '200px',
                                    height: '200px',
                                    objectFit: 'contain',
                                    marginBottom: '8px',
                                }}
                            />
                            <p>
                                {item.title} – €{item.price} × {item.quantity} = €
                                {(item.price * item.quantity).toFixed(2)}
                            </p>
                            <button onClick={() => removeFavorite(item.id)}>
                                Verwijder uit favorieten
                            </button>
                        </div>
                    ))}
                    <p>
                        <strong>Totaal: €{totaalPrijs}</strong>
                    </p>
                    <p>
                        <em>Totaal aantal favorieten: {totalFavorites}</em>
                    </p>
                </div>
            )}
        </div>
    );
};

export default FavorietenPage;




















