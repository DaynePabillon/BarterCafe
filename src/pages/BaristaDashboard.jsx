import React, { useState, useEffect } from 'react'
import { Coffee, Clock, CheckCircle, Package, User, Mail, Phone, CreditCard, RefreshCw, Plus, Trash2, BookOpen, Archive } from 'lucide-react'

const BaristaDashboard = () => {
  const [activeTab, setActiveTab] = useState('orders') // 'orders', 'archive', or 'recipes'
  const [orders, setOrders] = useState([])
  const [recipes, setRecipes] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('All') // All, Preparing, Brewing, Ready (for active orders)
  const [refreshing, setRefreshing] = useState(false)
  const [showRecipeModal, setShowRecipeModal] = useState(false)
  const [newRecipe, setNewRecipe] = useState({
    name: '',
    description: '',
    baseDrink: 'Espresso',
    ingredients: [],
    instructions: '',
    price: '',
    category: 'Coffee',
    createdBy: 'Barista'
  })
  const [currentIngredient, setCurrentIngredient] = useState('')

  // Fetch all orders
  const fetchOrders = async () => {
    try {
      setRefreshing(true)
      const response = await fetch('http://localhost:3001/api/orders/all')
      if (response.ok) {
        const data = await response.json()
        setOrders(data.orders)
      }
    } catch (error) {
      console.error('Error fetching orders:', error)
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  // Fetch all recipes
  const fetchRecipes = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/recipes')
      if (response.ok) {
        const data = await response.json()
        setRecipes(data.recipes)
      }
    } catch (error) {
      console.error('Error fetching recipes:', error)
    }
  }

  // Create new recipe
  const createRecipe = async () => {
    if (!newRecipe.name || !newRecipe.price || newRecipe.ingredients.length === 0) {
      alert('Please fill in all required fields')
      return
    }

    try {
      const response = await fetch('http://localhost:3001/api/recipes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newRecipe)
      })

      if (response.ok) {
        alert('Recipe created successfully!')
        setShowRecipeModal(false)
        setNewRecipe({
          name: '',
          description: '',
          baseDrink: 'Espresso',
          ingredients: [],
          instructions: '',
          price: '',
          category: 'Coffee',
          createdBy: 'Barista'
        })
        fetchRecipes()
      }
    } catch (error) {
      console.error('Error creating recipe:', error)
      alert('Failed to create recipe')
    }
  }

  // Delete recipe
  const deleteRecipe = async (recipeId) => {
    if (!confirm('Are you sure you want to delete this recipe?')) return

    try {
      const response = await fetch(`http://localhost:3001/api/recipes/${recipeId}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        alert('Recipe deleted successfully!')
        fetchRecipes()
      }
    } catch (error) {
      console.error('Error deleting recipe:', error)
    }
  }

  // Add ingredient to recipe
  const addIngredient = () => {
    if (currentIngredient.trim()) {
      setNewRecipe({
        ...newRecipe,
        ingredients: [...newRecipe.ingredients, currentIngredient.trim()]
      })
      setCurrentIngredient('')
    }
  }

  // Remove ingredient from recipe
  const removeIngredient = (index) => {
    setNewRecipe({
      ...newRecipe,
      ingredients: newRecipe.ingredients.filter((_, i) => i !== index)
    })
  }

  // Update order status
  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const response = await fetch(`http://localhost:3001/api/orders/${orderId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus })
      })

      if (response.ok) {
        // Refresh orders after update
        fetchOrders()
      }
    } catch (error) {
      console.error('Error updating order status:', error)
    }
  }

  // Auto-refresh every 10 seconds
  useEffect(() => {
    fetchOrders()
    fetchRecipes()
    const interval = setInterval(fetchOrders, 10000)
    return () => clearInterval(interval)
  }, [])

  // Separate active and completed orders
  const activeOrders = orders.filter(order => order.status !== 'Completed')
  const completedOrders = orders.filter(order => order.status === 'Completed')

  // Filter orders based on active tab
  const filteredOrders = activeTab === 'archive' 
    ? completedOrders 
    : (filter === 'All' 
        ? activeOrders 
        : activeOrders.filter(order => order.status === filter))

  // Get status color
  const getStatusColor = (status) => {
    switch(status) {
      case 'Preparing': return '#f59e0b'
      case 'Brewing': return '#3b82f6'
      case 'Ready': return '#10b981'
      case 'Completed': return '#6b7280'
      default: return '#8B4513'
    }
  }

  // Get next status
  const getNextStatus = (currentStatus) => {
    const statusFlow = {
      'Preparing': 'Brewing',
      'Brewing': 'Ready',
      'Ready': 'Completed',
      'Completed': null
    }
    return statusFlow[currentStatus]
  }

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '80vh',
        color: '#8B4513'
      }}>
        <Coffee size={40} className="spin" />
        <span style={{ marginLeft: '1rem', fontSize: '1.2rem' }}>Loading orders...</span>
      </div>
    )
  }

  return (
    <div style={{ 
      padding: '2rem',
      maxWidth: '1400px',
      margin: '0 auto',
      background: 'linear-gradient(135deg, #FFF8DC 0%, #F5DEB3 100%)',
      minHeight: '100vh'
    }}>
      {/* Header */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '2rem',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <div>
          <h1 style={{ 
            color: '#2C1810', 
            fontSize: '2.5rem',
            marginBottom: '0.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <Coffee size={40} />
            Barista Dashboard
          </h1>
          <p style={{ color: '#8B4513', fontSize: '1.1rem' }}>
            {activeTab === 'orders' ? 'Manage and process active orders' : 
             activeTab === 'archive' ? 'View completed order history' : 
             'Create and manage custom recipes'}
          </p>
        </div>

        <div style={{ display: 'flex', gap: '1rem' }}>
          {activeTab === 'orders' && (
            <button
              onClick={fetchOrders}
              disabled={refreshing}
              style={{
                background: '#8B4513',
                color: 'white',
                border: 'none',
                padding: '0.75rem 1.5rem',
                borderRadius: '8px',
                cursor: refreshing ? 'not-allowed' : 'pointer',
                fontSize: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                opacity: refreshing ? 0.6 : 1
              }}
            >
              <RefreshCw size={20} className={refreshing ? 'spin' : ''} />
              Refresh Orders
            </button>
          )}
          {activeTab === 'recipes' && (
            <button
              onClick={() => setShowRecipeModal(true)}
              style={{
                background: '#10b981',
                color: 'white',
                border: 'none',
                padding: '0.75rem 1.5rem',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              <Plus size={20} />
              Create New Recipe
            </button>
          )}
        </div>
      </div>

      {/* Tab Switcher */}
      <div style={{ 
        display: 'flex', 
        gap: '1rem',
        marginBottom: '2rem',
        borderBottom: '2px solid #D2B48C',
        paddingBottom: '0.5rem'
      }}>
        <button
          onClick={() => setActiveTab('orders')}
          style={{
            background: activeTab === 'orders' ? '#8B4513' : 'transparent',
            color: activeTab === 'orders' ? 'white' : '#8B4513',
            border: 'none',
            padding: '1rem 2rem',
            borderRadius: '8px 8px 0 0',
            cursor: 'pointer',
            fontSize: '1.1rem',
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            transition: 'all 0.3s ease'
          }}
        >
          <Package size={20} />
          Active Orders ({activeOrders.length})
        </button>
        <button
          onClick={() => setActiveTab('archive')}
          style={{
            background: activeTab === 'archive' ? '#8B4513' : 'transparent',
            color: activeTab === 'archive' ? 'white' : '#8B4513',
            border: 'none',
            padding: '1rem 2rem',
            borderRadius: '8px 8px 0 0',
            cursor: 'pointer',
            fontSize: '1.1rem',
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            transition: 'all 0.3s ease'
          }}
        >
          <Archive size={20} />
          Archive ({completedOrders.length})
        </button>
        <button
          onClick={() => setActiveTab('recipes')}
          style={{
            background: activeTab === 'recipes' ? '#8B4513' : 'transparent',
            color: activeTab === 'recipes' ? 'white' : '#8B4513',
            border: 'none',
            padding: '1rem 2rem',
            borderRadius: '8px 8px 0 0',
            cursor: 'pointer',
            fontSize: '1.1rem',
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            transition: 'all 0.3s ease'
          }}
        >
          <BookOpen size={20} />
          Custom Recipes ({recipes.length})
        </button>
      </div>

      {/* Orders Tab Content */}
      {activeTab === 'orders' && (
        <>
      {/* Filter Tabs */}
      <div style={{ 
        display: 'flex', 
        gap: '1rem',
        marginBottom: '2rem',
        flexWrap: 'wrap'
      }}>
        {['All', 'Preparing', 'Brewing', 'Ready'].map(status => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            style={{
              background: filter === status ? '#8B4513' : 'white',
              color: filter === status ? 'white' : '#8B4513',
              border: `2px solid ${filter === status ? '#8B4513' : '#D2B48C'}`,
              padding: '0.75rem 1.5rem',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '1rem',
              fontWeight: '600',
              transition: 'all 0.3s ease'
            }}
          >
            {status} ({status === 'All' ? activeOrders.length : activeOrders.filter(o => o.status === status).length})
          </button>
        ))}
      </div>

      {/* Orders Grid */}
      {filteredOrders.length === 0 ? (
        <div style={{
          background: 'white',
          padding: '3rem',
          borderRadius: '15px',
          textAlign: 'center',
          color: '#8B4513'
        }}>
          <Coffee size={60} style={{ opacity: 0.3, marginBottom: '1rem' }} />
          <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>No orders found</h3>
          <p>Orders with status "{filter}" will appear here</p>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))',
          gap: '1.5rem'
        }}>
          {filteredOrders.map(order => {
            const nextStatus = getNextStatus(order.status)
            const items = JSON.parse(order.items)

            return (
              <div
                key={order.id}
                style={{
                  background: 'white',
                  borderRadius: '15px',
                  padding: '1.5rem',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                  border: `3px solid ${getStatusColor(order.status)}`,
                  transition: 'transform 0.3s ease',
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                {/* Order Header */}
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '1rem',
                  paddingBottom: '1rem',
                  borderBottom: '2px solid #F5DEB3'
                }}>
                  <div>
                    <h3 style={{ 
                      color: '#2C1810', 
                      fontSize: '1.3rem',
                      marginBottom: '0.25rem'
                    }}>
                      Order #{order.id}
                    </h3>
                    <p style={{ 
                      color: '#8B4513', 
                      fontSize: '0.9rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}>
                      <Clock size={16} />
                      {new Date(order.created_at).toLocaleString()}
                    </p>
                  </div>
                  <div style={{
                    background: getStatusColor(order.status),
                    color: 'white',
                    padding: '0.5rem 1rem',
                    borderRadius: '20px',
                    fontSize: '0.9rem',
                    fontWeight: 'bold'
                  }}>
                    {order.status}
                  </div>
                </div>

                {/* Customer Info */}
                <div style={{ 
                  background: '#FFF8DC',
                  padding: '1rem',
                  borderRadius: '10px',
                  marginBottom: '1rem'
                }}>
                  <h4 style={{ 
                    color: '#2C1810', 
                    marginBottom: '0.75rem',
                    fontSize: '1.1rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}>
                    <User size={18} />
                    Customer Details
                  </h4>
                  <div style={{ fontSize: '0.95rem', color: '#8B4513' }}>
                    <p style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <User size={16} />
                      <strong>Name:</strong> {order.customer_name}
                    </p>
                    <p style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Mail size={16} />
                      <strong>Email:</strong> {order.customer_email}
                    </p>
                    <p style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Phone size={16} />
                      <strong>Phone:</strong> {order.customer_phone}
                    </p>
                    <p style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <CreditCard size={16} />
                      <strong>Payment:</strong> {order.payment_method}
                    </p>
                  </div>
                </div>

                {/* Order Items */}
                <div style={{ marginBottom: '1rem' }}>
                  <h4 style={{ 
                    color: '#2C1810', 
                    marginBottom: '0.75rem',
                    fontSize: '1.1rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}>
                    <Package size={18} />
                    Order Items
                  </h4>
                  {items.map((item, index) => (
                    <div 
                      key={index}
                      style={{
                        background: '#FFF8DC',
                        padding: '0.75rem',
                        borderRadius: '8px',
                        marginBottom: '0.5rem'
                      }}
                    >
                      <div style={{ 
                        display: 'flex', 
                        justifyContent: 'space-between',
                        marginBottom: '0.5rem'
                      }}>
                        <span style={{ 
                          fontWeight: 'bold', 
                          color: '#2C1810',
                          fontSize: '1rem'
                        }}>
                          {item.emoji} {item.name} x{item.quantity}
                        </span>
                        <span style={{ 
                          color: '#8B4513',
                          fontWeight: 'bold'
                        }}>
                          ${(parseFloat(item.price.replace('$', '')) * item.quantity).toFixed(2)}
                        </span>
                      </div>
                      {item.customizations && (
                        <div style={{ 
                          fontSize: '0.85rem', 
                          color: '#8B4513',
                          paddingLeft: '1.5rem'
                        }}>
                          <p>• Size: {item.customizations.size}</p>
                          <p>• Temp: {item.customizations.temperature}</p>
                          <p>• Milk: {item.customizations.milk}</p>
                          <p>• Sweetness: {item.customizations.sweetness}</p>
                          {item.customizations.extraShot && <p>• Extra Shot ✓</p>}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Total */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '1rem',
                  background: '#8B4513',
                  color: 'white',
                  borderRadius: '10px',
                  marginBottom: '1rem',
                  fontSize: '1.2rem',
                  fontWeight: 'bold'
                }}>
                  <span>Total:</span>
                  <span>${order.total.toFixed(2)}</span>
                </div>

                {/* Action Button */}
                {nextStatus && (
                  <button
                    onClick={() => updateOrderStatus(order.id, nextStatus)}
                    style={{
                      width: '100%',
                      background: getStatusColor(nextStatus),
                      color: 'white',
                      border: 'none',
                      padding: '1rem',
                      borderRadius: '10px',
                      cursor: 'pointer',
                      fontSize: '1.1rem',
                      fontWeight: 'bold',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                  >
                    <CheckCircle size={20} />
                    Mark as {nextStatus}
                  </button>
                )}
                {order.status === 'Completed' && (
                  <div style={{
                    width: '100%',
                    background: '#10b981',
                    color: 'white',
                    padding: '1rem',
                    borderRadius: '10px',
                    textAlign: 'center',
                    fontSize: '1.1rem',
                    fontWeight: 'bold',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem'
                  }}>
                    <CheckCircle size={20} />
                    Order Completed
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
        </>
      )}

      {/* Archive Tab Content */}
      {activeTab === 'archive' && (
        <div>
          {completedOrders.length === 0 ? (
            <div style={{
              background: 'white',
              padding: '3rem',
              borderRadius: '15px',
              textAlign: 'center',
              color: '#8B4513'
            }}>
              <Archive size={60} style={{ opacity: 0.3, marginBottom: '1rem' }} />
              <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>No completed orders yet</h3>
              <p>Completed orders will appear here</p>
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))',
              gap: '1.5rem'
            }}>
              {completedOrders.map(order => {
                const items = JSON.parse(order.items)

                return (
                  <div
                    key={order.id}
                    style={{
                      background: 'white',
                      borderRadius: '15px',
                      padding: '1.5rem',
                      boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                      border: '3px solid #6b7280',
                      opacity: 0.8,
                      transition: 'transform 0.3s ease',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                  >
                    {/* Order Header */}
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '1rem',
                      paddingBottom: '1rem',
                      borderBottom: '2px solid #F5DEB3'
                    }}>
                      <div>
                        <h3 style={{ 
                          color: '#2C1810', 
                          fontSize: '1.3rem',
                          marginBottom: '0.25rem'
                        }}>
                          Order #{order.id}
                        </h3>
                        <p style={{ 
                          color: '#8B4513', 
                          fontSize: '0.9rem',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem'
                        }}>
                          <Clock size={16} />
                          {new Date(order.created_at).toLocaleString()}
                        </p>
                      </div>
                      <div style={{
                        background: '#10b981',
                        color: 'white',
                        padding: '0.5rem 1rem',
                        borderRadius: '20px',
                        fontSize: '0.9rem',
                        fontWeight: 'bold',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                      }}>
                        <CheckCircle size={18} />
                        Completed
                      </div>
                    </div>

                    {/* Customer Info */}
                    <div style={{ 
                      background: '#FFF8DC',
                      padding: '1rem',
                      borderRadius: '10px',
                      marginBottom: '1rem'
                    }}>
                      <h4 style={{ 
                        color: '#2C1810', 
                        marginBottom: '0.75rem',
                        fontSize: '1.1rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                      }}>
                        <User size={18} />
                        Customer Details
                      </h4>
                      <div style={{ fontSize: '0.95rem', color: '#8B4513' }}>
                        <p style={{ marginBottom: '0.5rem' }}>
                          <strong>Name:</strong> {order.customer_name}
                        </p>
                        <p style={{ marginBottom: '0.5rem' }}>
                          <strong>Email:</strong> {order.customer_email}
                        </p>
                        <p>
                          <strong>Payment:</strong> {order.payment_method}
                        </p>
                      </div>
                    </div>

                    {/* Order Items */}
                    <div style={{ marginBottom: '1rem' }}>
                      <h4 style={{ 
                        color: '#2C1810', 
                        marginBottom: '0.75rem',
                        fontSize: '1.1rem'
                      }}>
                        Order Items
                      </h4>
                      {items.map((item, index) => (
                        <div 
                          key={index}
                          style={{
                            background: '#FFF8DC',
                            padding: '0.75rem',
                            borderRadius: '8px',
                            marginBottom: '0.5rem'
                          }}
                        >
                          <div style={{ 
                            display: 'flex', 
                            justifyContent: 'space-between'
                          }}>
                            <span style={{ fontWeight: 'bold', color: '#2C1810' }}>
                              {item.emoji} {item.name} x{item.quantity}
                            </span>
                            <span style={{ color: '#8B4513', fontWeight: 'bold' }}>
                              ${(parseFloat(item.price.replace('$', '')) * item.quantity).toFixed(2)}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Total */}
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '1rem',
                      background: '#6b7280',
                      color: 'white',
                      borderRadius: '10px',
                      fontSize: '1.2rem',
                      fontWeight: 'bold'
                    }}>
                      <span>Total:</span>
                      <span>${order.total.toFixed(2)}</span>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      )}

      {/* Recipes Tab Content */}
      {activeTab === 'recipes' && (
        <div>
          {recipes.length === 0 ? (
            <div style={{
              background: 'white',
              padding: '3rem',
              borderRadius: '15px',
              textAlign: 'center',
              color: '#8B4513'
            }}>
              <BookOpen size={60} style={{ opacity: 0.3, marginBottom: '1rem' }} />
              <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>No custom recipes yet</h3>
              <p>Click "Create New Recipe" to add your first custom brew!</p>
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
              gap: '1.5rem'
            }}>
              {recipes.map(recipe => {
                const ingredients = JSON.parse(recipe.ingredients)
                return (
                  <div
                    key={recipe.id}
                    style={{
                      background: 'white',
                      borderRadius: '15px',
                      padding: '1.5rem',
                      boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                      border: '3px solid #8B4513',
                      transition: 'transform 0.3s ease',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
                      <div>
                        <h3 style={{ color: '#2C1810', fontSize: '1.5rem', marginBottom: '0.5rem' }}>
                          ☕ {recipe.name}
                        </h3>
                        <p style={{ color: '#8B4513', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                          Base: {recipe.base_drink}
                        </p>
                        <span style={{
                          background: '#F5DEB3',
                          color: '#8B4513',
                          padding: '0.25rem 0.75rem',
                          borderRadius: '15px',
                          fontSize: '0.85rem',
                          fontWeight: 'bold'
                        }}>
                          {recipe.category}
                        </span>
                      </div>
                      <button
                        onClick={() => deleteRecipe(recipe.id)}
                        style={{
                          background: '#ef4444',
                          color: 'white',
                          border: 'none',
                          padding: '0.5rem',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center'
                        }}
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>

                    {recipe.description && (
                      <p style={{ color: '#8B4513', marginBottom: '1rem', fontStyle: 'italic' }}>
                        {recipe.description}
                      </p>
                    )}

                    <div style={{ marginBottom: '1rem' }}>
                      <h4 style={{ color: '#2C1810', marginBottom: '0.5rem', fontSize: '1.1rem' }}>
                        Ingredients:
                      </h4>
                      <ul style={{ paddingLeft: '1.5rem', color: '#8B4513' }}>
                        {ingredients.map((ingredient, index) => (
                          <li key={index} style={{ marginBottom: '0.25rem' }}>{ingredient}</li>
                        ))}
                      </ul>
                    </div>

                    {recipe.instructions && (
                      <div style={{ marginBottom: '1rem' }}>
                        <h4 style={{ color: '#2C1810', marginBottom: '0.5rem', fontSize: '1.1rem' }}>
                          Instructions:
                        </h4>
                        <p style={{ color: '#8B4513', fontSize: '0.95rem', lineHeight: '1.5' }}>
                          {recipe.instructions}
                        </p>
                      </div>
                    )}

                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '1rem',
                      background: '#8B4513',
                      color: 'white',
                      borderRadius: '10px',
                      fontSize: '1.2rem',
                      fontWeight: 'bold'
                    }}>
                      <span>Price:</span>
                      <span>${parseFloat(recipe.price).toFixed(2)}</span>
                    </div>

                    <p style={{ color: '#8B4513', fontSize: '0.85rem', marginTop: '0.75rem', textAlign: 'center' }}>
                      Created by {recipe.created_by} • {new Date(recipe.created_at).toLocaleDateString()}
                    </p>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      )}

      {/* Create Recipe Modal */}
      {showRecipeModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.7)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000,
          padding: '2rem'
        }}>
          <div style={{
            background: 'white',
            borderRadius: '15px',
            padding: '2rem',
            maxWidth: '600px',
            width: '100%',
            maxHeight: '90vh',
            overflowY: 'auto'
          }}>
            <h2 style={{ color: '#2C1810', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Plus size={28} />
              Create Custom Recipe
            </h2>

            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', color: '#8B4513', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                Recipe Name *
              </label>
              <input
                type="text"
                value={newRecipe.name}
                onChange={(e) => setNewRecipe({...newRecipe, name: e.target.value})}
                placeholder="e.g., Caramel Cloud Latte"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '8px',
                  border: '2px solid #D2B48C',
                  fontSize: '1rem'
                }}
              />
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', color: '#8B4513', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                Description
              </label>
              <textarea
                value={newRecipe.description}
                onChange={(e) => setNewRecipe({...newRecipe, description: e.target.value})}
                placeholder="Brief description of your creation..."
                rows={3}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '8px',
                  border: '2px solid #D2B48C',
                  fontSize: '1rem',
                  resize: 'vertical'
                }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
              <div>
                <label style={{ display: 'block', color: '#8B4513', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                  Base Drink *
                </label>
                <select
                  value={newRecipe.baseDrink}
                  onChange={(e) => setNewRecipe({...newRecipe, baseDrink: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    borderRadius: '8px',
                    border: '2px solid #D2B48C',
                    fontSize: '1rem'
                  }}
                >
                  <option>Espresso</option>
                  <option>Latte</option>
                  <option>Cappuccino</option>
                  <option>Americano</option>
                  <option>Cold Brew</option>
                  <option>Mocha</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', color: '#8B4513', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                  Category
                </label>
                <select
                  value={newRecipe.category}
                  onChange={(e) => setNewRecipe({...newRecipe, category: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    borderRadius: '8px',
                    border: '2px solid #D2B48C',
                    fontSize: '1rem'
                  }}
                >
                  <option>Coffee</option>
                  <option>Tea</option>
                  <option>Chocolate</option>
                  <option>Specialty</option>
                </select>
              </div>
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', color: '#8B4513', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                Ingredients * (at least 1)
              </label>
              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <input
                  type="text"
                  value={currentIngredient}
                  onChange={(e) => setCurrentIngredient(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addIngredient()}
                  placeholder="Add ingredient..."
                  style={{
                    flex: 1,
                    padding: '0.75rem',
                    borderRadius: '8px',
                    border: '2px solid #D2B48C',
                    fontSize: '1rem'
                  }}
                />
                <button
                  onClick={addIngredient}
                  style={{
                    background: '#10b981',
                    color: 'white',
                    border: 'none',
                    padding: '0.75rem 1rem',
                    borderRadius: '8px',
                    cursor: 'pointer'
                  }}
                >
                  <Plus size={20} />
                </button>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {newRecipe.ingredients.map((ingredient, index) => (
                  <span
                    key={index}
                    style={{
                      background: '#F5DEB3',
                      color: '#8B4513',
                      padding: '0.5rem 1rem',
                      borderRadius: '20px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}
                  >
                    {ingredient}
                    <button
                      onClick={() => removeIngredient(index)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#8B4513',
                        cursor: 'pointer',
                        padding: 0,
                        display: 'flex'
                      }}
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', color: '#8B4513', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                Instructions
              </label>
              <textarea
                value={newRecipe.instructions}
                onChange={(e) => setNewRecipe({...newRecipe, instructions: e.target.value})}
                placeholder="How to make this drink..."
                rows={4}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '8px',
                  border: '2px solid #D2B48C',
                  fontSize: '1rem',
                  resize: 'vertical'
                }}
              />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', color: '#8B4513', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                Price ($) *
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={newRecipe.price}
                onChange={(e) => setNewRecipe({...newRecipe, price: e.target.value})}
                placeholder="0.00"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '8px',
                  border: '2px solid #D2B48C',
                  fontSize: '1rem'
                }}
              />
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <button
                onClick={createRecipe}
                style={{
                  flex: 1,
                  background: '#10b981',
                  color: 'white',
                  border: 'none',
                  padding: '1rem',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  fontSize: '1.1rem',
                  fontWeight: 'bold'
                }}
              >
                Create Recipe
              </button>
              <button
                onClick={() => setShowRecipeModal(false)}
                style={{
                  flex: 1,
                  background: '#6b7280',
                  color: 'white',
                  border: 'none',
                  padding: '1rem',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  fontSize: '1.1rem',
                  fontWeight: 'bold'
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default BaristaDashboard
