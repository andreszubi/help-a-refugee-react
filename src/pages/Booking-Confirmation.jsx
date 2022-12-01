//Create a page that displays that the booking has been confirmed and the user can see the details of the booking.
//
import Footer from "../components/Footer";
import NavBarMain from "../components/NavBarMain";

function BookingConfirmation() {
  return (<>
    <div className="container">
      <NavBarMain />
      {/* <div className="background-img"> */}
      <h1 className="largeTextSignUp3">Reservation confirmed!</h1>
      <h2 className="mediumTextSignUp2">
        Your host has received your reservation and will contact you by email to
        arrange all the details.
      </h2>
      <h2 className="mediumTextSignUp3">
        Keep safe and we hope that everything works out.
      </h2>
      <div className="background-img2"></div>
      
    </div>
    <Footer />
    </>
  );
}

export default BookingConfirmation;
