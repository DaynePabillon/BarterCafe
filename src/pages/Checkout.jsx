import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { CreditCard, Wallet, DollarSign, ArrowLeft } from 'lucide-react'

const Checkout = () => {
  const navigate = useNavigate()
  const { cartItems, getCartTotal, clearCart } = useCart()
  const [paymentMethod, setPaymentMethod] = useState('card')
  const [processing, setProcessing] = useState(false)
  const [orderPlaced, setOrderPlaced] = useState(false)

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    cardNumber: '',
    expiry: '',
    cvv: ''
  })

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setProcessing(true)

    // Simulate payment processing
    setTimeout(() => {
      setProcessing(false)
      setOrderPlaced(true)
      
      // Save order to localStorage
      const order = {
        id: Date.now(),
        items: cartItems,
        total: getCartTotal(),
        date: new Date().toISOString(),
        status: 'Preparing',
        customer: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone
        }
      }
      
      const orders = JSON.parse(localStorage.getItem('orders') || '[]')
      orders.push(order)
      localStorage.setItem('orders', JSON.stringify(orders))
      
      clearCart()
      
      setTimeout(() => {
        navigate('/orders')
      }, 2000)
    }, 2000)
  }

  if (cartItems.length === 0 && !orderPlaced) {
    return (
      <div className="page">
        <div className="page-container">
          <div style={{ textAlign: 'center', padding: '4rem 2rem' }}>
            <h1 className="page-title">Your cart is empty</h1>
            <p style={{ color: '#2C1810', marginBottom: '2rem' }}>
              Add some items to your cart before checking out
            </p>
            <button
              onClick={() => navigate('/menu')}
              className="submit-btn"
              style={{ maxWidth: '300px', margin: '0 auto' }}
            >
              Browse Menu
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (orderPlaced) {
    return (
      <div className="page">
        <div className="page-container">
          <div style={{ 
            textAlign: 'center', 
            padding: '4rem 2rem',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>✅</div>
            <h1 className="page-title">Order Placed Successfully!</h1>
            <p style={{ color: '#2C1810', fontSize: '1.1rem', marginBottom: '2rem' }}>
              Thank you for your order! We're preparing your delicious coffee.
            </p>
            <p style={{ color: '#666', marginBottom: '2rem' }}>
              Redirecting to your orders...
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="page">
      <div className="page-container">
        <button
          onClick={() => navigate(-1)}
          style={{
            background: 'none',
            border: 'none',
            color: '#654321',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginBottom: '1rem',
            fontSize: '1rem',
            fontWeight: '500'
          }}
        >
          <ArrowLeft size={20} />
          Back
        </button>

        <h1 className="page-title">Checkout</h1>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '2rem',
          maxWidth: '1000px',
          margin: '0 auto'
        }}>
          {/* Order Summary */}
          <div>
            <div style={{
              background: 'rgba(255, 255, 255, 0.9)',
              padding: '2rem',
              borderRadius: '15px',
              border: '2px solid #8B4513'
            }}>
              <h2 style={{ color: '#2C1810', marginBottom: '1.5rem' }}>Order Summary</h2>
              
              {cartItems.map((item) => (
                <div key={item.cartId} style={{
                  borderBottom: '1px solid #E5E5E5',
                  paddingBottom: '1rem',
                  marginBottom: '1rem'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span style={{ fontWeight: 'bold', color: '#2C1810' }}>
                      {item.name} x{item.quantity}
                    </span>
                    <span style={{ color: '#654321', fontWeight: 'bold' }}>
                      ${(parseFloat(item.finalPrice.replace('$', '')) * item.quantity).toFixed(2)}
                    </span>
                  </div>
                  {item.customizations && (
                    <div style={{ fontSize: '0.85rem', color: '#666' }}>
                      {item.customizations.size} | {item.customizations.temperature} | {item.customizations.milk}
                    </div>
                  )}
                </div>
              ))}

              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '1.3rem',
                fontWeight: 'bold',
                color: '#2C1810',
                paddingTop: '1rem',
                borderTop: '2px solid #8B4513'
              }}>
                <span>Total:</span>
                <span>${getCartTotal().toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Payment Form */}
          <div>
            <div style={{
              background: 'rgba(255, 255, 255, 0.9)',
              padding: '2rem',
              borderRadius: '15px',
              border: '2px solid #8B4513'
            }}>
              <h2 style={{ color: '#2C1810', marginBottom: '1.5rem' }}>Payment Details</h2>

              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name" style={{ color: '#2C1810' }}>Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid #8B4513',
                      borderRadius: '5px',
                      background: 'white',
                      color: '#2C1810'
                    }}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email" style={{ color: '#2C1810' }}>Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid #8B4513',
                      borderRadius: '5px',
                      background: 'white',
                      color: '#2C1810'
                    }}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone" style={{ color: '#2C1810' }}>Phone</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    placeholder="(555) 123-4567"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid #8B4513',
                      borderRadius: '5px',
                      background: 'white',
                      color: '#2C1810'
                    }}
                  />
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ color: '#2C1810', marginBottom: '0.5rem', display: 'block' }}>
                    Payment Method
                  </label>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    {[
                      { value: 'card', icon: CreditCard, label: 'Card' },
                      { value: 'wallet', icon: Wallet, label: 'Wallet' },
                      { value: 'cash', icon: DollarSign, label: 'Cash' }
                    ].map(method => (
                      <button
                        key={method.value}
                        type="button"
                        onClick={() => setPaymentMethod(method.value)}
                        style={{
                          flex: 1,
                          padding: '0.75rem',
                          background: paymentMethod === method.value ? '#8B4513' : 'white',
                          border: `2px solid #8B4513`,
                          color: paymentMethod === method.value ? 'white' : '#2C1810',
                          borderRadius: '5px',
                          cursor: 'pointer',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          gap: '0.25rem'
                        }}
                      >
                        <method.icon size={20} />
                        <span style={{ fontSize: '0.85rem' }}>{method.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {paymentMethod === 'card' && (
                  <>
                    <div className="form-group">
                      <label htmlFor="cardNumber" style={{ color: '#2C1810' }}>Card Number</label>
                      <input
                        type="text"
                        id="cardNumber"
                        name="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        required
                        style={{
                          width: '100%',
                          padding: '0.75rem',
                          border: '1px solid #8B4513',
                          borderRadius: '5px',
                          background: 'white',
                          color: '#2C1810'
                        }}
                      />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                      <div className="form-group">
                        <label htmlFor="expiry" style={{ color: '#2C1810' }}>Expiry</label>
                        <input
                          type="text"
                          id="expiry"
                          name="expiry"
                          placeholder="MM/YY"
                          value={formData.expiry}
                          onChange={handleInputChange}
                          required
                          style={{
                            width: '100%',
                            padding: '0.75rem',
                            border: '1px solid #8B4513',
                            borderRadius: '5px',
                            background: 'white',
                            color: '#2C1810'
                          }}
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="cvv" style={{ color: '#2C1810' }}>CVV</label>
                        <input
                          type="text"
                          id="cvv"
                          name="cvv"
                          placeholder="123"
                          value={formData.cvv}
                          onChange={handleInputChange}
                          required
                          style={{
                            width: '100%',
                            padding: '0.75rem',
                            border: '1px solid #8B4513',
                            borderRadius: '5px',
                            background: 'white',
                            color: '#2C1810'
                          }}
                        />
                      </div>
                    </div>
                  </>
                )}

                <button
                  type="submit"
                  className="submit-btn"
                  disabled={processing}
                  style={{
                    marginTop: '1rem',
                    background: processing ? '#999' : '#8B4513'
                  }}
                >
                  {processing ? 'Processing...' : `Pay $${getCartTotal().toFixed(2)}`}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout
