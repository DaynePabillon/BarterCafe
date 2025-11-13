import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import Navigation from './components/Navigation'
import CartDrawer from './components/CartDrawer'
import Home from './pages/Home'
import Menu from './pages/Menu'
import About from './pages/About'
import Contact from './pages/Contact'
import Directions from './pages/Directions'
import Checkout from './pages/Checkout'
import Orders from './pages/Orders'
import AuthModal from './components/AuthModal'
import './App.css'

function App() {
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [authMode, setAuthMode] = useState('login') // 'login' or 'signup'

  const openAuthModal = (mode) => {
    setAuthMode(mode)
    setShowAuthModal(true)
  }

  const closeAuthModal = () => {
    setShowAuthModal(false)
  }

  return (
    <CartProvider>
      <Router>
        <div className="app">
          <Navigation onAuthClick={openAuthModal} />
          <CartDrawer />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home onAuthClick={openAuthModal} />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/directions" element={<Directions />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/orders" element={<Orders />} />
            </Routes>
          </main>
          
          {showAuthModal && (
            <AuthModal 
              mode={authMode} 
              onClose={closeAuthModal}
              onSwitchMode={(mode) => setAuthMode(mode)}
            />
          )}
        </div>
      </Router>
    </CartProvider>
  )
}

export default App
