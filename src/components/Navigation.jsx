import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ShoppingCart } from 'lucide-react'
import { useCart } from '../context/CartContext'

const Navigation = ({ onAuthClick }) => {
  const location = useLocation()
  const [user, setUser] = useState(null)
  const { toggleCart, getCartCount } = useCart()

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token')
    const userData = localStorage.getItem('user')
    if (token && userData) {
      setUser(JSON.parse(userData))
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
    window.location.reload()
  }

  return (
    <nav className="navigation">
      <div className="nav-container">
        <ul className="nav-links">
          <li>
            <Link 
              to="/" 
              className={location.pathname === '/' ? 'active' : ''}
            >
              Home
            </Link>
          </li>
          <li>
            <Link 
              to="/menu" 
              className={location.pathname === '/menu' ? 'active' : ''}
            >
              Menu
            </Link>
          </li>
          <li>
            <Link 
              to="/about" 
              className={location.pathname === '/about' ? 'active' : ''}
            >
              About
            </Link>
          </li>
          <li>
            <Link 
              to="/contact" 
              className={location.pathname === '/contact' ? 'active' : ''}
            >
              Contact
            </Link>
          </li>
          <li>
            <Link 
              to="/directions" 
              className={location.pathname === '/directions' ? 'active' : ''}
            >
              Directions
            </Link>
          </li>
          {user && (
            <li>
              <Link 
                to="/orders" 
                className={location.pathname === '/orders' ? 'active' : ''}
              >
                My Orders
              </Link>
            </li>
          )}
        </ul>
        
        <div className="auth-buttons">
          <button
            onClick={toggleCart}
            style={{
              position: 'relative',
              background: 'transparent',
              border: '2px solid #F5DEB3',
              color: '#F5DEB3',
              padding: '0.5rem 1rem',
              borderRadius: '25px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              marginRight: '1rem',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = '#F5DEB3'
              e.currentTarget.style.color = '#654321'
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = 'transparent'
              e.currentTarget.style.color = '#F5DEB3'
            }}
          >
            <ShoppingCart size={20} />
            Cart
            {getCartCount() > 0 && (
              <span style={{
                position: 'absolute',
                top: '-8px',
                right: '-8px',
                background: '#ef4444',
                color: 'white',
                borderRadius: '50%',
                width: '24px',
                height: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.75rem',
                fontWeight: 'bold'
              }}>
                {getCartCount()}
              </span>
            )}
          </button>
          
          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span style={{ color: '#F5DEB3' }}>
                Welcome, {user.username}!
              </span>
              <button 
                className="auth-btn login"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              <button 
                className="auth-btn login"
                onClick={() => onAuthClick('login')}
              >
                Login
              </button>
              <button 
                className="auth-btn signup"
                onClick={() => onAuthClick('signup')}
              >
                Sign Up
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navigation
