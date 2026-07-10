function Card({ item }) {
  return (
    <div className="card">
      <div className="card-image-wrap">
        <img src={item.image} alt={item.title} className="card-image" />
        <span className="card-badge">{item.category}</span>
      </div>

      <div className="card-content">
        <div className="card-heading">
          <h2>{item.title}</h2>
          <span className="card-rating">★★★★★</span>
        </div>

        <p>{item.description}</p>

        <div className="card-footer">
          <div>
            <h3>{item.price}</h3>
            <span className="card-meta">per cubic foot</span>
          </div>
          <button>Book Now</button>
        </div>
      </div>
    </div>
  );
}

export default Card;