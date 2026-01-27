# Host a Refugee

**Connecting hearts, building homes.**

A humanitarian platform connecting refugees fleeing crisis situations with compassionate hosts who have room to share.

> Created by Andres Zubizarreta, Eric Coimbra, and Tatiana Toledo

---

## About

The Host a Refugee project was inspired by the ongoing crises happening around the world. We felt compelled to create a platform where we can connect people to host refugees in their homes—helping them flee life-threatening situations and build a better future for their families.

### How It Works

**For Hosts:**
- Sign up and create a profile
- Publish available rooms, apartments, or houses
- Receive booking requests from refugees via email
- Connect directly with refugees to facilitate their stay

**For Refugees:**
- Create a free profile
- Search for available accommodations by location
- Book a home with a simple click
- Connect with hosts to arrange your stay

---

## Features

- **Dual User System** — Separate authentication and profiles for hosts and refugees
- **Listing Management** — Hosts can create, edit, and remove housing listings
- **Smart Search** — Search accommodations by city or country
- **One-Click Booking** — Refugees can request stays instantly
- **Image Uploads** — Profile pictures and listing photos via Cloudinary
- **Protected Routes** — Secure access to user-specific pages
- **Responsive Design** — Works seamlessly on desktop and mobile

---

## Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| React 18 | UI Framework |
| Vite | Build Tool & Dev Server |
| React Router v6 | Client-side Routing |
| Tailwind CSS | Utility-first Styling |
| Mantine UI | Component Library |
| Framer Motion | Animations |
| Axios | HTTP Client |

### Backend
| Technology | Purpose |
|------------|---------|
| Node.js | Runtime |
| Express | Web Framework |
| MongoDB | Database |
| Cloudinary | Image Storage |
| JWT | Authentication |

---

## UI/UX Design

The interface features a modern, calming design with:

- **Glassmorphism** — Frosted glass card effects with backdrop blur
- **Animated Gradients** — Peaceful teal, cyan, and green color transitions
- **Wave Shimmer Effects** — Subtle animated patterns on navigation and footer
- **Smooth Animations** — Framer Motion transitions for a polished feel
- **Modern Typography** — Plus Jakarta Sans and Inter font families
- **Accessibility** — High contrast text with readable shadows

---

## Pages & Routes

| Route | Description |
|-------|-------------|
| `/` | Home page with login form |
| `/host-signup` | Host registration |
| `/user-signup` | Refugee registration |
| `/host-login` | Host authentication |
| `/host-profile` | Host dashboard with listings (protected) |
| `/user-profile` | User dashboard (protected) |
| `/edit-host-profile` | Edit host information |
| `/listings-search` | Browse available accommodations (protected) |
| `/listing-details` | View listing information |
| `/edit-listing/:id` | Modify a listing |
| `/booking-confirmation` | Booking success page |

---

## Components

| Component | Description |
|-----------|-------------|
| `NavBar` | Dynamic navigation based on auth state |
| `NavBarMain` | Logo and branding |
| `NavBarHost` | Host-specific navigation |
| `NavBarUser` | User-specific navigation |
| `LoginForm` | Authentication form |
| `ListingBox` | Individual listing card |
| `AllListings` | Grid of all listings |
| `Publish-Listing` | Create new listing form |
| `Edit-Host-Profile` | Host profile editor |
| `Footer` | Site footer with social links |
| `PrivateRouteHost` | Protected route wrapper for hosts |
| `PrivateRouteUser` | Protected route wrapper for users |

---

## Data Models

### User (Refugee)
```javascript
{
  email: String,        // Required, unique
  hashedPassword: String,
  firstName: String,
  lastName: String,
  image: String,
  aboutMe: String
}
```

### Host
```javascript
{
  email: String,        // Required, unique
  hashedPassword: String,
  firstName: String,
  lastName: String,
  city: String,
  country: String,
  image: String,
  aboutMe: String
}
```

### Housing
```javascript
{
  country: String,      // Required
  city: String,         // Required
  typeOfRoom: String,   // Required
  placesAvailable: Number,
  image: String,
  owner: ObjectId,      // Reference to Host
  usedBy: ObjectId      // Reference to User
}
```

---

## Getting Started

### Prerequisites
- Node.js 16+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/andreszubi/help-a-refugee-react.git

# Navigate to project directory
cd help-a-refugee-react

# Install dependencies
npm install

# Start development server
npm run dev
```

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_REACT_APP_API_URL=your_backend_url
```

---

## Links

| Resource | URL |
|----------|-----|
| **Live Site** | [host-a-refugee.netlify.app](https://host-a-refugee.netlify.app) |
| **Frontend Repo** | [github.com/andreszubi/help-a-refugee-react](https://github.com/andreszubi/help-a-refugee-react) |
| **Backend Repo** | [github.com/B4n3l1ng/help-a-refugee-backend](https://github.com/B4n3l1ng/help-a-refugee-backend) |
| **Backend API** | [puce-shiny-magpie.cyclic.app](https://puce-shiny-magpie.cyclic.app/) |
| **Presentation** | [Google Slides](https://docs.google.com/presentation/d/1U3pGyXWFXnbkNH9pVKRyl7c9EF-wsl7mPNCYsIjzvUU/edit?usp=sharing) |

---

## Future Improvements

- [ ] Email notifications via Nodemailer
- [ ] Enhanced image upload experience
- [ ] User profile editing
- [ ] Messaging system between hosts and refugees
- [ ] Multi-language support
- [ ] Advanced search filters

---

*Open your home, change a life.*
