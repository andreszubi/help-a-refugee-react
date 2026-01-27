# Host a Refugee - Frontend

**Connecting hearts, building homes.**

A modern React application connecting refugees fleeing crisis situations with compassionate hosts who have room to share.

> Created by Andres Zubizarreta, Eric Coimbra, and Tatiana Toledo

---

## Overview

The Host a Refugee platform was inspired by the ongoing crises happening around the world. We created this application to connect people willing to host refugees in their homes—helping them flee life-threatening situations and build a better future for their families.

### How It Works

**For Hosts:**
- Sign up and create a profile with photo
- Publish available rooms, apartments, or houses with images
- Manage listings from a beautiful dashboard
- Receive booking requests from refugees

**For Refugees:**
- Create a free profile
- Search for available accommodations by location
- Book a home with a simple click
- Connect with hosts to arrange your stay

---

## Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 19.0.0 | UI Framework |
| Vite | 6.0.0 | Build Tool & Dev Server |
| React Router | 7.1.0 | Client-side Routing |
| Tailwind CSS | 4.0.0 | Utility-first Styling |
| Mantine UI | 7.17.0 | Component Library |
| Framer Motion | 12.0.0 | Animations |
| Axios | 1.7.9 | HTTP Client |
| Socket.io Client | 4.8.1 | Real-time Communication |

---

## Features

- **Dual Authentication System** — Separate login flows for hosts and refugees
- **Host Dashboard** — Manage profile and listings in one place
- **Listing Management** — Create, edit, and delete housing listings
- **Image Uploads** — Profile pictures and listing photos via Cloudinary
- **Smart Search** — Find accommodations by city or country
- **One-Click Booking** — Refugees can request stays instantly
- **Protected Routes** — Secure access to user-specific pages
- **Responsive Design** — Works seamlessly on desktop and mobile
- **Modern UI/UX** — Glassmorphism effects with smooth animations

---

## UI/UX Design

The interface features a modern, calming design with:

- **Glassmorphism Cards** — Frosted glass effect with backdrop blur and shimmer animations
- **Animated Gradients** — Peaceful teal, cyan, and green color transitions
- **Wave Shimmer Effects** — Subtle animated patterns on cards and navigation
- **Smooth Transitions** — Framer Motion animations for a polished feel
- **Modern Typography** — Plus Jakarta Sans and Inter font families
- **High Contrast Text** — Readable text with shadow effects for accessibility
- **Consistent Styling** — Unified card designs across all pages

### Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| Teal | `#0d9488` | Primary accent, buttons |
| Dark Teal | `#134e4a` | Text, headings |
| Cyan | `#06b6d4` | Gradients, highlights |
| Light Teal | `#f0fdfa` | Backgrounds |

---

## Pages & Routes

| Route | Description | Access |
|-------|-------------|--------|
| `/` | Home page with login form | Public |
| `/host-signup` | Host registration with profile photo | Public |
| `/user-signup` | Refugee registration | Public |
| `/host-login` | Host authentication | Public |
| `/host-profile` | Host dashboard with listings | Protected (Host) |
| `/user-profile` | User dashboard | Protected (User) |
| `/edit-host-profile` | Edit host information | Protected (Host) |
| `/listings-search` | Browse available accommodations | Protected (User) |
| `/listing-details` | View listing information | Protected |
| `/edit-listing/:id` | Modify a listing | Protected (Host) |
| `/booking-confirmation` | Booking success page | Protected |
| `/error-page` | 404 and error handling | Public |

---

## Components

| Component | Description |
|-----------|-------------|
| `NavBar` | Dynamic navigation based on auth state |
| `NavBarMain` | Logo and branding header |
| `NavBarHost` | Host-specific navigation with logout |
| `NavBarUser` | User-specific navigation with logout |
| `LoginForm` | Unified authentication form |
| `ListingBox` | Individual listing card with details |
| `AllListings` | Grid of all available listings |
| `Publish-Listing` | Create new listing form |
| `Edit-Host-Profile` | Host profile editor |
| `Footer` | Site footer with social links |
| `PrivateRouteHost` | Protected route wrapper for hosts |
| `PrivateRouteUser` | Protected route wrapper for users |

---

## State Management

### Context Providers

