import { useEffect, useState } from "react";
import CardData from "../sampleData/cardData";
import Card from "../components/molecule/card";

const defaultImages = [
  "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600",
  "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=600",
  "https://images.unsplash.com/photo-1448375240586-882707db888b?w=600",
  "https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=600",
];

const Home = () => {
    // Select the first 3 cards as featured items for the Home page (fallback)
    const [featuredItems, setFeaturedItems] = useState(CardData.slice(0, 3));

    useEffect(() => {
        const fetchFeatured = async () => {
            try {
                const response = await fetch("/api/woods");
                if (response.ok) {
                    const data = await response.json();
                    if (Array.isArray(data) && data.length > 0) {
                        const formatted = data.slice(0, 3).map((item, index) => ({
                            id: item._id || item.id || index,
                            title: item.name,
                            category: item.type || "Hardwood",
                            description: item.description,
                            price: item.pricePerUnit ? `₹${item.pricePerUnit}` : "₹45.5",
                            image: item.image || defaultImages[index % defaultImages.length]
                        }));
                        setFeaturedItems(formatted);
                    }
                }
            } catch (err) {
                console.error("Failed to fetch featured woods, using fallback:", err);
            }
        };

        fetchFeatured();
    }, []);

    return (
        <>
            {/* Hero Showcase Section */}
            <div className="container hero-showcase">
                <div className="hero-layout">
                    <div className="hero-copy">
                        <span className="hero-badge">Welcome to Mywoods</span>
                        <h1>Building with Nature's Finest Creations</h1>
                        <p>
                            Discover premium, hand-selected timber sourced sustainably. 
                            From luxurious teak to rot-resistant Himalayan cedar, we provide 
                            unparalleled quality for architects, builders, and wood artisans.
                        </p>
                        <div className="hero-actions">
                            <a href="/woods" className="hero-btn primary">Explore Woods</a>
                            <a href="/about" className="hero-btn secondary">Our Heritage</a>
                        </div>
                        <ul className="hero-highlights">
                            <li>✓ 100% Sustainable Wood</li>
                            <li>✓ Certified Origin & Quality</li>
                            <li>✓ Expert Finishing & Kiln-Dried</li>
                        </ul>
                    </div>
                    <div className="hero-visual">
                        <img 
                            src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800" 
                            alt="Premium Wood Material" 
                        />
                        <div className="hero-preview-card">
                            <p>Featured Specimen</p>
                            <h3>Himalayan Deodar</h3>
                            <span>Rot-resistant softwood</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Home Description Info Block */}
            <div className="home-description">
                <div className="home-title">
                    <img 
                        src="https://images.unsplash.com/photo-1511884642898-4c92249e20b6?w=100" 
                        alt="Mywoods Brand Logo" 
                        className="home-logo" 
                    />
                    <div>
                        <h1>Crafted by Nature, Curated for Excellence</h1>
                        <p>Connecting nature's greatest resource with human ingenuity.</p>
                    </div>
                </div>
                <p>
                    For centuries, wood has been the cornerstone of human architecture, design, and warmth. 
                    At Mywoods, we take pride in bridging the gap between nature's finest resources and your creative visions. 
                    Every piece in our inventory is hand-inspected, moisture-tested, and ethically harvested, ensuring that 
                    your crafts, furniture, and building structures stand the test of time with rich texture and durability.
                </p>
            </div>

            {/* Featured Items Section */}
            <div className="container">
                <div className="section-heading">
                    <div>
                        <span className="section-label">Selected Species</span>
                        <h2>Featured Collection</h2>
                    </div>
                    <p>A handpicked selection of our most popular and versatile timber species, currently in stock.</p>
                </div>

                <div className="cards-grid">
                    {featuredItems.map((item) => (
                        <Card key={item.id} item={item} />
                    ))}
                </div>
            </div>
        </>
    );
};

export default Home;