function ListingBox({ listing }) {
  return (
    <div>
      <div
        title={listing.country}
        style={{ width: 230, height: 300, margin: 10 }}
      >
        <img src={listing.image} height={60} alt="food" />
        <p>
          Location: {listing.city}, {listing.country}
        </p>
        <p>Type of room: {listing.typeOfRoom}</p>
        <p>Places available: {listing.placesAvailable}</p>
        <button>Reserve</button>
      </div>
    </div>
  );
}

export default ListingBox;
