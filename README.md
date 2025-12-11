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

### 🔔 **Push Notifications**
- **Order Updates**: 4-stage notification flow
- **Points Alerts**: Notification when loyalty points earned
- **Review Confirmation**: Thank you message after review submission
- **Browser Native**: Uses Web Notifications API
- **Click to Focus**: Clicking notification brings app to front

### 🎨 **UI/UX Excellence**
- **Responsive Design**: Mobile-first, works on all devices
- **Smooth Animations**: Fade-in, slide-in, hover effects
- **Loading States**: Clear feedback during async operations
- **Error Handling**: Graceful degradation and fallbacks
- **Toast Notifications**: Success/error messages
- **Featured Items**: Showcase popular drinks on home page

### 🔐 **Security & Authentication**
- **JWT Tokens**: Secure session management
- **Password Hashing**: bcrypt encryption
- **Protected Routes**: User-specific data access
- **Session Persistence**: Stay logged in across refreshes

---

## 🏗️ Tech Stack

### **Frontend**
| Technology | Purpose | Version |
|------------|---------|---------|
| React | UI Framework | 18.3.1 |
| React Router | Navigation | 6.28.0 |
| Context API | State Management | Built-in |
| Lucide React | Icons | 0.454.0 |
| PropTypes | Type Validation | 15.8.1 |
| Vite | Build Tool | 5.4.10 |

### **Backend**
| Technology | Purpose | Version |
|------------|---------|---------|
| Node.js | Runtime | 14+ |
| Express.js | Web Framework | 4.21.1 |
| SQLite3 | Database | 5.1.7 |
| JWT | Authentication | 9.0.2 |
| bcryptjs | Password Hashing | 2.4.3 |
| CORS | Cross-Origin | 2.8.5 |

### **Development**
- Concurrently - Run multiple servers
- ESLint - Code linting
- Git - Version control

---

## 📊 Project Statistics

- **Total Files**: 30+
- **Components**: 15+
- **Pages**: 7
- **API Endpoints**: 8
- **Menu Items**: 42
- **Database Tables**: 2
- **Lines of Code**: 5000+
- **Features**: 15+

---

## 🚀 Getting Started

### Prerequisites
```bash
Node.js >= 14.0.0
npm >= 6.0.0
```

### Quick Start

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/BarterCafe.git
cd BarterCafe
```

2. **Install dependencies**
```bash
npm install
```

3. **Start both servers**
```bash
npm run dev:full
```

4. **Open your browser**
```
Frontend: http://localhost:5173
Backend:  http://localhost:3001
```

### Alternative: Run Servers Separately

**Terminal 1 - Backend:**
```bash
npm run server
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

---

## 📁 Project Structure

```
BarterCafe/
├── 📂 src/                          # Frontend source code
│   ├── 📂 components/               # Reusable React components
│   │   ├── AuthModal.jsx           # Login/Signup modal
│   │   ├── CartDrawer.jsx          # Shopping cart drawer
│   │   ├── CustomizeDrinkModal.jsx # Drink customization
│   │   ├── Navigation.jsx          # Top navigation bar
│   │   ├── ReviewsModal.jsx        # Review submission form
│   │   ├── ReviewsList.jsx         # Display reviews
│   │   └── Toast.jsx               # Notification toasts
│   ├── 📂 context/                  # React Context providers
│   │   └── CartContext.jsx         # Global cart state
│   ├── 📂 pages/                    # Page components
│   │   ├── Home.jsx                # Landing page
│   │   ├── Menu.jsx                # Menu browsing
│   │   ├── About.jsx               # About us
│   │   ├── Contact.jsx             # Contact info
│   │   ├── Directions.jsx          # Location
│   │   ├── Checkout.jsx            # Order checkout
│   │   └── Orders.jsx              # Order history
│   ├── 📂 utils/                    # Utility functions
│   │   └── notifications.js        # Push notifications
│   ├── App.jsx                     # Root component
│   ├── App.css                     # Global styles
│   └── main.jsx                    # Entry point
├── 📂 server/                       # Backend source code
│   ├── server.js                   # Express server
│   └── database.sqlite             # SQLite database
├── 📂 public/                       # Static assets
├── 📄 CHANGELOG.md                 # Detailed change history
├── 📄 COMPONENT_HIERARCHY.md       # Component architecture
├── 📄 TESTING_GUIDE.md             # Testing procedures
├── 📄 JSON_SCHEMAS.md              # Data structure docs
├── 📄 API_DOCUMENTATION.md         # API reference
├── 📄 FEATURES.md                  # Feature documentation
├── 📄 package.json                 # Dependencies
└── 📄 README.md                    # This file
```

---

## 🎮 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start frontend dev server (Vite) |
| `npm run server` | Start backend server (Node.js) |
| `npm run dev:full` | Start both servers concurrently |
| `npm run build` | Build frontend for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

---

## 📖 Documentation

Comprehensive documentation is available in the following files:

- **[CHANGELOG.md](CHANGELOG.md)** - Detailed update history with verification steps
- **[COMPONENT_HIERARCHY.md](COMPONENT_HIERARCHY.md)** - Component architecture and data flow
- **[TESTING_GUIDE.md](TESTING_GUIDE.md)** - Complete testing procedures and Q&A prep
- **[JSON_SCHEMAS.md](JSON_SCHEMAS.md)** - All data structures and schemas
- **[API_DOCUMENTATION.md](API_DOCUMENTATION.md)** - Backend API reference
- **[FEATURES.md](FEATURES.md)** - Feature list and usage instructions
- **[IMPLEMENTATION_COMPLETE.md](IMPLEMENTATION_COMPLETE.md)** - Implementation summary

---

## 🔌 API Endpoints

### Authentication
- `POST /api/register` - Create new user account
- `POST /api/login` - Authenticate user
- `GET /api/profile` - Get user profile (protected)

### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders/user/:userId` - Get user's orders
- `GET /api/orders/:orderId` - Get single order
- `PATCH /api/orders/:orderId/status` - Update order status

### Loyalty
- `GET /api/loyalty/:userId` - Get loyalty points and total orders
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
