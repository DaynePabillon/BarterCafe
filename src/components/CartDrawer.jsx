import React from 'react'
import { X, Plus, Minus, ShoppingBag, Trash2 } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useNavigate } from 'react-router-dom'

const CartDrawer = () => {
  const { cartItems, isCartOpen, toggleCart, updateQuantity, removeFromCart, getCartTotal, getCartCount } = useCart()
  const navigate = useNavigate()

  const handleCheckout = () => {
    toggleCart()
    navigate('/checkout')
  }

  if (!isCartOpen) return null

  return (
    <>
      <div 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          zIndex: 9998,
          animation: 'fadeIn 0.3s ease-out'
        }}
        onClick={toggleCart}
      />
      
      <div
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          width: '100%',
          maxWidth: '450px',
          background: '#F5F5F5',
          zIndex: 9999,
          boxShadow: '-5px 0 25px rgba(0, 0, 0, 0.3)',
          display: 'flex',
          flexDirection: 'column',
          animation: 'slideInRight 0.3s ease-out'
        }}
      >
        {/* Header */}
        <div style={{
          padding: '1.5rem',
          background: '#654321',
          color: '#F5DEB3',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <ShoppingBag size={24} />
            <h2 style={{ margin: 0 }}>Your Cart ({getCartCount()})</h2>
          </div>
          <button
            onClick={toggleCart}
            style={{
              background: 'none',
              border: 'none',
              color: '#F5DEB3',
              cursor: 'pointer',
              padding: '0.5rem'
            }}
          >
            <X size={24} />
          </button>
        </div>

        {/* Cart Items */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '1rem'
        }}>
          {cartItems.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '3rem 1rem',
              color: '#666'
            }}>
              <ShoppingBag size={64} color="#CCC" style={{ marginBottom: '1rem' }} />
              <p>Your cart is empty</p>
              <p style={{ fontSize: '0.9rem' }}>Add some delicious coffee to get started!</p>
            </div>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.cartId}
                style={{
                  background: 'white',
                  borderRadius: '10px',
                  padding: '1rem',
                  marginBottom: '1rem',
                  boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <h3 style={{ margin: 0, color: '#2C1810', fontSize: '1.1rem' }}>{item.name}</h3>
                  <button
                    onClick={() => removeFromCart(item.cartId)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#ef4444',
                      cursor: 'pointer',
                      padding: '0.25rem'
                    }}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>

                {/* Customizations */}
                {item.customizations && (
                  <div style={{ fontSize: '0.85rem', color: '#666', marginBottom: '0.5rem' }}>
                    {item.customizations.size && <div>Size: {item.customizations.size}</div>}
                    {item.customizations.temperature && <div>Temperature: {item.customizations.temperature}</div>}
                    {item.customizations.milk && <div>Milk: {item.customizations.milk}</div>}
                    {item.customizations.sweetness && <div>Sweetness: {item.customizations.sweetness}</div>}
                    {item.customizations.extraShot && <div>Extra Shot</div>}
                  </div>
                )}

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <button
                      onClick={() => updateQuantity(item.cartId, item.quantity - 1)}
                      style={{
                        background: '#654321',
                        border: 'none',
                        color: 'white',
                        width: '30px',
                        height: '30px',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <Minus size={16} />
                    </button>
                    <span style={{ fontWeight: 'bold', minWidth: '20px', textAlign: 'center' }}>
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.cartId, item.quantity + 1)}
                      style={{
                        background: '#654321',
                        border: 'none',
                        color: 'white',
                        width: '30px',
                        height: '30px',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  <div style={{ fontWeight: 'bold', color: '#654321', fontSize: '1.1rem' }}>
                    ${(parseFloat(item.finalPrice.replace('$', '')) * item.quantity).toFixed(2)}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div style={{
            padding: '1.5rem',
            background: 'white',
            borderTop: '2px solid #E5E5E5'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '1rem',
              fontSize: '1.2rem',
              fontWeight: 'bold',
              color: '#2C1810'
            }}>
              <span>Total:</span>
              <span>${getCartTotal().toFixed(2)}</span>
            </div>
            <button
              onClick={handleCheckout}
              style={{
                width: '100%',
                padding: '1rem',
                background: '#654321',
                color: 'white',
                border: 'none',
                borderRadius: '10px',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'background 0.3s ease'
              }}
              onMouseOver={(e) => e.target.style.background = '#8B4513'}
              onMouseOut={(e) => e.target.style.background = '#654321'}
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideInRight {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </>
  )
}

export default CartDrawer
