# BarterCafe - Component Hierarchy & Architecture

## 📊 Component Tree Structure

```
App (Root)
├── Router
│   ├── Navigation
│   │   ├── Logo
│   │   ├── NavLinks
│   │   ├── CartButton
│   │   └── UserProfile / AuthButtons
│   │
│   ├── Routes
│   │   ├── Home
│   │   │   ├── HeroSection
│   │   │   ├── FeaturedItems
│   │   │   └── CTAButton
│   │   │
│   │   ├── Menu
│   │   │   ├── SearchBar
│   │   │   ├── FilterControls
│   │   │   │   ├── CategoryFilter
│   │   │   │   ├── TemperatureFilter
│   │   │   │   └── SortDropdown
│   │   │   ├── MenuGrid
│   │   │   │   └── MenuItem (x42)
│   │   │   │       ├── ItemImage
│   │   │   │       ├── ItemDetails
│   │   │   │       ├── RatingDisplay
│   │   │   │       ├── BadgeContainer
│   │   │   │       └── ActionButtons
│   │   │   ├── CustomizeDrinkModal
│   │   │   │   ├── SizeSelector
│   │   │   │   ├── TemperatureSelector
│   │   │   │   ├── MilkSelector
│   │   │   │   ├── SweetnessSelector
│   │   │   │   └── AddToCartButton
│   │   │   ├── ReviewsModal
│   │   │   │   ├── StarRating
│   │   │   │   ├── ReviewForm
│   │   │   │   └── PhotoUpload
│   │   │   └── ReviewsList
│   │   │       └── ReviewCard (multiple)
│   │   │           ├── UserAvatar
│   │   │           ├── ReviewHeader
│   │   │           ├── StarDisplay
│   │   │           ├── ReviewText
│   │   │           ├── ReviewPhoto
│   │   │           └── HelpfulButton
│   │   │
│   │   ├── About
│   │   │   ├── StorySection
│   │   │   ├── MissionSection
│   │   │   └── TeamSection
│   │   │
│   │   ├── Contact
│   │   │   ├── ContactForm
│   │   │   └── ContactInfo
│   │   │
│   │   ├── Directions
│   │   │   ├── MapEmbed
│   │   │   └── DirectionsInfo
│   │   │
│   │   ├── Checkout
│   │   │   ├── OrderSummary
│   │   │   ├── CustomerForm
│   │   │   ├── PaymentMethodSelector
│   │   │   └── PlaceOrderButton
│   │   │
│   │   └── Orders
│   │       ├── OrdersHeader
│   │       ├── RefreshButton
│   │       └── OrderCard (multiple)
│   │           ├── OrderHeader
│   │           ├── OrderItems
│   │           ├── OrderStatus
│   │           └── OrderTotal
│   │
│   ├── CartDrawer
│   │   ├── CartHeader
│   │   ├── CartItems
│   │   │   └── CartItem (multiple)
│   │   │       ├── ItemDetails
│   │   │       ├── QuantityControls
│   │   │       └── RemoveButton
│   │   ├── CartTotal
│   │   └── CheckoutButton
│   │
│   ├── AuthModal
│   │   ├── LoginForm
│   │   │   ├── EmailInput
│   │   │   ├── PasswordInput
│   │   │   └── LoginButton
│   │   └── SignupForm
│   │       ├── UsernameInput
│   │       ├── EmailInput
│   │       ├── PasswordInput
│   │       └── SignupButton
│   │
│   └── Toast
│       ├── ToastIcon
│       └── ToastMessage
```

---

## 🎯 Component Categories

### **1. Layout Components**
- `App.jsx` - Root application wrapper
- `Navigation.jsx` - Top navigation bar
- `CartDrawer.jsx` - Slide-in shopping cart

### **2. Page Components**
- `Home.jsx` - Landing page
- `Menu.jsx` - Menu browsing and ordering
- `About.jsx` - About us page
- `Contact.jsx` - Contact information
- `Directions.jsx` - Location and directions
- `Checkout.jsx` - Order checkout process
- `Orders.jsx` - Order history and tracking

### **3. Feature Components**
- `CustomizeDrinkModal.jsx` - Drink customization interface
- `ReviewsModal.jsx` - Review submission form
- `ReviewsList.jsx` - Display customer reviews
- `AuthModal.jsx` - Login/Signup modal

### **4. UI Components**
- `Toast.jsx` - Notification toast messages

### **5. Context Providers**
- `CartContext.jsx` - Global cart state management

---

## 🔄 Data Flow Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         App.jsx                              │
│  - Manages auth state                                        │
│  - Handles notification permissions                          │
│  - Provides routing                                          │
└─────────────────────────────────────────────────────────────┘
                              │
                              ├─► CartProvider (Context)
                              │   - Cart items state
                              │   - Add/Remove/Update items
                              │   - Calculate totals
                              │   - Persist to localStorage
                              │
                              ├─► Navigation
                              │   - Fetch loyalty points from API
                              │   - Display user info
                              │   - Cart count badge
                              │
                              ├─► Pages
                              │   │
                              │   ├─► Menu
                              │   │   - Fetch reviews from localStorage
                              │   │   - Filter & sort menu items
                              │   │   - Submit reviews → localStorage
                              │   │   - Add to cart → CartContext
                              │   │
                              │   ├─► Checkout
                              │   │   - Get cart from CartContext
                              │   │   - Submit order → Backend API
                              │   │   - Trigger notifications
                              │   │   - Clear cart on success
                              │   │
                              │   └─► Orders
                              │       - Fetch orders from Backend API
                              │       - Auto-refresh every 5s
                              │       - Fallback to localStorage
                              │
                              └─► Backend API (server.js)
                                  - SQLite database
                                  - User authentication (JWT)
                                  - Order management
                                  - Loyalty points calculation
