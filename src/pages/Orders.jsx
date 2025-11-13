import React, { useState, useEffect } from 'react'
import { Clock, CheckCircle, Package, Truck } from 'lucide-react'

const Orders = () => {
  const [orders, setOrders] = useState([])

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem('orders') || '[]')
    setOrders(savedOrders.reverse()) // Show newest first
  }, [])

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Preparing':
        return <Clock size={24} color="#f59e0b" />
      case 'Brewing':
        return <Package size={24} color="#3b82f6" />
      case 'Ready':
        return <Truck size={24} color="#10b981" />
      case 'Completed':
        return <CheckCircle size={24} color="#10b981" />
      default:
        return <Clock size={24} />
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'Preparing':
        return '#f59e0b'
      case 'Brewing':
        return '#3b82f6'
      case 'Ready':
        return '#10b981'
      case 'Completed':
        return '#10b981'
      default:
        return '#666'
    }
  }

  if (orders.length === 0) {
    return (
      <div className="page">
        <div className="page-container">
          <h1 className="page-title">My Orders</h1>
          <div style={{ textAlign: 'center', padding: '4rem 2rem' }}>
            <Package size={64} color="#CCC" style={{ marginBottom: '1rem' }} />
            <p style={{ color: '#666', fontSize: '1.1rem' }}>
              You haven't placed any orders yet
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="page">
      <div className="page-container">
        <h1 className="page-title">My Orders</h1>

        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          {orders.map((order) => (
            <div
              key={order.id}
              style={{
                background: 'rgba(255, 255, 255, 0.9)',
                padding: '2rem',
                borderRadius: '15px',
                marginBottom: '2rem',
                border: '2px solid #8B4513',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
              }}
            >
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '1.5rem',
                paddingBottom: '1rem',
                borderBottom: '2px solid #E5E5E5'
              }}>
                <div>
                  <h3 style={{ color: '#2C1810', marginBottom: '0.5rem' }}>
                    Order #{order.id}
                  </h3>
                  <p style={{ color: '#666', fontSize: '0.9rem' }}>
                    {new Date(order.date).toLocaleDateString()} at{' '}
                    {new Date(order.date).toLocaleTimeString()}
                  </p>
                </div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.5rem 1rem',
                  background: `${getStatusColor(order.status)}20`,
                  borderRadius: '25px',
                  border: `2px solid ${getStatusColor(order.status)}`
                }}>
                  {getStatusIcon(order.status)}
                  <span style={{
                    color: getStatusColor(order.status),
                    fontWeight: 'bold'
                  }}>
                    {order.status}
                  </span>
                </div>
              </div>

              {/* Order Items */}
              <div style={{ marginBottom: '1rem' }}>
                {order.items.map((item, index) => (
                  <div
                    key={index}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      padding: '0.75rem 0',
                      borderBottom: index < order.items.length - 1 ? '1px solid #E5E5E5' : 'none'
                    }}
                  >
                    <div>
                      <div style={{ color: '#2C1810', fontWeight: '500' }}>
                        {item.name} x{item.quantity}
                      </div>
                      {item.customizations && (
                        <div style={{ fontSize: '0.85rem', color: '#666', marginTop: '0.25rem' }}>
                          {item.customizations.size} | {item.customizations.temperature} |{' '}
                          {item.customizations.milk}
                          {item.customizations.extraShot && ' | Extra Shot'}
                        </div>
                      )}
                    </div>
                    <div style={{ color: '#654321', fontWeight: 'bold' }}>
                      ${(parseFloat(item.finalPrice.replace('$', '')) * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Total */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                paddingTop: '1rem',
                borderTop: '2px solid #8B4513',
                fontSize: '1.2rem',
                fontWeight: 'bold',
                color: '#2C1810'
              }}>
                <span>Total:</span>
                <span>${order.total.toFixed(2)}</span>
              </div>

              {/* Order Status Timeline */}
              <div style={{
                marginTop: '1.5rem',
                padding: '1rem',
                background: '#F5F5F5',
                borderRadius: '10px'
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  {['Preparing', 'Brewing', 'Ready', 'Completed'].map((status, index) => (
                    <div
                      key={status}
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        flex: 1,
                        position: 'relative'
                      }}
                    >
                      <div style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        background: order.status === status ? getStatusColor(status) : '#E5E5E5',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '0.5rem',
                        zIndex: 1
                      }}>
                        {order.status === status ? (
                          <CheckCircle size={20} color="white" />
                        ) : (
                          <div style={{
                            width: '12px',
                            height: '12px',
                            borderRadius: '50%',
                            background: 'white'
                          }} />
                        )}
                      </div>
                      <span style={{
                        fontSize: '0.75rem',
                        color: order.status === status ? '#2C1810' : '#999',
                        fontWeight: order.status === status ? 'bold' : 'normal'
                      }}>
                        {status}
                      </span>
                      {index < 3 && (
                        <div style={{
                          position: 'absolute',
                          top: '20px',
                          left: '50%',
                          width: '100%',
                          height: '2px',
                          background: '#E5E5E5',
                          zIndex: 0
                        }} />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Orders
