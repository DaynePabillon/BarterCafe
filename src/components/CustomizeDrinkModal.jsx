import React, { useState, useEffect } from 'react'
import { X, Plus, Minus } from 'lucide-react'

const CustomizeDrinkModal = ({ drink, onClose, onAddToCart }) => {
  const [customizations, setCustomizations] = useState({
    size: 'Medium',
    temperature: 'Hot',
    milk: 'Whole Milk',
    sweetness: 'Regular',
    extraShot: false
  })
  const [quantity, setQuantity] = useState(1)
  const [finalPrice, setFinalPrice] = useState(0)

  const basePrice = parseFloat(drink.price.replace('$', ''))

  const prices = {
    size: { Small: -0.50, Medium: 0, Large: 0.75 },
    temperature: { Hot: 0, Iced: 0.50 },
    milk: { 
      'Whole Milk': 0, 
      'Oat Milk': 0.75, 
      'Almond Milk': 0.75, 
      'Soy Milk': 0.50,
      'Coconut Milk': 0.75
    },
    sweetness: { 'No Sugar': 0, 'Light': 0, 'Regular': 0, 'Extra': 0.25 },
    extraShot: 0.75
  }

  useEffect(() => {
    let price = basePrice
    price += prices.size[customizations.size]
    price += prices.temperature[customizations.temperature]
    price += prices.milk[customizations.milk]
    price += prices.sweetness[customizations.sweetness]
    if (customizations.extraShot) price += prices.extraShot
    setFinalPrice(price)
  }, [customizations, basePrice])

  const handleCustomizationChange = (category, value) => {
    setCustomizations(prev => ({ ...prev, [category]: value }))
  }

  const handleAddToCart = () => {
    onAddToCart({
      ...drink,
      customizations,
      quantity,
      finalPrice: `$${finalPrice.toFixed(2)}`
    })
    onClose()
  }

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal-content" style={{ maxWidth: '600px', maxHeight: '90vh', overflow: 'auto' }}>
        <button className="modal-close" onClick={onClose}>×</button>
        
        <h2 className="modal-title">Customize Your {drink.name}</h2>
        
        <div style={{ marginBottom: '1.5rem' }}>
          <h3 style={{ color: '#F5DEB3', marginBottom: '0.75rem' }}>Size</h3>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {Object.keys(prices.size).map(size => (
              <button
                key={size}
                onClick={() => handleCustomizationChange('size', size)}
                style={{
                  flex: 1,
                  padding: '0.75rem',
                  background: customizations.size === size ? '#8B4513' : 'rgba(245, 222, 179, 0.1)',
                  border: `2px solid ${customizations.size === size ? '#8B4513' : '#8B4513'}`,
                  color: '#F5DEB3',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  fontWeight: customizations.size === size ? 'bold' : 'normal'
                }}
              >
                {size}
                <div style={{ fontSize: '0.8rem' }}>
                  {prices.size[size] > 0 ? `+$${prices.size[size].toFixed(2)}` : 
                   prices.size[size] < 0 ? `-$${Math.abs(prices.size[size]).toFixed(2)}` : 'Standard'}
                </div>
              </button>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <h3 style={{ color: '#F5DEB3', marginBottom: '0.75rem' }}>Temperature</h3>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {Object.keys(prices.temperature).map(temp => (
              <button
                key={temp}
                onClick={() => handleCustomizationChange('temperature', temp)}
                style={{
                  flex: 1,
                  padding: '0.75rem',
                  background: customizations.temperature === temp ? '#8B4513' : 'rgba(245, 222, 179, 0.1)',
                  border: `2px solid ${customizations.temperature === temp ? '#8B4513' : '#8B4513'}`,
                  color: '#F5DEB3',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  fontWeight: customizations.temperature === temp ? 'bold' : 'normal'
                }}
              >
                {temp}
                <div style={{ fontSize: '0.8rem' }}>
                  {prices.temperature[temp] > 0 ? `+$${prices.temperature[temp].toFixed(2)}` : 'Standard'}
                </div>
              </button>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <h3 style={{ color: '#F5DEB3', marginBottom: '0.75rem' }}>Milk Type</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.5rem' }}>
            {Object.keys(prices.milk).map(milk => (
              <button
                key={milk}
                onClick={() => handleCustomizationChange('milk', milk)}
                style={{
                  padding: '0.75rem',
                  background: customizations.milk === milk ? '#8B4513' : 'rgba(245, 222, 179, 0.1)',
                  border: `2px solid ${customizations.milk === milk ? '#8B4513' : '#8B4513'}`,
                  color: '#F5DEB3',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  fontWeight: customizations.milk === milk ? 'bold' : 'normal'
                }}
              >
                {milk}
                <div style={{ fontSize: '0.8rem' }}>
                  {prices.milk[milk] > 0 ? `+$${prices.milk[milk].toFixed(2)}` : 'Standard'}
                </div>
              </button>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <h3 style={{ color: '#F5DEB3', marginBottom: '0.75rem' }}>Sweetness Level</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.5rem' }}>
            {Object.keys(prices.sweetness).map(sweet => (
              <button
                key={sweet}
                onClick={() => handleCustomizationChange('sweetness', sweet)}
                style={{
                  padding: '0.75rem',
                  background: customizations.sweetness === sweet ? '#8B4513' : 'rgba(245, 222, 179, 0.1)',
                  border: `2px solid ${customizations.sweetness === sweet ? '#8B4513' : '#8B4513'}`,
                  color: '#F5DEB3',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  fontWeight: customizations.sweetness === sweet ? 'bold' : 'normal'
                }}
              >
                {sweet}
                <div style={{ fontSize: '0.8rem' }}>
                  {prices.sweetness[sweet] > 0 ? `+$${prices.sweetness[sweet].toFixed(2)}` : 'Standard'}
                </div>
              </button>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={customizations.extraShot}
              onChange={(e) => handleCustomizationChange('extraShot', e.target.checked)}
              style={{ width: '20px', height: '20px', cursor: 'pointer' }}
            />
            <span style={{ color: '#F5DEB3', fontSize: '1.1rem' }}>
              Add Extra Shot (+${prices.extraShot.toFixed(2)})
            </span>
          </label>
        </div>

        <div style={{ 
          borderTop: '2px solid #8B4513', 
          paddingTop: '1rem',
          marginBottom: '1rem'
        }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: '1rem'
          }}>
            <span style={{ color: '#F5DEB3', fontSize: '1.1rem' }}>Quantity:</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                style={{
                  background: '#8B4513',
                  border: 'none',
                  color: 'white',
                  width: '35px',
                  height: '35px',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Minus size={18} />
              </button>
              <span style={{ color: '#F5DEB3', fontSize: '1.3rem', fontWeight: 'bold', minWidth: '30px', textAlign: 'center' }}>
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                style={{
                  background: '#8B4513',
                  border: 'none',
                  color: 'white',
                  width: '35px',
                  height: '35px',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Plus size={18} />
              </button>
            </div>
          </div>

          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            fontSize: '1.3rem',
            fontWeight: 'bold',
            color: '#F5DEB3',
            marginBottom: '1rem'
          }}>
            <span>Total:</span>
            <span>${(finalPrice * quantity).toFixed(2)}</span>
          </div>
        </div>

        <button
          onClick={handleAddToCart}
          className="submit-btn"
          style={{ fontSize: '1.1rem' }}
        >
          Add to Cart
        </button>
      </div>
    </div>
  )
}

export default CustomizeDrinkModal
