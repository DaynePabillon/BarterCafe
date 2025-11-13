# BarterCafe ☕

A modern, full-stack coffee shop website built with React, Vite, Express, and SQLite.

## Features

✅ **Full Authentication System**
- User registration with validation
- Secure login with JWT tokens
- Password hashing with bcrypt
- Persistent sessions with localStorage

✅ **E-Commerce Features**
- **Shopping Cart**: Add items, edit quantities, remove items
- **Cart Drawer**: Slide-in cart with real-time totals
- **Drink Customization**: Size, temperature, milk type, sweetness, extra shots
- **Dynamic Pricing**: Prices update based on customizations
- **Checkout System**: Multiple payment methods (Card, Wallet, Cash)
- **Order History**: View all past orders with details
- **Order Status Tracking**: Real-time status (Preparing → Brewing → Ready → Completed)

✅ **Beautiful UI**
- Coffee-themed design matching Figma specifications
- Lucide React icons throughout
- Responsive layout for all devices
- Improved text readability with high contrast
- Smooth animations and transitions
- Toast notifications
- Loading states and empty states

✅ **Pages**
- **Home**: Welcome page with personalized greeting when logged in
- **Menu**: Coffee products with customization options
- **About**: Company story and mission
- **Contact**: Contact form and business information
- **Directions**: Location and travel instructions
- **Checkout**: Complete checkout flow with payment
- **Orders**: Order history with status tracking

✅ **Backend API**
- Express.js server
- SQLite database for user management
- RESTful API endpoints
- CORS enabled for frontend communication

## Tech Stack

### Frontend
- **React 18** - UI library
- **Vite 4** - Build tool and dev server
- **React Router 6** - Client-side routing
- **Lucide React** - Modern icon library
- **CSS3** - Custom styling

### Backend
- **Express.js** - Web server framework
- **SQLite3** - Lightweight database
- **bcryptjs** - Password hashing
- **jsonwebtoken** - JWT authentication
- **CORS** - Cross-origin resource sharing

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

### Running the Application

#### Option 1: Run both servers together (Recommended)
```bash
npm run dev:full
```

#### Option 2: Run servers separately

Terminal 1 - Backend Server:
```bash
npm run server
```

Terminal 2 - Frontend Dev Server:
```bash
npm run dev
```

### Access the Application

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3001

## API Endpoints

### Authentication
- `POST /api/register` - Register new user
- `POST /api/login` - Login user
- `GET /api/profile` - Get user profile (protected)
- `GET /api/health` - Health check

## Project Structure

```
BarterCafe/
├── server/
│   ├── server.js          # Express server
│   └── database.sqlite    # SQLite database (auto-created)
├── src/
│   ├── components/
│   │   ├── Navigation.jsx # Navigation bar with auth
│   │   └── AuthModal.jsx  # Login/Signup modal
│   ├── pages/
│   │   ├── Home.jsx       # Home page
│   │   ├── Menu.jsx       # Menu page
│   │   ├── About.jsx      # About page
│   │   ├── Contact.jsx    # Contact page
│   │   └── Directions.jsx # Directions page
│   ├── App.jsx            # Main app component
│   ├── App.css            # Main styles
│   ├── index.css          # Global styles
│   └── main.jsx           # Entry point
├── package.json
└── vite.config.js

```

## Features in Detail

### Authentication Flow
1. User registers with username, email, and password
2. Password is hashed and stored in SQLite database
3. Upon login, JWT token is generated and stored in localStorage
4. Token is used for authenticated requests
5. User info displayed in navigation when logged in
6. Login/Signup options hidden when authenticated

### Design Improvements
- High contrast text colors (#2C1810) for better readability
- White/semi-transparent backgrounds for content sections
- Lucide icons replacing emoji for professional look
- Text shadows for enhanced visibility
- Bold headings and weighted fonts

## Database Schema

### Users Table
```sql
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)
```

## Security Notes

⚠️ **For Production:**
- Change JWT_SECRET in `server/server.js`
- Use environment variables for sensitive data
- Enable HTTPS
- Add rate limiting
- Implement refresh tokens
- Add input sanitization

## Contributing

Feel free to fork this project and submit pull requests!

## License

MIT License - feel free to use this project for learning or commercial purposes.

---

Built with ☕ and ❤️ for coffee lovers everywhere!
