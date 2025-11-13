# BarterCafe API Documentation

Base URL: `http://localhost:3001`

## Authentication Endpoints

### Register User
```http
POST /api/register
```

**Request Body:**
```json
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "message": "User registered successfully",
  "token": "jwt_token_here",
  "user": {
    "id": 1,
    "username": "johndoe",
    "email": "john@example.com"
  }
}
```

---

### Login
```http
POST /api/login
```

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "message": "Login successful",
  "token": "jwt_token_here",
  "user": {
    "id": 1,
    "username": "johndoe",
    "email": "john@example.com"
  }
}
```

---

### Get Profile (Protected)
```http
GET /api/profile
Authorization: Bearer {token}
```

**Response:**
```json
{
  "message": "Profile data",
  "user": {
    "id": 1,
    "username": "johndoe",
    "email": "john@example.com"
  }
}
```

---

## Order Management Endpoints

### Create Order
```http
POST /api/orders
```

**Request Body:**
```json
{
  "customer": {
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "(555) 123-4567"
  },
  "items": [
    {
      "id": 1,
      "name": "Cappuccino",
      "quantity": 2,
      "finalPrice": "$5.50",
      "customizations": {
        "size": "Large",
        "temperature": "Hot",
        "milk": "Oat Milk",
        "sweetness": "Regular",
        "extraShot": true
      }
    }
  ],
  "total": 11.00,
  "paymentMethod": "card",
  "userId": 1
}
```

**Response:**
```json
{
  "message": "Order created successfully",
  "orderId": 42,
  "status": "Preparing"
}
```

**What Happens:**
1. Order is saved to SQLite database
2. Order status starts as "Preparing"
3. Automatic status progression begins:
   - After 30 seconds → "Brewing"
   - After 60 seconds → "Ready"
   - After 90 seconds → "Completed"

---

### Get User Orders
```http
GET /api/orders/user/:userId
```

**Example:**
```http
GET /api/orders/user/1
```

**Response:**
```json
{
  "orders": [
    {
      "id": 42,
      "user_id": 1,
      "customer_name": "John Doe",
      "customer_email": "john@example.com",
      "customer_phone": "(555) 123-4567",
      "items": [...],
      "total": 11.00,
      "payment_method": "card",
      "status": "Brewing",
      "created_at": "2025-11-13 08:30:00",
      "updated_at": "2025-11-13 08:30:30"
    }
  ]
}
```

---

### Get All Orders (Admin)
```http
GET /api/orders
```

**Response:**
```json
{
  "orders": [...]
}
```

---

### Get Single Order
```http
GET /api/orders/:orderId
```

**Example:**
```http
GET /api/orders/42
```

**Response:**
```json
{
  "id": 42,
  "user_id": 1,
  "customer_name": "John Doe",
  "customer_email": "john@example.com",
  "customer_phone": "(555) 123-4567",
  "items": [...],
  "total": 11.00,
  "payment_method": "card",
  "status": "Ready",
  "created_at": "2025-11-13 08:30:00",
  "updated_at": "2025-11-13 08:31:00"
}
```

---

### Update Order Status (Manual)
```http
PATCH /api/orders/:orderId/status
```

**Request Body:**
```json
{
  "status": "Ready"
}
```

**Valid Statuses:**
- `Preparing`
- `Brewing`
- `Ready`
- `Completed`

**Response:**
```json
{
  "message": "Order status updated",
  "status": "Ready"
}
```

---

### Health Check
```http
GET /api/health
```

**Response:**
```json
{
  "status": "OK",
  "message": "BarterCafe API is running"
}
```

---

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

### Orders Table
```sql
CREATE TABLE orders (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  items TEXT NOT NULL,              -- JSON string
  total REAL NOT NULL,
  payment_method TEXT NOT NULL,
  status TEXT DEFAULT 'Preparing',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
)
```

---

## Order Status Flow

### Automatic Progression
When an order is created, it automatically progresses through statuses:

```
Preparing (0s) → Brewing (30s) → Ready (60s) → Completed (90s)
```

**Timeline:**
- **0:00** - Order placed → Status: `Preparing`
- **0:30** - Coffee brewing starts → Status: `Brewing`
- **1:00** - Coffee ready for pickup → Status: `Ready`
- **1:30** - Order completed → Status: `Completed`

### Manual Override
You can manually update the status using the PATCH endpoint if needed (e.g., for delays or rush orders).

---

## Error Responses

### 400 Bad Request
```json
{
  "error": "Missing required fields"
}
```

### 401 Unauthorized
```json
{
  "error": "Invalid email or password"
}
```

### 404 Not Found
```json
{
  "error": "Order not found"
}
```

### 500 Internal Server Error
```json
{
  "error": "Internal server error"
}
```

---

## Testing the API

### Using cURL

**Create an order:**
```bash
curl -X POST http://localhost:3001/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "customer": {
      "name": "Test User",
      "email": "test@example.com",
      "phone": "555-1234"
    },
    "items": [{"id": 1, "name": "Cappuccino", "quantity": 1, "finalPrice": "$4.50"}],
    "total": 4.50,
    "paymentMethod": "card"
  }'
```

**Get all orders:**
```bash
curl http://localhost:3001/api/orders
```

**Get user orders:**
```bash
curl http://localhost:3001/api/orders/user/1
```

**Update order status:**
```bash
curl -X PATCH http://localhost:3001/api/orders/1/status \
  -H "Content-Type: application/json" \
  -d '{"status": "Ready"}'
```

---

## Frontend Integration

The frontend (`Checkout.jsx`) now sends orders to the backend:

```javascript
const response = await fetch('http://localhost:3001/api/orders', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    customer: { name, email, phone },
    items: cartItems,
    total: getCartTotal(),
    paymentMethod: paymentMethod,
    userId: user?.id || null
  })
})
```

---

## Future Enhancements

### Planned API Features:
1. **Real Payment Integration**: Stripe/PayPal webhooks
2. **WebSocket Support**: Real-time order status updates
3. **Email Notifications**: Order confirmation emails
4. **SMS Notifications**: Text when order is ready
5. **Admin Dashboard**: Manage all orders
6. **Analytics**: Sales reports and statistics
7. **Inventory Management**: Track ingredient stock
8. **Loyalty Points**: Award points per order
9. **Promo Codes**: Discount code validation
10. **Order Ratings**: Customer feedback after completion

---

**Database Location:** `server/database.sqlite`

**Server Port:** `3001`

**CORS:** Enabled for `http://localhost:5173` (Vite dev server)
