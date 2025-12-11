# BarterCafe - Testing & Verification Guide

## 📋 Complete Testing Checklist

This document provides step-by-step verification procedures for all features to ensure quality and demonstrate understanding during Q&A.

---

## 🎯 Pre-Testing Setup

### 1. Start Both Servers
```bash
# Terminal 1 - Backend
npm run server

# Terminal 2 - Frontend
npm run dev
```

### 2. Verify Server Status
- ✅ Backend: http://localhost:3001
- ✅ Frontend: http://localhost:5173
- ✅ Check console for "Connected to SQLite database"
- ✅ Check console for "Users table ready"
- ✅ Check console for "Orders table ready"

### 3. Clear Test Data (Optional)
```bash
# Delete database to start fresh
rm server/database.sqlite

# Clear browser data
- Open DevTools (F12)
- Application → Clear Storage → Clear site data
```

---

## 🔐 Feature 1: User Authentication

### Test Case 1.1: User Registration
**Steps:**
1. Open http://localhost:5173
2. Click "Sign Up" button
3. Enter:
   - Username: `testuser`
   - Email: `test@example.com`
   - Password: `password123`
4. Click "Sign Up"

**Expected Results:**
- ✅ Modal closes
- ✅ Navigation shows "Welcome, testuser!"
- ✅ "My Orders" link appears in navigation
- ✅ Loyalty points badge shows "🏆 0 pts"
- ✅ Console shows no errors

**Verification:**
```javascript
// Check localStorage
localStorage.getItem('user') // Should contain user data
localStorage.getItem('token') // Should contain JWT token
```

### Test Case 1.2: User Login
**Steps:**
1. Click "Logout"
2. Click "Login"
3. Enter credentials from Test 1.1
4. Click "Login"

**Expected Results:**
- ✅ Successfully logs in
- ✅ User data persists
- ✅ Session restored

### Test Case 1.3: Session Persistence
**Steps:**
1. Stay logged in
2. Refresh page (F5)

**Expected Results:**
- ✅ User remains logged in
- ✅ Navigation still shows username
- ✅ Loyalty points still visible

---

## 🛒 Feature 2: Shopping Cart

### Test Case 2.1: Add Item to Cart
**Steps:**
1. Go to Menu page
2. Click "Order Now" on "Cappuccino"
3. Customize:
   - Size: Large
   - Temperature: Hot
   - Milk: Oat Milk
   - Sweetness: Extra Sweet
   - Extra Shot: Yes
4. Set quantity to 2
5. Click "Add to Cart"

**Expected Results:**
- ✅ Success toast appears: "Cappuccino added to cart!"
- ✅ Cart badge shows "2"
- ✅ Modal closes

**Verification:**
```javascript
// Check cart in localStorage
JSON.parse(localStorage.getItem('cart'))
// Should show 2 Cappuccinos with customizations
```

### Test Case 2.2: View Cart
**Steps:**
1. Click cart icon in navigation

**Expected Results:**
- ✅ Drawer slides in from right
- ✅ Shows 2x Cappuccino
- ✅ Shows customizations (Large, Hot, Oat Milk, etc.)
- ✅ Shows price per item
- ✅ Shows total: $11.00 (2 × $5.50)

### Test Case 2.3: Update Quantity
**Steps:**
1. In cart drawer, click "+" button

**Expected Results:**
- ✅ Quantity increases to 3
- ✅ Total updates to $16.50
- ✅ Cart badge updates to "3"

### Test Case 2.4: Remove Item
**Steps:**
1. Click trash icon on item

**Expected Results:**
- ✅ Item removed from cart
- ✅ Cart badge updates to "0"
- ✅ Cart shows "Your cart is empty"

### Test Case 2.5: Cart Persistence
**Steps:**
1. Add 3 different items to cart
2. Refresh page (F5)

**Expected Results:**
- ✅ Cart badge still shows "3"
- ✅ All items still in cart
- ✅ Customizations preserved

---

## 💳 Feature 3: Checkout & Orders

