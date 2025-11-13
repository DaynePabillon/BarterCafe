import React, { useState, useEffect } from 'react'
import { Coffee, LogIn, UserPlus } from 'lucide-react'

const Home = ({ onAuthClick }) => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (userData) {
      setUser(JSON.parse(userData))
    }
  }, [])

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
        
        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <h2 style={{ color: '#2C1810', marginBottom: '1rem', fontWeight: 'bold', textShadow: '1px 1px 2px rgba(255, 255, 255, 0.5)' }}>
            Enjoy a new blend of coffee style
          </h2>
          <p style={{ color: '#2C1810', fontSize: '1.1rem', fontWeight: '500', textShadow: '1px 1px 2px rgba(255, 255, 255, 0.5)' }}>
            From rich espressos to creamy cappuccinos, we have something for every coffee lover.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Home