**SessionContextHost**
- Manages host authentication state
- Stores JWT token in localStorage (`hostToken`)
- Provides `isAuthenticated`, `isLoading`, `currentPayload`
- Handles token verification on app load

**SessionContextUser**
- Manages user authentication state
- Stores JWT token in localStorage (`userToken`)
- Provides `isAuthenticated`, `isLoading`, `currentPayload`
- Handles token verification on app load

---

## Host Profile Features

The host dashboard includes:

- **Profile Card** — Display host information with edit button
- **Listings Management** — View all published listings
- **Add New Listing Form** — Create listings with:
  - Country and city
  - Type of room
  - Number of places available
  - Image upload with dashed border indicator
- **Listing Cards** — Square cards with:
  - Large property image
  - Location label
  - Type of room label
  - Number of places label
  - Edit button

---

## Project Structure

```
host-a-refugee/
├── public/
│   ├── _redirects          # Netlify SPA routing
│   └── vite.svg
├── src/
│   ├── components/
│   │   ├── AllListings.jsx
│   │   ├── Edit-Host-Profile.jsx
│   │   ├── Footer.jsx
│   │   ├── ListingBox.jsx
│   │   ├── LoginForm.jsx
│   │   ├── NavBar.jsx
│   │   ├── NavBarHost.jsx
│   │   ├── NavBarMain.jsx
│   │   ├── NavBarUser.jsx
│   │   ├── PrivateRouteHost.jsx
│   │   ├── PrivateRouteUser.jsx
│   │   └── Publish-Listing.jsx
│   ├── contexts/
│   │   ├── SessionContextHost.jsx
│   │   └── SessionContextUser.jsx
│   ├── images/
│   │   └── [various assets]
│   ├── pages/
│   │   ├── Booking-Confirmation.jsx
│   │   ├── Edit-Listing.jsx
│   │   ├── ErrorPage.jsx
│   │   ├── Home.jsx
│   │   ├── Host-Login.jsx
│   │   ├── Host-Profile.jsx
│   │   ├── Host-Signup.jsx
│   │   ├── Listing-Details.jsx
│   │   ├── Listings-Search.jsx
│   │   ├── User-Profile.jsx
│   │   └── User-Signup.jsx
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .env
├── package.json
├── tailwind.config.cjs
├── postcss.config.cjs
└── vite.config.js
```

---

## Getting Started

### Prerequisites

- Node.js 18+
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
VITE_REACT_APP_API_URL=http://localhost:5005
```

For production, point to your deployed backend URL.

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server (port 5173) |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |

---

## Recent Updates

### January 2026

- **Modernized Dependencies** — Updated to React 19, Vite 6, Tailwind 4
- **Host Profile Redesign** — New glassmorphism card layout
- **Listing Cards** — Square card design with large images
- **Form Improvements** — Pill-shaped inputs matching signup forms
- **Authentication Fix** — Separate localStorage keys for host/user tokens
- **Loading States** — Proper handling of async authentication
- **Text Readability** — Improved contrast and shadow effects
- **Responsive Layout** — Better mobile experience

---

## Links

| Resource | URL |
|----------|-----|
| **Live Site** | [host-a-refugee.netlify.app](https://host-a-refugee.netlify.app) |
| **Frontend Repo** | [github.com/andreszubi/help-a-refugee-react](https://github.com/andreszubi/help-a-refugee-react) |
| **Backend Repo** | [github.com/B4n3l1ng/help-a-refugee-backend](https://github.com/B4n3l1ng/help-a-refugee-backend) |
| **Backend API** | [help-a-refugee-backend.onrender.com](https://help-a-refugee-backend.onrender.com) |
| **Presentation** | [Google Slides](https://docs.google.com/presentation/d/1U3pGyXWFXnbkNH9pVKRyl7c9EF-wsl7mPNCYsIjzvUU/edit?usp=sharing) |

---

## Future Improvements

- [ ] Email notifications via Nodemailer
- [ ] Real-time messaging between hosts and refugees
- [ ] User profile editing page
- [ ] Multi-language support (i18n)
- [ ] Advanced search filters (price, amenities)
- [ ] Map integration for listings
- [ ] Review and rating system
- [ ] Admin dashboard




---

*Open your home, change a life.*
