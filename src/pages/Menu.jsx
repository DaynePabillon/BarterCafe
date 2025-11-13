import React, { useState } from 'react'
import { Coffee, Droplet, Snowflake, Flame } from 'lucide-react'
import { useCart } from '../context/CartContext'
import CustomizeDrinkModal from '../components/CustomizeDrinkModal'
import Toast from '../components/Toast'

const Menu = () => {
  const [selectedDrink, setSelectedDrink] = useState(null)
  const [toast, setToast] = useState(null)
  const { addToCart } = useCart()

  const menuItems = [
    {
      id: 1,
      name: 'Cappuccino',
      description: 'Rich espresso with steamed milk foam, perfectly balanced for a smooth coffee experience.',
      price: '$4.50',
      emoji: '☕'
    },
    {
      id: 2,
      name: 'Chai Latte',
      description: 'Spiced tea blend with steamed milk, offering a warm and aromatic flavor profile.',
      price: '$4.25',
      emoji: '🫖'
    },
    {
      id: 3,
      name: 'Macchiato',
      description: 'Espresso "marked" with a dollop of steamed milk foam for a bold coffee taste.',
      price: '$4.75',
      emoji: '☕'
    },
    {
      id: 4,
      name: 'Espresso',
      description: 'Pure, concentrated coffee shot with rich crema and intense flavor.',
      price: '$3.50',
      emoji: '☕'
    },
    {
      id: 5,
      name: 'Americano',
      description: 'Espresso diluted with hot water for a smooth, full-bodied coffee experience.',
      price: '$3.75',
      emoji: '☕'
    },
    {
      id: 6,
      name: 'Mocha',
      description: 'Rich espresso combined with chocolate and steamed milk for the perfect sweet treat.',
      price: '$5.25',
      emoji: '🍫'
    },
    {
      id: 7,
      name: 'Flat White',
      description: 'Double espresso with microfoam milk, creating a velvety smooth coffee.',
      price: '$4.95',
      emoji: '☕'
    },
    {
      id: 8,
      name: 'Cold Brew',
      description: 'Slow-steeped coffee served cold with a smooth, less acidic flavor profile.',
      price: '$4.00',
      emoji: '🧊'
    }
  ]

  const handleCustomize = (item) => {
    setSelectedDrink(item)
  }

  const handleAddToCart = (customizedItem) => {
    addToCart(customizedItem)
    setToast({ message: `${customizedItem.name} added to cart!`, type: 'success' })
  }

  return (
    <div className="page">
      <div className="page-container">
        <h1 className="page-title">Enjoy a new blend of coffee style</h1>
        <p style={{ textAlign: 'center', color: '#2C1810', fontSize: '1.1rem', marginBottom: '2rem', fontWeight: '500', textShadow: '1px 1px 2px rgba(255, 255, 255, 0.5)' }}>
          Your daily coffee fix is just a click away
        </p>
        
        <div className="menu-grid">
          {menuItems.map((item) => (
            <div key={item.id} className="menu-item">
              <div className="menu-item-image">
                {item.emoji}
              </div>
              <div className="menu-item-content">
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <div className="menu-item-price">{item.price}</div>
                <button 
                  className="order-btn"
                  onClick={() => handleCustomize(item)}
                >
                  Customize & Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
        
        {selectedDrink && (
          <CustomizeDrinkModal
            drink={selectedDrink}
            onClose={() => setSelectedDrink(null)}
            onAddToCart={handleAddToCart}
          />
        )}
        
        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}
      </div>
    </div>
  )
}

export default Menu
