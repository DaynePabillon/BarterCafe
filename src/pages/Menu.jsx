import React, { useState, useMemo, useEffect } from 'react'
import { Coffee, Droplet, Snowflake, Flame, Search, Filter, Star, TrendingUp, MessageSquare } from 'lucide-react'
import { useCart } from '../context/CartContext'
import CustomizeDrinkModal from '../components/CustomizeDrinkModal'
import ReviewsModal from '../components/ReviewsModal'
import ReviewsList from '../components/ReviewsList'
import Toast from '../components/Toast'
import { notifyNewReview } from '../utils/notifications'

const Menu = () => {
  const [selectedDrink, setSelectedDrink] = useState(null)
  const [reviewDrink, setReviewDrink] = useState(null)
  const [viewReviewsDrink, setViewReviewsDrink] = useState(null)
  const [toast, setToast] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedTemp, setSelectedTemp] = useState('All')
  const [sortBy, setSortBy] = useState('name')
  const [priceRange, setPriceRange] = useState([0, 10])
  const [reviews, setReviews] = useState([])
  const { addToCart } = useCart()

  // Load reviews from localStorage
  useEffect(() => {
    const savedReviews = JSON.parse(localStorage.getItem('reviews') || '[]')
    setReviews(savedReviews)
  }, [])

  const menuItems = [
    // Classic Espresso-Based Drinks (1-20)
    {
      id: 1,
      name: 'Espresso',
      description: 'Pure, concentrated coffee shot with rich crema and intense flavor.',
      price: '$3.50',
      emoji: '☕',
      category: 'Coffee',
      temperature: 'Hot',
      rating: 4.9,
      reviews: 312,
      bestSeller: true,
      featured: false
    },
    {
      id: 2,
      name: 'Double Espresso (Doppio)',
      description: 'Two shots of espresso for double the intensity and caffeine kick.',
      price: '$4.50',
      emoji: '☕',
      category: 'Coffee',
      temperature: 'Hot',
      rating: 4.8,
      reviews: 189,
      bestSeller: false,
      featured: false
    },
    {
      id: 3,
      name: 'Ristretto',
      description: 'Short shot of espresso with less water, more concentrated and sweeter.',
      price: '$3.75',
      emoji: '☕',
      category: 'Coffee',
      temperature: 'Hot',
      rating: 4.7,
      reviews: 145,
      bestSeller: false,
      featured: false
    },
    {
      id: 4,
      name: 'Lungo',
      description: 'Long shot of espresso with more water for a milder taste.',
      price: '$3.75',
      emoji: '☕',
      category: 'Coffee',
      temperature: 'Hot',
      rating: 4.6,
      reviews: 123,
      bestSeller: false,
      featured: false
    },
    {
      id: 5,
      name: 'Americano',
      description: 'Espresso diluted with hot water for a smooth, full-bodied coffee experience.',
      price: '$3.75',
      emoji: '☕',
      category: 'Coffee',
      temperature: 'Hot',
      rating: 4.5,
      reviews: 198,
      bestSeller: false,
      featured: false
    },
    {
      id: 6,
      name: 'Cappuccino',
      description: 'Rich espresso with steamed milk foam, perfectly balanced for a smooth coffee experience.',
      price: '$4.50',
      emoji: '☕',
      category: 'Coffee',
      temperature: 'Hot',
      rating: 4.8,
      reviews: 245,
      bestSeller: true,
      featured: true
    },
    {
      id: 7,
      name: 'Flat White',
      description: 'Double espresso with microfoam milk, creating a velvety smooth coffee.',
      price: '$4.95',
      emoji: '☕',
      category: 'Coffee',
      temperature: 'Hot',
      rating: 4.6,
      reviews: 167,
      bestSeller: false,
      featured: false
    },
    {
      id: 8,
      name: 'Latte',
      description: 'Smooth espresso with steamed milk and light foam, creamy and comforting.',
      price: '$4.75',
      emoji: '☕',
      category: 'Coffee',
      temperature: 'Hot',
      rating: 4.7,
      reviews: 234,
      bestSeller: true,
      featured: false
    },
    {
      id: 9,
      name: 'Mocha',
      description: 'Rich espresso combined with chocolate and steamed milk for the perfect sweet treat.',
      price: '$5.25',
      emoji: '🍫',
      category: 'Chocolate',
      temperature: 'Hot',
      rating: 4.7,
      reviews: 223,
      bestSeller: false,
      featured: true,
      seasonal: true
    },
    {
      id: 10,
      name: 'Macchiato',
      description: 'Espresso "marked" with a dollop of steamed milk foam for a bold coffee taste.',
      price: '$4.75',
      emoji: '☕',
      category: 'Coffee',
      temperature: 'Hot',
      rating: 4.7,
      reviews: 156,
      bestSeller: true,
      featured: false
    },
    {
      id: 11,
      name: 'Cortado',
      description: 'Equal parts espresso and steamed milk, perfectly balanced Spanish-style coffee.',
      price: '$4.25',
      emoji: '☕',
      category: 'Coffee',
      temperature: 'Hot',
      rating: 4.6,
      reviews: 134,
      bestSeller: false,
      featured: false
    },
    {
      id: 12,
      name: 'Gibraltar',
      description: 'Double espresso with steamed milk in a Gibraltar glass, smooth and strong.',
      price: '$4.50',
      emoji: '☕',
      category: 'Coffee',
      temperature: 'Hot',
      rating: 4.7,
      reviews: 98,
      bestSeller: false,
      featured: false
    },
    {
      id: 13,
      name: 'Piccolo Latte',
      description: 'Single ristretto shot with steamed milk in a small glass, intense yet smooth.',
      price: '$4.00',
      emoji: '☕',
      category: 'Coffee',
      temperature: 'Hot',
      rating: 4.5,
      reviews: 87,
      bestSeller: false,
      featured: false
    },
    {
      id: 14,
      name: 'Breve',
      description: 'Espresso with steamed half-and-half for an extra creamy, rich experience.',
      price: '$5.00',
      emoji: '☕',
      category: 'Coffee',
      temperature: 'Hot',
      rating: 4.6,
      reviews: 112,
      bestSeller: false,
      featured: false
    },
    {
      id: 15,
      name: 'Red Eye',
      description: 'Drip coffee with a shot of espresso for an extra caffeine boost.',
      price: '$4.25',
      emoji: '☕',
      category: 'Coffee',
      temperature: 'Hot',
      rating: 4.8,
      reviews: 156,
      bestSeller: false,
      featured: false
    },
    {
      id: 16,
      name: 'Black Eye',
      description: 'Drip coffee with two shots of espresso, seriously strong wake-up call.',
      price: '$4.75',
      emoji: '☕',
      category: 'Coffee',
      temperature: 'Hot',
      rating: 4.7,
      reviews: 134,
      bestSeller: false,
      featured: false
    },
    {
      id: 17,
      name: 'Dead Eye',
      description: 'Drip coffee with three shots of espresso, maximum caffeine power.',
      price: '$5.25',
      emoji: '☕',
      category: 'Coffee',
      temperature: 'Hot',
      rating: 4.9,
      reviews: 98,
      bestSeller: false,
      featured: false
    },
    {
      id: 18,
      name: 'Affogato',
      description: 'Vanilla gelato or ice cream drowned in a shot of hot espresso.',
      price: '$5.50',
      emoji: '🍨',
      category: 'Coffee',
      temperature: 'Hot',
      rating: 4.8,
      reviews: 167,
      bestSeller: false,
      featured: false,
      seasonal: true
    },
    {
      id: 19,
      name: 'Café au Lait',
      description: 'Equal parts brewed coffee and steamed milk, French-style classic.',
      price: '$4.00',
      emoji: '☕',
      category: 'Coffee',
      temperature: 'Hot',
      rating: 4.5,
      reviews: 123,
      bestSeller: false,
      featured: false
    },
    {
      id: 20,
      name: 'Vienna Coffee',
      description: 'Espresso topped with whipped cream instead of milk foam.',
      price: '$4.75',
      emoji: '☕',
      category: 'Coffee',
      temperature: 'Hot',
      rating: 4.6,
      reviews: 145,
      bestSeller: false,
      featured: false
    },
    
    // Iced & Cold Coffee Drinks (21-40)
    {
      id: 21,
      name: 'Iced Coffee',
      description: 'Chilled brewed coffee served over ice, refreshing and smooth.',
      price: '$3.75',
      emoji: '🧊',
      category: 'Coffee',
      temperature: 'Cold',
      rating: 4.6,
      reviews: 234,
      bestSeller: true,
      featured: false
    },
    {
      id: 22,
      name: 'Iced Americano',
      description: 'Espresso shots with cold water over ice, crisp and refreshing.',
      price: '$4.00',
      emoji: '🧊',
      category: 'Coffee',
      temperature: 'Cold',
      rating: 4.5,
      reviews: 189,
      bestSeller: false,
      featured: false
    },
    {
      id: 23,
      name: 'Iced Latte',
      description: 'Smooth espresso with cold milk over ice, refreshing and energizing.',
      price: '$4.50',
      emoji: '🧊',
      category: 'Coffee',
      temperature: 'Cold',
      rating: 4.7,
      reviews: 178,
      bestSeller: false,
      featured: false
    },
    {
      id: 24,
      name: 'Iced Mocha',
      description: 'Chilled espresso with chocolate and milk over ice, sweet and refreshing.',
      price: '$5.00',
      emoji: '🧊',
      category: 'Chocolate',
      temperature: 'Cold',
      rating: 4.7,
      reviews: 201,
      bestSeller: false,
      featured: false
    },
    {
      id: 25,
      name: 'Iced Macchiato',
      description: 'Espresso poured over ice and milk with caramel drizzle.',
      price: '$4.75',
      emoji: '🧊',
      category: 'Coffee',
      temperature: 'Cold',
      rating: 4.6,
      reviews: 167,
      bestSeller: false,
      featured: false
    },
    {
      id: 26,
      name: 'Iced Flat White',
      description: 'Double espresso with cold microfoam milk over ice.',
      price: '$5.00',
      emoji: '🧊',
      category: 'Coffee',
      temperature: 'Cold',
      rating: 4.7,
      reviews: 145,
      bestSeller: false,
      featured: false
    },
    {
      id: 27,
      name: 'Cold Brew',
      description: 'Slow-steeped coffee served cold with a smooth, less acidic flavor profile.',
      price: '$4.00',
      emoji: '🧊',
      category: 'Coffee',
      temperature: 'Cold',
      rating: 4.8,
      reviews: 201,
      bestSeller: true,
      featured: true
    },
    {
      id: 28,
      name: 'Nitro Cold Brew',
      description: 'Cold brew infused with nitrogen for a creamy, cascading effect.',
      price: '$5.25',
      emoji: '🧊',
      category: 'Coffee',
      temperature: 'Cold',
      rating: 4.9,
      reviews: 234,
      bestSeller: true,
      featured: false
    },
    {
      id: 29,
      name: 'Sweet Cream Cold Brew',
      description: 'Cold brew topped with house-made vanilla sweet cream.',
      price: '$4.75',
      emoji: '🧊',
      category: 'Coffee',
      temperature: 'Cold',
      rating: 4.8,
      reviews: 189,
      bestSeller: false,
      featured: false
    },
    {
      id: 30,
      name: 'Honey Almond Cold Brew',
      description: 'Cold brew with honey and almond milk for a nutty sweetness.',
      price: '$5.00',
      emoji: '🧊',
      category: 'Coffee',
      temperature: 'Cold',
      rating: 4.7,
      reviews: 156,
      bestSeller: false,
      featured: false
    },
    {
      id: 31,
      name: 'Iced Caramel Latte',
      description: 'Iced latte with rich caramel syrup and caramel drizzle.',
      price: '$5.25',
      emoji: '🧊',
      category: 'Coffee',
      temperature: 'Cold',
      rating: 4.8,
      reviews: 223,
      bestSeller: true,
      featured: false
    },
    {
      id: 32,
      name: 'Iced Hazelnut Latte',
      description: 'Iced latte with sweet hazelnut syrup, nutty and delicious.',
      price: '$5.00',
      emoji: '🧊',
      category: 'Coffee',
      temperature: 'Cold',
      rating: 4.6,
      reviews: 178,
      bestSeller: false,
      featured: false
    },
    {
      id: 33,
      name: 'Iced Vanilla Latte',
      description: 'Classic iced latte with smooth vanilla syrup.',
      price: '$5.00',
      emoji: '🧊',
      category: 'Coffee',
      temperature: 'Cold',
      rating: 4.7,
      reviews: 198,
      bestSeller: false,
      featured: false
    },
    {
      id: 34,
      name: 'Iced White Mocha',
      description: 'Iced mocha with white chocolate sauce, sweet and creamy.',
      price: '$5.50',
      emoji: '🧊',
      category: 'Chocolate',
      temperature: 'Cold',
      rating: 4.7,
      reviews: 167,
      bestSeller: false,
      featured: false
    },
    {
      id: 35,
      name: 'Iced Brown Sugar Shaken Espresso',
      description: 'Espresso shaken with brown sugar and ice, topped with oat milk.',
      price: '$5.25',
      emoji: '🧊',
      category: 'Coffee',
      temperature: 'Cold',
      rating: 4.9,
      reviews: 245,
      bestSeller: true,
      featured: true,
      seasonal: true
    },
    {
      id: 36,
      name: 'Espresso Tonic',
      description: 'Espresso shot over tonic water and ice, refreshing and unique.',
      price: '$4.75',
      emoji: '🧊',
      category: 'Coffee',
      temperature: 'Cold',
      rating: 4.5,
      reviews: 123,
      bestSeller: false,
      featured: false
    },
    {
      id: 37,
      name: 'Iced Espresso Lemonade',
      description: 'Espresso mixed with fresh lemonade over ice, tangy and energizing.',
      price: '$4.50',
      emoji: '🍋',
      category: 'Coffee',
      temperature: 'Cold',
      rating: 4.4,
      reviews: 98,
      bestSeller: false,
      featured: false
    },
    {
      id: 38,
      name: 'Coffee Soda',
      description: 'Cold brew mixed with sparkling water and syrup, fizzy coffee delight.',
      price: '$4.25',
      emoji: '🧊',
      category: 'Coffee',
      temperature: 'Cold',
      rating: 4.3,
      reviews: 87,
      bestSeller: false,
      featured: false
    },
    {
      id: 39,
      name: 'Iced Coconut Latte',
      description: 'Iced latte with coconut milk and coconut syrup, tropical and creamy.',
      price: '$5.25',
      emoji: '🥥',
      category: 'Coffee',
      temperature: 'Cold',
      rating: 4.6,
      reviews: 145,
      bestSeller: false,
      featured: false
    },
    {
      id: 40,
      name: 'Iced Matcha Espresso Fusion',
      description: 'Matcha green tea blended with espresso over ice, unique and energizing.',
      price: '$5.50',
      emoji: '🍵',
      category: 'Coffee',
      temperature: 'Cold',
      rating: 4.7,
      reviews: 134,
      bestSeller: false,
      featured: false,
      seasonal: true
    },
    
    // Keep original non-coffee items
    {
      id: 41,
      name: 'Chai Latte',
      description: 'Spiced tea blend with steamed milk, offering a warm and aromatic flavor profile.',
      price: '$4.25',
      emoji: '🫖',
      category: 'Tea',
      temperature: 'Hot',
      rating: 4.6,
      reviews: 189,
      bestSeller: false,
      featured: false
    },
    {
      id: 42,
      name: 'Hot Chocolate',
      description: 'Rich, creamy chocolate drink topped with whipped cream.',
      price: '$3.95',
      emoji: '🍫',
      category: 'Chocolate',
      temperature: 'Hot',
      rating: 4.5,
      reviews: 145,
      bestSeller: false,
      featured: false
    }
  ]

  const handleCustomize = (item) => {
    setSelectedDrink(item)
  }

  const handleAddToCart = (customizedItem) => {
    addToCart(customizedItem)
    setToast({ message: `${customizedItem.name} added to cart!`, type: 'success' })
  }

  const handleSubmitReview = (review) => {
    const updatedReviews = [...reviews, review]
    setReviews(updatedReviews)
    localStorage.setItem('reviews', JSON.stringify(updatedReviews))
    setToast({ message: 'Review submitted successfully!', type: 'success' })
    notifyNewReview(review.drinkName)
  }

  const getDrinkReviewCount = (drinkId) => {
    return reviews.filter(r => r.drinkId === drinkId).length
  }

  // Filter and sort logic
  const filteredAndSortedItems = useMemo(() => {
    let filtered = menuItems

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Category filter
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(item => item.category === selectedCategory)
    }

    // Temperature filter
    if (selectedTemp !== 'All') {
      filtered = filtered.filter(item => item.temperature === selectedTemp)
    }

    // Price range filter
    filtered = filtered.filter(item => {
      const price = parseFloat(item.price.replace('$', ''))
      return price >= priceRange[0] && price <= priceRange[1]
    })

    // Sort
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return parseFloat(a.price.replace('$', '')) - parseFloat(b.price.replace('$', ''))
        case 'price-high':
          return parseFloat(b.price.replace('$', '')) - parseFloat(a.price.replace('$', ''))
        case 'rating':
          return b.rating - a.rating
        case 'popular':
          return b.reviews - a.reviews
        case 'name':
        default:
          return a.name.localeCompare(b.name)
      }
    })

    return sorted
  }, [menuItems, searchQuery, selectedCategory, selectedTemp, priceRange, sortBy])

  return (
    <div className="page">
      <div className="page-container">
        <h1 className="page-title">Enjoy a new blend of coffee style</h1>
        <p style={{ textAlign: 'center', color: '#2C1810', fontSize: '1.1rem', marginBottom: '2rem', fontWeight: '500', textShadow: '1px 1px 2px rgba(255, 255, 255, 0.5)' }}>
          Your daily coffee fix is just a click away
        </p>

        {/* Search and Filter Section */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.9)',
          padding: '2rem',
          borderRadius: '15px',
          marginBottom: '2rem',
          border: '2px solid #8B4513'
        }}>
          {/* Search Bar */}
          <div style={{ marginBottom: '1.5rem' }}>
            <div style={{ position: 'relative' }}>
              <Search size={20} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#8B4513' }} />
              <input
                type="text"
                placeholder="Search drinks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem 0.75rem 3rem',
                  border: '2px solid #8B4513',
                  borderRadius: '25px',
                  fontSize: '1rem',
                  color: '#2C1810'
                }}
              />
            </div>
          </div>

          {/* Filters */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
            {/* Category Filter */}
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#2C1810', fontWeight: '500' }}>
                <Filter size={16} style={{ display: 'inline', marginRight: '0.5rem' }} />
                Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  border: '2px solid #8B4513',
                  borderRadius: '5px',
                  color: '#2C1810',
                  fontSize: '1rem'
                }}
              >
                <option value="All">All</option>
                <option value="Coffee">Coffee</option>
                <option value="Tea">Tea</option>
                <option value="Chocolate">Chocolate</option>
              </select>
            </div>

            {/* Temperature Filter */}
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#2C1810', fontWeight: '500' }}>
                Temperature
              </label>
              <select
                value={selectedTemp}
                onChange={(e) => setSelectedTemp(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  border: '2px solid #8B4513',
                  borderRadius: '5px',
                  color: '#2C1810',
                  fontSize: '1rem'
                }}
              >
                <option value="All">All</option>
                <option value="Hot">Hot</option>
                <option value="Cold">Cold</option>
              </select>
            </div>

            {/* Sort By */}
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#2C1810', fontWeight: '500' }}>
                Sort By
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  border: '2px solid #8B4513',
                  borderRadius: '5px',
                  color: '#2C1810',
                  fontSize: '1rem'
                }}
              >
                <option value="name">Name (A-Z)</option>
                <option value="price-low">Price (Low to High)</option>
                <option value="price-high">Price (High to Low)</option>
                <option value="rating">Highest Rated</option>
                <option value="popular">Most Popular</option>
              </select>
            </div>
          </div>

          {/* Results Count */}
          <div style={{ color: '#666', fontSize: '0.9rem' }}>
            Showing {filteredAndSortedItems.length} of {menuItems.length} drinks
          </div>
        </div>
        
        <div className="menu-grid">
          {filteredAndSortedItems.map((item) => (
            <div key={item.id} className="menu-item">
              {/* Badges */}
              <div style={{ position: 'absolute', top: '1rem', right: '1rem', display: 'flex', gap: '0.5rem', zIndex: 1 }}>
                {item.bestSeller && (
                  <span style={{
                    background: '#ef4444',
                    color: 'white',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '15px',
                    fontSize: '0.75rem',
                    fontWeight: 'bold',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem'
                  }}>
                    <TrendingUp size={12} />
                    Best Seller
                  </span>
                )}
                {item.seasonal && (
                  <span style={{
                    background: '#10b981',
                    color: 'white',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '15px',
                    fontSize: '0.75rem',
                    fontWeight: 'bold'
                  }}>
                    Seasonal
                  </span>
                )}
              </div>

              <div className="menu-item-image">
                {item.emoji}
              </div>
              <div className="menu-item-content">
                <h3>{item.name}</h3>
                
                {/* Rating */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <Star size={16} fill="#f59e0b" color="#f59e0b" />
                    <span style={{ color: '#F5DEB3', fontWeight: 'bold' }}>{item.rating}</span>
                  </div>
                  <span style={{ color: 'rgba(245, 222, 179, 0.7)', fontSize: '0.85rem' }}>
                    ({item.reviews} reviews)
                  </span>
                </div>

                <p>{item.description}</p>
                <div className="menu-item-price">{item.price}</div>
                
                {/* Action Buttons */}
                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
                  <button 
                    className="order-btn"
                    onClick={() => handleCustomize(item)}
                    style={{ flex: 2 }}
                  >
                    Order Now
                  </button>
                  <button
                    onClick={() => setReviewDrink(item)}
                    style={{
                      flex: 1,
                      padding: '0.75rem',
                      background: 'rgba(245, 222, 179, 0.2)',
                      color: '#F5DEB3',
                      border: '2px solid #8B4513',
                      borderRadius: '5px',
                      cursor: 'pointer',
                      fontWeight: '500',
                      transition: 'all 0.3s ease',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.25rem'
                    }}
                    onMouseOver={(e) => {
                      e.target.style.background = '#8B4513'
                      e.target.style.color = 'white'
                    }}
                    onMouseOut={(e) => {
                      e.target.style.background = 'rgba(245, 222, 179, 0.2)'
                      e.target.style.color = '#F5DEB3'
                    }}
                  >
                    <Star size={16} />
                    Review
                  </button>
                </div>

                {/* View Reviews Link */}
                {getDrinkReviewCount(item.id) > 0 && (
                  <button
                    onClick={() => setViewReviewsDrink(item)}
                    style={{
                      width: '100%',
                      marginTop: '0.5rem',
                      padding: '0.5rem',
                      background: 'none',
                      border: 'none',
                      color: 'rgba(245, 222, 179, 0.8)',
                      cursor: 'pointer',
                      fontSize: '0.85rem',
                      textDecoration: 'underline',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.25rem'
                    }}
                  >
                    <MessageSquare size={14} />
                    View {getDrinkReviewCount(item.id)} review{getDrinkReviewCount(item.id) > 1 ? 's' : ''}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {filteredAndSortedItems.length === 0 && (
          <div style={{ textAlign: 'center', padding: '4rem 2rem' }}>
            <Coffee size={64} color="#CCC" style={{ marginBottom: '1rem' }} />
            <p style={{ color: '#666', fontSize: '1.1rem' }}>
              No drinks found matching your filters
            </p>
            <button
              onClick={() => {
                setSearchQuery('')
                setSelectedCategory('All')
                setSelectedTemp('All')
                setSortBy('name')
              }}
              style={{
                marginTop: '1rem',
                padding: '0.75rem 1.5rem',
                background: '#654321',
                color: 'white',
                border: 'none',
                borderRadius: '25px',
                cursor: 'pointer',
                fontWeight: '500'
              }}
            >
              Clear Filters
            </button>
          </div>
        )}
        
        {selectedDrink && (
          <CustomizeDrinkModal
            drink={selectedDrink}
            onClose={() => setSelectedDrink(null)}
            onAddToCart={handleAddToCart}
          />
        )}

        {reviewDrink && (
          <ReviewsModal
            drink={reviewDrink}
            onClose={() => setReviewDrink(null)}
            onSubmitReview={handleSubmitReview}
          />
        )}

        {viewReviewsDrink && (
          <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && setViewReviewsDrink(null)}>
            <div className="modal-content" style={{ maxWidth: '700px', maxHeight: '80vh', overflow: 'auto' }}>
              <button className="modal-close" onClick={() => setViewReviewsDrink(null)}>×</button>
              <h2 className="modal-title">{viewReviewsDrink.name} Reviews</h2>
              <ReviewsList drinkId={viewReviewsDrink.id} reviews={reviews} />
            </div>
          </div>
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
