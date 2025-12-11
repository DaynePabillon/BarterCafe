import express from 'express';
import sqlite3 from 'sqlite3';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3001;
const JWT_SECRET = 'your-secret-key-change-in-production';

// Middleware
app.use(cors());
app.use(express.json());

// Initialize SQLite database
const db = new sqlite3.Database(path.join(__dirname, 'database.sqlite'), (err) => {
  if (err) {
    console.error('Error opening database:', err);
  } else {
    console.log('Connected to SQLite database');
    
    // Create users table if it doesn't exist
    db.run(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        loyalty_points INTEGER DEFAULT 0,
        total_orders INTEGER DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `, (err) => {
      if (err) {
        console.error('Error creating users table:', err);
      } else {
        console.log('Users table ready');
        
        // Migrate existing users table to add loyalty_points and total_orders columns
        db.all("PRAGMA table_info(users)", [], (err, columns) => {
          if (err) {
            console.error('Error checking table structure:', err);
            return;
          }
          
          const hasLoyaltyPoints = columns.some(col => col.name === 'loyalty_points');
          const hasTotalOrders = columns.some(col => col.name === 'total_orders');
          
          if (!hasLoyaltyPoints) {
            db.run('ALTER TABLE users ADD COLUMN loyalty_points INTEGER DEFAULT 0', (err) => {
              if (err) {
                console.error('Error adding loyalty_points column:', err);
              } else {
                console.log('✅ Added loyalty_points column to users table');
              }
            });
          }
          
          if (!hasTotalOrders) {
            db.run('ALTER TABLE users ADD COLUMN total_orders INTEGER DEFAULT 0', (err) => {
              if (err) {
                console.error('Error adding total_orders column:', err);
              } else {
                console.log('✅ Added total_orders column to users table');
              }
            });
          }
        });
      }
    });

    // Create orders table
    db.run(`
      CREATE TABLE IF NOT EXISTS orders (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        customer_name TEXT NOT NULL,
        customer_email TEXT NOT NULL,
        customer_phone TEXT NOT NULL,
        items TEXT NOT NULL,
        total REAL NOT NULL,
        payment_method TEXT NOT NULL,
        status TEXT DEFAULT 'Preparing',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id)
      )
    `, (err) => {
      if (err) {
        console.error('Error creating orders table:', err);
      } else {
        console.log('Orders table ready');
      }
    });

    // Create custom recipes table
    db.run(`
      CREATE TABLE IF NOT EXISTS custom_recipes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT,
        base_drink TEXT NOT NULL,
        ingredients TEXT NOT NULL,
        instructions TEXT,
        price REAL NOT NULL,
        category TEXT DEFAULT 'Coffee',
        created_by TEXT,
        is_active INTEGER DEFAULT 1,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `, (err) => {
      if (err) {
        console.error('Error creating custom_recipes table:', err);
      } else {
        console.log('Custom recipes table ready');
      }
    });
  }
});

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};

// Routes

// Register endpoint
app.post('/api/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Validate input
    if (!username || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters' });
    }

    // Check if user already exists
    db.get(
      'SELECT * FROM users WHERE email = ? OR username = ?',
      [email, username],
      async (err, existingUser) => {
        if (err) {
          console.error('Database error:', err);
          return res.status(500).json({ error: 'Database error' });
        }

        if (existingUser) {
          return res.status(400).json({ 
            error: existingUser.email === email ? 'Email already registered' : 'Username already taken' 
          });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert new user
        db.run(
          'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
          [username, email, hashedPassword],
          function(err) {
            if (err) {
              console.error('Error inserting user:', err);
              return res.status(500).json({ error: 'Failed to create user' });
            }

            // Generate JWT token
            const token = jwt.sign(
              { id: this.lastID, username, email },
              JWT_SECRET,
              { expiresIn: '24h' }
            );

            res.status(201).json({
              message: 'User registered successfully',
              token,
              user: { id: this.lastID, username, email }
            });
          }
        );
      }
    );
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Login endpoint
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Find user by email
    db.get(
      'SELECT * FROM users WHERE email = ?',
      [email],
      async (err, user) => {
        if (err) {
          console.error('Database error:', err);
          return res.status(500).json({ error: 'Database error' });
        }

        if (!user) {
          return res.status(401).json({ error: 'Invalid email or password' });
        }

        // Verify password
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
          return res.status(401).json({ error: 'Invalid email or password' });
        }

        // Generate JWT token
        const token = jwt.sign(
          { id: user.id, username: user.username, email: user.email },
          JWT_SECRET,
          { expiresIn: '24h' }
        );

        res.json({
          message: 'Login successful',
          token,
          user: { id: user.id, username: user.username, email: user.email }
        });
      }
    );
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Protected route example
app.get('/api/profile', authenticateToken, (req, res) => {
  res.json({
    message: 'Profile data',
    user: req.user
  });
});

// Get user loyalty points
app.get('/api/loyalty/:userId', (req, res) => {
  const { userId } = req.params;

  db.get(
    'SELECT loyalty_points, total_orders FROM users WHERE id = ?',
    [userId],
    (err, user) => {
      if (err) {
        console.error('Error fetching loyalty points:', err);
        return res.status(500).json({ error: 'Failed to fetch loyalty points' });
      }

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.json({
        loyaltyPoints: user.loyalty_points,
        totalOrders: user.total_orders
      });
    }
  );
});

// ============ ORDER MANAGEMENT ENDPOINTS ============

// Create new order
app.post('/api/orders', async (req, res) => {
  try {
    const { customer, items, total, paymentMethod, userId } = req.body;

    // Validate input
    if (!customer || !items || !total || !paymentMethod) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Insert order into database
    db.run(
      `INSERT INTO orders (user_id, customer_name, customer_email, customer_phone, items, total, payment_method, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        userId || null,
        customer.name,
        customer.email,
        customer.phone,
        JSON.stringify(items),
        total,
        paymentMethod,
        'Preparing'
      ],
      function(err) {
        if (err) {
          console.error('Error creating order:', err);
          return res.status(500).json({ error: 'Failed to create order' });
        }

        // Order created - barista will manually process it
        const orderId = this.lastID;
        // simulateOrderProgress(orderId); // Disabled - using manual barista processing

        // Award loyalty points if user is logged in
        if (userId) {
          const pointsEarned = Math.floor(total); // 1 point per dollar spent
          db.run(
            'UPDATE users SET loyalty_points = loyalty_points + ?, total_orders = total_orders + 1 WHERE id = ?',
            [pointsEarned, userId],
            (err) => {
              if (err) {
                console.error('Error updating loyalty points:', err);
              } else {
                console.log(`User #${userId} earned ${pointsEarned} loyalty points!`);
              }
            }
          );
        }

        res.status(201).json({
          message: 'Order created successfully',
          orderId: orderId,
          status: 'Preparing',
          pointsEarned: userId ? Math.floor(total) : 0
        });
      }
    );
  } catch (error) {
    console.error('Order creation error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all orders for a user
app.get('/api/orders/user/:userId', (req, res) => {
  const { userId } = req.params;

  db.all(
    'SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC',
    [userId],
    (err, orders) => {
      if (err) {
        console.error('Error fetching orders:', err);
        return res.status(500).json({ error: 'Failed to fetch orders' });
      }

      // Parse items JSON for each order
      const parsedOrders = orders.map(order => ({
        ...order,
        items: JSON.parse(order.items)
      }));

      res.json({ orders: parsedOrders });
    }
  );
});

// Get all orders for barista dashboard (sorted by status priority) - MUST BE BEFORE :orderId route
app.get('/api/orders/all', (req, res) => {
  db.all(
    `SELECT * FROM orders 
     ORDER BY 
       CASE status
         WHEN 'Preparing' THEN 1
         WHEN 'Brewing' THEN 2
         WHEN 'Ready' THEN 3
         WHEN 'Completed' THEN 4
       END,
       created_at DESC`,
    [],
    (err, orders) => {
      if (err) {
        console.error('Error fetching orders:', err);
        return res.status(500).json({ error: 'Failed to fetch orders' });
      }

      res.json({ orders });
    }
  );
});

// Get single order by ID
app.get('/api/orders/:orderId', (req, res) => {
  const { orderId } = req.params;

  db.get(
    'SELECT * FROM orders WHERE id = ?',
    [orderId],
    (err, order) => {
      if (err) {
        console.error('Error fetching order:', err);
        return res.status(500).json({ error: 'Failed to fetch order' });
      }

      if (!order) {
        return res.status(404).json({ error: 'Order not found' });
      }

      res.json({
        ...order,
        items: JSON.parse(order.items)
      });
    }
  );
});

// Update order status
app.patch('/api/orders/:orderId/status', (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;

  const validStatuses = ['Preparing', 'Brewing', 'Ready', 'Completed'];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ error: 'Invalid status' });
  }

  db.run(
    'UPDATE orders SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
    [status, orderId],
    function(err) {
      if (err) {
        console.error('Error updating order status:', err);
        return res.status(500).json({ error: 'Failed to update order status' });
      }

      if (this.changes === 0) {
        return res.status(404).json({ error: 'Order not found' });
      }

      res.json({ message: 'Order status updated', status });
    }
  );
});

