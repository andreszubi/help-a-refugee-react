function ListingBox({ listing }) {
  return (
    <div className="searchResults">
      <div className="card">
        <div className="firstinfo">
          <img className="userImg" src={listing.image} />
        </div>
        <div className="profileinfo">
          <h2 className="names">
            Location: {listing.city}, {listing.country}
          </h2>
          <h3 className="extraInf">Type of room: {listing.typeOfRoom}</h3>
          <h3 className="extraInf">
            Places available: {listing.placesAvailable}
          </h3>
        </div>
        <button>Reserve</button>
      </div>
    </div>
  );
}

export default ListingBox;