### Test Case 3.1: Checkout Process
**Steps:**
1. Add items totaling $20.50 to cart
2. Click "Checkout" in cart drawer
3. Fill form:
   - Name: John Doe
   - Email: john@example.com
   - Phone: 555-1234
4. Select payment method: "Credit Card"
5. Click "Place Order"

**Expected Results:**
- ✅ Button shows "Processing..."
- ✅ Success message appears
- ✅ Push notification: "☕ Order Received!"
- ✅ Alert: "🎉 You earned 20 loyalty points!"
- ✅ Push notification: "🏆 Points Earned! You earned 20 loyalty points!"
- ✅ Redirects to Orders page after 2 seconds
- ✅ Cart is cleared

**Verification:**
```bash
# Check server logs
# Should see:
# - Order #X status updated to: Preparing
# - User #Y earned 20 loyalty points!
```

### Test Case 3.2: Order Tracking
**Steps:**
1. On Orders page, observe order

**Expected Results:**
- ✅ Order appears with status "Preparing"
- ✅ Shows order number, items, total
- ✅ Shows customer info

### Test Case 3.3: Real-Time Status Updates
**Steps:**
1. Wait and observe (don't refresh)
2. After 30 seconds
3. After 60 seconds
4. After 90 seconds

**Expected Results:**
- ✅ After 30s: Status → "Brewing", Push notification
- ✅ After 60s: Status → "Ready", Push notification (requires interaction)
- ✅ After 90s: Status → "Completed", Push notification
- ✅ Page auto-refreshes every 5 seconds

### Test Case 3.4: Manual Refresh
**Steps:**
1. Click "Refresh" button

**Expected Results:**
- ✅ Fetches latest order data
- ✅ Updates immediately

---

## 🔍 Feature 4: Search & Filter

### Test Case 4.1: Search Functionality
**Steps:**
1. Go to Menu page
2. Type "latte" in search bar

**Expected Results:**
- ✅ Shows: Latte, Iced Latte, Piccolo Latte, Chai Latte, etc.
- ✅ Results counter: "Showing X of 42 drinks"
- ✅ Updates instantly as you type

### Test Case 4.2: Category Filter
**Steps:**
1. Clear search
2. Select "Coffee" from category dropdown

**Expected Results:**
- ✅ Shows only coffee drinks (40 items)
- ✅ Hides Chai Latte and Hot Chocolate
- ✅ Results counter updates

### Test Case 4.3: Temperature Filter
**Steps:**
1. Select "Cold" from temperature dropdown

**Expected Results:**
- ✅ Shows only cold drinks (20 items)
- ✅ Shows drinks with 🧊 emoji
- ✅ Hides hot drinks

### Test Case 4.4: Sort Functionality
**Steps:**
1. Clear all filters
2. Select "Price (Low to High)"

**Expected Results:**
- ✅ Espresso ($3.50) appears first
- ✅ Most expensive items appear last

**Steps:**
3. Select "Highest Rated"

**Expected Results:**
- ✅ Dead Eye & Nitro Cold Brew (4.9★) appear first

### Test Case 4.5: Combined Filters
**Steps:**
1. Search: "cold brew"
2. Category: "Coffee"
3. Temperature: "Cold"
4. Sort: "Highest Rated"

**Expected Results:**
- ✅ Shows: Nitro Cold Brew, Cold Brew, Sweet Cream Cold Brew, Honey Almond Cold Brew
- ✅ Sorted by rating
- ✅ Results counter accurate

### Test Case 4.6: Empty State
**Steps:**
1. Search: "xyz123"

**Expected Results:**
- ✅ Shows "No drinks found matching your filters"
- ✅ Shows coffee icon
- ✅ Shows "Clear Filters" button
2. Click "Clear Filters"
- ✅ Resets all filters
- ✅ Shows all 42 drinks

---

## ⭐ Feature 5: Reviews & Ratings

### Test Case 5.1: Submit Review
**Steps:**
1. Go to Menu page
2. Click "Review" on "Cappuccino"
3. Click 5th star (5-star rating)
4. Enter name: "Jane Smith"
5. Enter review: "Best cappuccino I've ever had! The foam is perfect and the espresso is rich."
6. Click photo upload area
7. Select an image file
8. Click "Submit Review"

**Expected Results:**
- ✅ Stars turn gold on hover
- ✅ Rating text shows "Excellent!"
- ✅ Photo preview appears
- ✅ Submit button enabled
- ✅ Modal closes
- ✅ Success toast: "Review submitted successfully!"
- ✅ Push notification: "⭐ Thank You! Your review has been submitted"
- ✅ "View 1 review" link appears on Cappuccino card

**Verification:**
```javascript
// Check localStorage
JSON.parse(localStorage.getItem('reviews'))
// Should contain the review with all data
```

### Test Case 5.2: View Reviews
**Steps:**
1. Click "View 1 review" on Cappuccino

**Expected Results:**
- ✅ Modal opens showing reviews
- ✅ Shows reviewer name "Jane Smith"
- ✅ Shows 5 gold stars
- ✅ Shows review text
- ✅ Shows uploaded photo
- ✅ Shows date
- ✅ Shows "Helpful (0)" button

### Test Case 5.3: Helpful Vote
**Steps:**
1. Click "Helpful" button

**Expected Results:**
- ✅ Count increments to "Helpful (1)"
- ✅ Button hover effect works

### Test Case 5.4: Multiple Reviews
**Steps:**
1. Submit 2 more reviews for Cappuccino
2. View reviews

**Expected Results:**
- ✅ Link shows "View 3 reviews"
- ✅ All 3 reviews appear in modal
- ✅ Sorted by date (newest first)

### Test Case 5.5: Review Persistence
**Steps:**
1. Refresh page
2. Check Cappuccino

**Expected Results:**
- ✅ "View 3 reviews" link still visible
- ✅ All reviews still present

---

## 🏆 Feature 6: Loyalty Points

### Test Case 6.1: Points Display
**Steps:**
1. Login as user
2. Check navigation

**Expected Results:**
- ✅ Badge shows "🏆 0 pts" (for new user)
- ✅ Award icon visible
- ✅ Badge has gold border

### Test Case 6.2: Earn Points
**Steps:**
1. Add items totaling $25.75 to cart
2. Complete checkout

**Expected Results:**
- ✅ Alert: "🎉 You earned 25 loyalty points!"
- ✅ Push notification about points
- ✅ Badge updates to "🏆 25 pts"

### Test Case 6.3: Accumulate Points
**Steps:**
1. Place another order for $15.50

**Expected Results:**
- ✅ Earn 15 more points
- ✅ Badge shows "🏆 40 pts" (25 + 15)

### Test Case 6.4: Points Persistence
**Steps:**
1. Logout
2. Login again

**Expected Results:**
- ✅ Badge still shows "🏆 40 pts"
- ✅ Points fetched from database

**Verification:**
```bash
# Check database
sqlite3 server/database.sqlite
SELECT loyalty_points, total_orders FROM users WHERE username='testuser';
# Should show: 40 | 2
```

---

## 🔔 Feature 7: Push Notifications

### Test Case 7.1: Permission Request
**Steps:**
1. Open app in new browser/incognito
2. Wait 2 seconds

**Expected Results:**
- ✅ Browser shows notification permission prompt
- ✅ Click "Allow"
- ✅ Permission granted

### Test Case 7.2: Order Notifications
**Steps:**
1. Place an order
2. Observe notifications over 90 seconds

**Expected Results:**
- ✅ Immediately: "☕ Order Received! Order #X is being prepared..."
- ✅ After 30s: "🔥 Brewing Your Coffee! Order #X is now brewing..."
- ✅ After 60s: "✅ Order Ready! Order #X is ready for pickup!" (stays until clicked)
- ✅ After 90s: "🎉 Order Completed! Thank you for your order!"

### Test Case 7.3: Review Notification
**Steps:**
1. Submit a review

**Expected Results:**
- ✅ Notification: "⭐ Thank You! Your review for [Drink Name] has been submitted!"

### Test Case 7.4: Points Notification
**Steps:**
1. Complete an order

**Expected Results:**
- ✅ Notification: "🏆 Points Earned! You earned X loyalty points! Keep ordering to unlock rewards!"

### Test Case 7.5: Notification Click
**Steps:**
1. Minimize browser
2. Wait for notification
3. Click notification

**Expected Results:**
- ✅ Browser window comes to focus
- ✅ Notification closes

---

## ✨ Feature 8: Featured Items

### Test Case 8.1: Display
**Steps:**
1. Go to Home page
2. Scroll to "Featured Drinks" section

**Expected Results:**
- ✅ Shows 3 cards: Cappuccino, Cold Brew, Mocha
- ✅ Each shows: emoji, name, rating, price
- ✅ Badges visible: "Best Seller", "Popular", "Seasonal"
- ✅ Sparkles icon in section title

### Test Case 8.2: Hover Animation
**Steps:**
1. Hover over each card

**Expected Results:**
- ✅ Card lifts up (translateY animation)
- ✅ Shadow appears
- ✅ Smooth transition

### Test Case 8.3: Navigation
**Steps:**
1. Click "Order Now" on any card

**Expected Results:**
- ✅ Navigates to /menu
- ✅ Shows full menu

**Steps:**
2. Go back to Home
3. Click "Browse Full Menu" button

**Expected Results:**
- ✅ Navigates to /menu

---

## 🎨 UI/UX Testing

### Test Case 9.1: Responsive Design
**Steps:**
1. Resize browser to mobile (375px)
2. Resize to tablet (768px)
3. Resize to desktop (1920px)

**Expected Results:**
- ✅ Mobile: Single column layout, hamburger menu
- ✅ Tablet: 2-column grid, adjusted spacing
- ✅ Desktop: 3-column grid, full navigation
- ✅ No horizontal scrolling
- ✅ All elements readable

### Test Case 9.2: Animations
**Steps:**
1. Navigate between pages
2. Open/close modals
3. Add items to cart
4. Hover over buttons

**Expected Results:**
- ✅ Smooth page transitions
- ✅ Modal fade-in/out
- ✅ Cart drawer slide-in/out
- ✅ Button hover effects
- ✅ No janky animations

### Test Case 9.3: Loading States
**Steps:**
1. Place order (observe button)
2. Load Orders page (observe spinner)

**Expected Results:**
- ✅ "Processing..." text on button
- ✅ Button disabled during processing
- ✅ Spinner visible while loading
- ✅ Clear feedback to user

### Test Case 9.4: Error Handling
**Steps:**
1. Stop backend server
2. Try to place order

**Expected Results:**
- ✅ Error message: "Network error. Please make sure the server is running."
- ✅ Fallback to localStorage
- ✅ No app crash

---

## 🔄 Integration Testing

### Test Case 10.1: Full User Journey
**Steps:**
1. Sign up new account
2. Browse menu
3. Search for "cold brew"
4. Add 3 items to cart
5. Customize each item
6. Review cart
7. Checkout
8. View orders
9. Submit review
10. Check loyalty points

**Expected Results:**
- ✅ All features work together seamlessly
- ✅ Data flows correctly
- ✅ No console errors
- ✅ Notifications appear at right times
- ✅ Points calculated correctly

### Test Case 10.2: Offline Functionality
**Steps:**
1. Add items to cart
2. Disconnect internet
3. Try to checkout

**Expected Results:**
- ✅ Error message displayed
- ✅ Cart data preserved in localStorage
- ✅ Can still browse menu
- ✅ Reconnect and complete order successfully

---

## 📊 Performance Testing

### Test Case 11.1: Menu Filtering Performance
**Steps:**
1. Open DevTools → Performance
2. Start recording
3. Type in search box rapidly
4. Change filters multiple times
5. Stop recording

**Expected Results:**
- ✅ No lag or stuttering
- ✅ Instant filter updates
- ✅ useMemo prevents unnecessary re-renders

### Test Case 11.2: Large Cart
**Steps:**
1. Add 20 different items to cart
2. Open cart drawer
3. Update quantities

**Expected Results:**
- ✅ Drawer opens smoothly
- ✅ Scrolling is smooth
- ✅ Updates are instant

---

## 🐛 Edge Cases

### Test Case 12.1: Empty Cart Checkout
**Steps:**
1. Clear cart
2. Navigate to /checkout directly

**Expected Results:**
- ✅ Shows "Cart is empty" message
- ✅ Checkout button disabled

### Test Case 12.2: Invalid Form Data
**Steps:**
1. Try to checkout with empty fields
2. Try invalid email format

**Expected Results:**
- ✅ HTML5 validation prevents submission
- ✅ Error messages displayed

### Test Case 12.3: Duplicate Reviews
**Steps:**
1. Submit review for drink
2. Submit another review for same drink

**Expected Results:**
- ✅ Both reviews accepted
- ✅ Both appear in list

---

## ✅ Final Verification Checklist

Before presenting or submitting, verify all:

- [ ] All 42 menu items display correctly
- [ ] Search returns accurate results
- [ ] All filters work independently and combined
- [ ] Cart persists across page refreshes
- [ ] Orders are created in database
- [ ] Order status updates automatically
- [ ] Reviews save to localStorage
- [ ] Loyalty points save to database
- [ ] Loyalty points display in navigation
- [ ] All push notifications work
- [ ] Responsive design works on all screen sizes
- [ ] No console errors
- [ ] No PropTypes warnings
- [ ] All animations smooth
- [ ] All buttons have hover effects
- [ ] All forms validate properly
- [ ] Backend server runs without errors
- [ ] Database migrations applied successfully

---

## 📸 Screenshots for Documentation

Take screenshots of:
1. Home page with featured items
2. Menu page with all filters
3. Search results
4. Customization modal
5. Cart drawer with items
6. Checkout page
7. Orders page with status
8. Review submission modal
9. Reviews list
10. Loyalty points badge
11. Push notifications
12. Mobile responsive view

---

## 🎤 Q&A Preparation

### Common Questions & Answers:

**Q: How does the loyalty points system work?**
A: Users earn 1 point per dollar spent. Points are calculated on the backend when an order is placed, stored in the SQLite database, and displayed in the navigation. The calculation uses `Math.floor(total)` to round down to whole points.

**Q: Why did you use Context API instead of Redux?**
A: For this app's scope, Context API is sufficient. We only have one global state (cart), and Context provides a simpler, lighter solution without additional dependencies. It's perfect for small to medium apps.

**Q: How do you ensure data persistence?**
A: We use a hybrid approach: critical data (users, orders, loyalty points) is stored in SQLite database on the backend. Cart and reviews use localStorage for quick access and offline functionality, with the cart also syncing to the backend on checkout.

**Q: Explain the order status progression.**
A: When an order is created, it starts as "Preparing". The backend has a `simulateOrderProgress()` function that updates the status every 30 seconds: Preparing → Brewing → Ready → Completed. The frontend auto-refreshes every 5 seconds to show updates.

**Q: How did you implement real-time updates without WebSockets?**
A: We use polling - the Orders page fetches data from the API every 5 seconds using `setInterval` in a `useEffect` hook. While not true real-time, it's simpler to implement and sufficient for this use case.

**Q: What's your component hierarchy strategy?**
A: We follow a clear separation: Page components (Home, Menu, etc.) handle routing and data fetching. Feature components (modals, forms) handle specific functionality. UI components (Toast, buttons) are reusable. Context provides global state. This keeps components focused and maintainable.

---

**Testing Completed By:** _________________  
**Date:** _________________  
**All Tests Passed:** ☐ Yes ☐ No  
**Notes:** _________________