// Simulate order status progression
function simulateOrderProgress(orderId) {
  const statuses = ['Preparing', 'Brewing', 'Ready', 'Completed'];
  let currentIndex = 0;

  const interval = setInterval(() => {
    currentIndex++;
    if (currentIndex >= statuses.length) {
      clearInterval(interval);
      return;
    }

    const newStatus = statuses[currentIndex];
    db.run(
      'UPDATE orders SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
      [newStatus, orderId],
      (err) => {
        if (err) {
          console.error('Error updating order status:', err);
        } else {
          console.log(`Order #${orderId} status updated to: ${newStatus}`);
        }
      }
    );
  }, 30000); // Update every 30 seconds (Preparing -> Brewing -> Ready -> Completed)
}

// ============ CUSTOM RECIPES ENDPOINTS ============

// Get all custom recipes
app.get('/api/recipes', (req, res) => {
  db.all(
    'SELECT * FROM custom_recipes WHERE is_active = 1 ORDER BY created_at DESC',
    [],
    (err, recipes) => {
      if (err) {
        console.error('Error fetching recipes:', err);
        return res.status(500).json({ error: 'Failed to fetch recipes' });
      }

      res.json({ recipes });
    }
  );
});

// Create new custom recipe
app.post('/api/recipes', (req, res) => {
  const { name, description, baseDrink, ingredients, instructions, price, category, createdBy } = req.body;

  if (!name || !baseDrink || !ingredients || !price) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  db.run(
    `INSERT INTO custom_recipes (name, description, base_drink, ingredients, instructions, price, category, created_by)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [name, description, baseDrink, JSON.stringify(ingredients), instructions, price, category, createdBy],
    function(err) {
      if (err) {
        console.error('Error creating recipe:', err);
        return res.status(500).json({ error: 'Failed to create recipe' });
      }

      res.status(201).json({
        message: 'Recipe created successfully',
        recipeId: this.lastID
      });
    }
  );
});

// Delete custom recipe (soft delete)
app.delete('/api/recipes/:recipeId', (req, res) => {
  const { recipeId } = req.params;

  db.run(
    'UPDATE custom_recipes SET is_active = 0 WHERE id = ?',
    [recipeId],
    (err) => {
      if (err) {
        console.error('Error deleting recipe:', err);
        return res.status(500).json({ error: 'Failed to delete recipe' });
      }

      res.json({ message: 'Recipe deleted successfully' });
    }
  );
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'BarterCafe API is running' });
});

// Start server
app.listen(PORT, () => {
  console.log(`BarterCafe API server running on http://localhost:${PORT}`);
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\nShutting down server...');
  db.close((err) => {
    if (err) {
      console.error('Error closing database:', err);
    } else {
      console.log('Database connection closed');
    }
    process.exit(0);
  });
});
