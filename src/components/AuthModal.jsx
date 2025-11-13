import React, { useState } from 'react'

const AuthModal = ({ mode, onClose, onSwitchMode }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    // Clear error when user starts typing
    if (error) setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    try {
      // Validation
      if (mode === 'signup') {
        if (formData.password !== formData.confirmPassword) {
          setError('Passwords do not match')
          setLoading(false)
          return
        }
        if (formData.password.length < 6) {
          setError('Password must be at least 6 characters')
          setLoading(false)
          return
        }
      }

      const endpoint = mode === 'login' ? '/api/login' : '/api/register'
      const payload = mode === 'login' 
        ? { email: formData.email, password: formData.password }
        : { username: formData.username, email: formData.email, password: formData.password }

      const response = await fetch(`http://localhost:3001${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      const data = await response.json()

      if (response.ok) {
        // Store token in localStorage
        localStorage.setItem('token', data.token)
        localStorage.setItem('user', JSON.stringify(data.user))
        
        setSuccess(data.message)
        setTimeout(() => {
          onClose()
          // Reload page to update UI with logged in state
          window.location.reload()
        }, 1000)
      } else {
        setError(data.error || 'Something went wrong')
      }
    } catch (error) {
      console.error('Auth error:', error)
      setError('Network error. Please make sure the server is running.')
    } finally {
      setLoading(false)
    }
  }

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          ×
        </button>
        
        <h2 className="modal-title">
          {mode === 'login' ? 'Login' : 'Signup'}
        </h2>
        
        {error && (
          <div style={{ 
            background: '#ff4444', 
            color: 'white', 
            padding: '0.75rem', 
            borderRadius: '5px', 
            marginBottom: '1rem',
            textAlign: 'center'
          }}>
            {error}
          </div>
        )}
        
        {success && (
          <div style={{ 
            background: '#44ff44', 
            color: '#333', 
            padding: '0.75rem', 
            borderRadius: '5px', 
            marginBottom: '1rem',
            textAlign: 'center'
          }}>
            {success}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          {mode === 'signup' && (
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Enter your username"
                value={formData.username}
                onChange={handleInputChange}
                required
              />
            </div>
          )}
          
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>
          
          {mode === 'signup' && (
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
              />
            </div>
          )}
          
          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? 'Please wait...' : (mode === 'login' ? 'Login' : 'Signup')}
          </button>
        </form>
        
        {mode === 'login' && (
          <div className="modal-switch">
            <p>Forgot Password?</p>
          </div>
        )}
        
        <div className="modal-switch">
          <p>
            {mode === 'login' ? "New to Login? " : "Already have an Account? "}
            <button 
              onClick={() => onSwitchMode(mode === 'login' ? 'signup' : 'login')}
            >
              {mode === 'login' ? 'Register here' : 'Login here'}
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}

export default AuthModal
