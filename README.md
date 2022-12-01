# Host a refugee
# by Andres Zubizarreta , Eric Coimbra and Tatiana Toledo

# Description
The host a refugee project was inspired by the ongoing crisis happening around the world. We felt compelled by this, and we felt that we needed to create a website where we can connect people to host refugees in their homes to help them flee from any life-threatening situation they may be experiencing in their country and to be able to move to a new home to build a better future for their family.

On the website anyone can sign up to be become a host and publish a room, apartment, or house that they can share with any refugee who may be in need. 

Refugees will be able to make a profile on this website for free and to search for a home that they can easily book by just a click of a button. This will send an email to the host with the refugee’s information and then they may contact them to help facilitate details to help them.


# Backlog
Nodemailer
Upload Images
Info User Update


# Routes 
Back-End:
Auth.host.routes
auth.user.routes
index.routes

Front-End:
App()
Home
Host Sign up
User Sign up
Host Login
User Login
Host Profile
User Profile
Edit Host Profile
Edit User Profile
Listings Search
Booking Confirmation
Edit Listing
Listing Details
Error Page

# Components
All Listings
Edit-Host-Profile
Footer
ListingBox
LoginForm
NavBar
NavBarHost
NavBarMain
NavBarUser
PrivateRouteHost
PrivateRouteUser
Publish Listing

# Contexts
Session Context Host
Session Context User



# Models
User: 

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
      lowercase: true,
      trim: true,
    },
    hashedPassword: {
      type: String,
      required: [true, "Password is required."],
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    image: {
      type: String,
    },
    aboutMe: {
      type: String,
    }
  }


Host :

const HostSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
      lowercase: true,
      trim: true,
    },
    hashedPassword: {
      type: String,
      required: [true, "Password is required."],
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    city: {
      type: String,
    },
    country: {
      type: String,
    },
    image: {
      type: String,
    },
    aboutMe: {
      type: String,
    },
    
  }
);


Housing: 

const HousingSchema = new Schema(
  {
    country: {
      type: String,
      required: [true, "Country is required"],
    },

    city: {
      type: String,
      required: [true, "City is required."],
    },
    typeOfRoom: {
      type: String,
      required: [true, "Type of room is required."],
    },
    placesAvailable: {
      type: Number,
      required: [true, "For how many people do you have space?"],
    },
    image: {
      type: String,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "Host",
    },
    usedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  }
);

# Trello
Trello :

 https://trello.com/b/pE82zedM/project-3



# Github

Front-End: 
https://github.com/andreszubi/help-a-refugee-react

Back-End: 

https://github.com/B4n3l1ng/help-a-refugee-backend



Deploy link:

Front-End :

 https://preeminent-baklava-807d8a.netlify.app/

Back-End :   

https://puce-shiny-magpie.cyclic.app/

# Slides
