import React, { useState, useEffect } from 'react'
import { Coffee, LogIn, UserPlus, Star, TrendingUp, Sparkles } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const Home = ({ onAuthClick }) => {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (userData) {
      setUser(JSON.parse(userData))
    }
  }, [])

  const featuredItems = [
    {
      id: 1,
      name: 'Cappuccino',
      price: '$4.50',
      rating: 4.8,
      emoji: '☕',
      tag: 'Best Seller'
    },
    {
      id: 8,
      name: 'Cold Brew',
      price: '$4.00',
      rating: 4.8,
      emoji: '🧊',
      tag: 'Popular'
    },
    {
      id: 6,
      name: 'Mocha',
      price: '$5.25',
      rating: 4.7,
      emoji: '🍫',
      tag: 'Seasonal'
    }
  ]

  return (
    <div className="page">
      <div className="page-container">
        <div className="home-hero">
          <h1>Welcome to BarterCafe{user ? `, ${user.username}` : ''}</h1>
          <p>Discover a new blend of coffee style</p>
          <p>Your daily coffee fix is just a click away</p>
          
          {!user && (
            <div className="auth-section">
            <div className="auth-card">
              <div style={{ marginBottom: '1rem' }}>
                <UserPlus size={48} color="#F5DEB3" />
              </div>
              <h3>Sign Up</h3>
              <p>New Here?</p>
              <button 
                className="auth-btn signup"
                onClick={() => onAuthClick('signup')}
              >
                Sign Up
              </button>
            </div>
            
            <div className="auth-card">
              <div style={{ marginBottom: '1rem' }}>
                <LogIn size={48} color="#F5DEB3" />
              </div>
              <h3>Login</h3>
              <p>Already have an Account?</p>
              <button 
                className="auth-btn login"
                onClick={() => onAuthClick('login')}
              >
                Login
              </button>
            </div>
          </div>
          )}
        </div>
        
        {/* Featured Items Section */}
        <div style={{ marginTop: '4rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <h2 style={{ 
              color: '#2C1810', 
              marginBottom: '0.5rem', 
              fontWeight: 'bold', 
              textShadow: '1px 1px 2px rgba(255, 255, 255, 0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem'
            }}>
              <Sparkles size={28} color="#654321" />
              Featured Drinks
            </h2>
            <p style={{ color: '#2C1810', fontSize: '1rem', fontWeight: '500' }}>
              Try our most popular and seasonal favorites
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '2rem',
            marginBottom: '3rem'
          }}>
            {featuredItems.map((item) => (
              <div
                key={item.id}
                style={{
                  background: 'rgba(101, 67, 33, 0.8)',
                  borderRadius: '15px',
                  padding: '2rem',
                  border: '2px solid #8B4513',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  position: 'relative'
                }}
                onClick={() => navigate('/menu')}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)'
                  e.currentTarget.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.4)'
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                {/* Tag Badge */}
                <span style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  background: item.tag === 'Seasonal' ? '#10b981' : '#ef4444',
                  color: 'white',
                  padding: '0.25rem 0.75rem',
                  borderRadius: '15px',
                  fontSize: '0.75rem',
                  fontWeight: 'bold'
                }}>
                  {item.tag}
                </span>

                <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>
                  {item.emoji}
                </div>
                <h3 style={{ color: '#F5DEB3', marginBottom: '0.5rem', fontSize: '1.5rem' }}>
                  {item.name}
                </h3>
                
                {/* Rating */}
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  gap: '0.25rem',
                  marginBottom: '1rem'
                }}>
                  <Star size={18} fill="#f59e0b" color="#f59e0b" />
                  <span style={{ color: '#F5DEB3', fontWeight: 'bold' }}>{item.rating}</span>
                </div>

                <div style={{ 
                  color: '#F5DEB3', 
                  fontSize: '1.5rem', 
                  fontWeight: 'bold',
                  marginBottom: '1rem'
                }}>
                  {item.price}
                </div>

                <button
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    background: '#8B4513',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    fontWeight: '500',
                    transition: 'background 0.3s ease'
                  }}
                  onMouseOver={(e) => e.target.style.background = '#A0522D'}
                  onMouseOut={(e) => e.target.style.background = '#8B4513'}
                >
                  Order Now
                </button>
              </div>
            ))}
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <h2 style={{ color: '#2C1810', marginBottom: '1rem', fontWeight: 'bold', textShadow: '1px 1px 2px rgba(255, 255, 255, 0.5)' }}>
            Enjoy a new blend of coffee style
          </h2>
          <p style={{ color: '#2C1810', fontSize: '1.1rem', fontWeight: '500', textShadow: '1px 1px 2px rgba(255, 255, 255, 0.5)', marginBottom: '2rem' }}>
            From rich espressos to creamy cappuccinos, we have something for every coffee lover.
          </p>
          <button
            onClick={() => navigate('/menu')}
            style={{
              padding: '1rem 2rem',
              background: '#654321',
              color: 'white',
              border: 'none',
              borderRadius: '25px',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)'
            }}
            onMouseOver={(e) => {
              e.target.style.background = '#8B4513'
              e.target.style.transform = 'translateY(-2px)'
              e.target.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.3)'
            }}
            onMouseOut={(e) => {
              e.target.style.background = '#654321'
              e.target.style.transform = 'translateY(0)'
              e.target.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.2)'
            }}
          >
            Browse Full Menu
          </button>
        </div>
      </div>
    </div>
  )
}

export default Home
