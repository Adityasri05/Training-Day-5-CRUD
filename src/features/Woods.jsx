import { useEffect, useState } from "react";
import Card from "../components/molecule/card";

// Fallback high-quality wood images if the database item does not specify an image
const defaultImages = [
  "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600",
  "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=600",
  "https://images.unsplash.com/photo-1448375240586-882707db888b?w=600",
  "https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=600",
];

const WoodsPage = () => {
    const [woods, setWoods] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchWoods = async () => {
            try {
                const response = await fetch("/api/woods");
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                setWoods(data);
            } catch (err) {
                console.error("Failed to fetch woods:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchWoods();
    }, []);

    if (loading) {
        return (
            <div className="woods-page" style={{ textAlign: "center", padding: "100px 20px" }}>
                <div style={{ color: "var(--muted)", fontSize: "1.2rem", fontWeight: "500" }}>
                    Loading wood collection...
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="woods-page" style={{ textAlign: "center", padding: "100px 20px" }}>
                <div style={{ color: "#ef4444", fontSize: "1.1rem" }}>
                    Failed to load wood species: {error}
                </div>
            </div>
        );
    }

    return (
        <div className="woods-page">
            <div className="cardsClass">
                {woods && woods.length > 0 ? (
                    woods.map((item, index) => {
                        const mappedItem = {
                            id: item._id || item.id || index,
                            title: item.name,
                            category: item.type || "Hardwood",
                            description: item.description,
                            price: item.pricePerUnit ? `₹${item.pricePerUnit}` : "₹45.5",
                            image: item.image || defaultImages[index % defaultImages.length],
                        };
                        return <Card key={mappedItem.id} item={mappedItem} />;
                    })
                ) : (
                    <div style={{ textAlign: "center", width: "100%", padding: "80px 20px", color: "var(--muted)" }}>
                        No wood species available at the moment. Add some in the CMS!
                    </div>
                )}
            </div>
        </div>
    );
};

export default WoodsPage;