```

---

## 🗄️ State Management Strategy

### **Global State (Context API)**
- **CartContext**: Shopping cart items, quantities, totals
  - Used by: Menu, CartDrawer, Checkout, Navigation
  - Persisted to: localStorage

### **Component State (useState)**
- **Navigation**: user, loyaltyPoints
- **Menu**: selectedDrink, reviewDrink, searchQuery, filters, reviews
- **Checkout**: formData, paymentMethod, processing, orderPlaced
- **Orders**: orders, loading, error
- **AuthModal**: formData, error, loading

### **Server State (API Calls)**
- **Users**: Stored in SQLite, fetched on login
- **Orders**: Stored in SQLite, fetched on demand
- **Loyalty Points**: Calculated and stored in SQLite

### **Local State (localStorage)**
- **Reviews**: Customer reviews (client-side only)
- **Cart**: Backup/cache of cart items
- **Orders**: Backup/cache of order history
- **User**: Cached user data
- **Token**: JWT authentication token

---

## 🔌 Props Flow

### **Navigation Component**
```javascript
Navigation
  Props: { onAuthClick: function }
  Internal State: { user, loyaltyPoints }
  Data Sources: localStorage (user), API (loyalty points)
```

### **Menu Component**
```javascript
Menu
  Props: None
  Internal State: {
    selectedDrink, reviewDrink, viewReviewsDrink,
    searchQuery, selectedCategory, selectedTemp,
    sortBy, priceRange, reviews, toast
  }
  Context: useCart() → { addToCart }
  Data Sources: localStorage (reviews)
```

### **CustomizeDrinkModal Component**
```javascript
CustomizeDrinkModal
  Props: {
    drink: object,
    onClose: function,
    onAddToCart: function
  }
  Internal State: { size, temperature, milk, sweetness }
```

### **ReviewsModal Component**
```javascript
ReviewsModal
  Props: {
    drink: object,
    onClose: function,
    onSubmitReview: function
  }
  Internal State: { rating, hoverRating, reviewText, reviewerName, photo }
```

### **CartDrawer Component**
```javascript
CartDrawer
  Props: None
  Context: useCart() → {
    cartItems, isCartOpen, toggleCart,
    updateQuantity, removeFromCart, getCartTotal
  }
```

---

## 🎨 Component Design Patterns

### **1. Container/Presentational Pattern**
- **Container**: Menu.jsx (logic + data)
- **Presentational**: MenuItem (display only)

### **2. Compound Components**
- **CustomizeDrinkModal**: Multiple related components working together
  - SizeSelector, TemperatureSelector, MilkSelector, etc.

### **3. Render Props Pattern**
- **Toast**: Conditional rendering based on state

### **4. Context Pattern**
- **CartContext**: Global state accessible to all components

### **5. Custom Hooks**
- **useCart**: Encapsulates cart logic and state

---

## 📦 Component Reusability

### **Highly Reusable Components**
1. **Toast** - Used for all notifications
2. **Modal Base** - Shared structure for all modals
3. **Button Styles** - Consistent across app
4. **Form Inputs** - Reused in multiple forms

### **Single-Purpose Components**
1. **Navigation** - App-specific layout
2. **CartDrawer** - Cart-specific functionality
3. **Orders** - Order history specific

---

## 🔧 Component Responsibilities

| Component | Responsibility | Side Effects |
|-----------|---------------|--------------|
| App | Routing, auth state, notifications | Request notification permission |
| Navigation | Display nav, user info, loyalty points | Fetch loyalty points from API |
| Menu | Display menu, handle filters, reviews | Save reviews to localStorage |
| Checkout | Process orders | POST to API, send notifications |
| Orders | Display order history | Fetch from API every 5s |
| CartContext | Manage cart state | Persist to localStorage |
| AuthModal | Handle login/signup | POST to API, save token |

---

## 🚀 Performance Optimizations

1. **useMemo** - Menu filtering and sorting (prevents re-computation)
2. **Lazy Loading** - Could be added for route-based code splitting
3. **Debouncing** - Search input (could be added)
4. **Pagination** - Menu items (could be added for 100+ items)
5. **Virtual Scrolling** - Reviews list (could be added)

---

## 📝 Component Best Practices Followed

✅ Single Responsibility Principle  
✅ DRY (Don't Repeat Yourself)  
✅ Consistent naming conventions  
✅ Clear prop interfaces  
✅ Minimal prop drilling (using Context)  
✅ Separation of concerns  
✅ Reusable components  
✅ Custom hooks for logic abstraction  
✅ Proper state management hierarchy  
✅ Clean component composition  

---

This hierarchy ensures maintainability, scalability, and follows React best practices for component design.
