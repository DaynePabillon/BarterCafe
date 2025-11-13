// Request notification permission
export const requestNotificationPermission = async () => {
  if (!('Notification' in window)) {
    console.log('This browser does not support notifications')
    return false
  }

  if (Notification.permission === 'granted') {
    return true
  }

  if (Notification.permission !== 'denied') {
    const permission = await Notification.requestPermission()
    return permission === 'granted'
  }

  return false
}

// Send browser notification
export const sendNotification = (title, options = {}) => {
  if (Notification.permission === 'granted') {
    const notification = new Notification(title, {
      icon: '/coffee-icon.png',
      badge: '/coffee-badge.png',
      ...options
    })

    notification.onclick = () => {
      window.focus()
      notification.close()
    }

    return notification
  }
}

// Order status notifications
export const notifyOrderStatus = (status, orderNumber) => {
  const messages = {
    Preparing: {
      title: '☕ Order Received!',
      body: `Order #${orderNumber} is being prepared. We'll notify you when it's ready!`
    },
    Brewing: {
      title: '🔥 Brewing Your Coffee!',
      body: `Order #${orderNumber} is now brewing. Almost ready!`
    },
    Ready: {
      title: '✅ Order Ready!',
      body: `Order #${orderNumber} is ready for pickup! Come get your delicious coffee!`
    },
    Completed: {
      title: '🎉 Order Completed!',
      body: `Thank you for your order! Enjoy your coffee!`
    }
  }

  const message = messages[status]
  if (message) {
    sendNotification(message.title, {
      body: message.body,
      tag: `order-${orderNumber}`,
      requireInteraction: status === 'Ready'
    })
  }
}

// Special offer notifications
export const notifySpecialOffer = (offer) => {
  sendNotification('🎁 Special Offer!', {
    body: offer,
    tag: 'special-offer',
    requireInteraction: false
  })
}

// Loyalty points notification
export const notifyPointsEarned = (points) => {
  sendNotification('🏆 Points Earned!', {
    body: `You earned ${points} loyalty points! Keep ordering to unlock rewards!`,
    tag: 'loyalty-points'
  })
}

// New review notification
export const notifyNewReview = (drinkName) => {
  sendNotification('⭐ Thank You!', {
    body: `Your review for ${drinkName} has been submitted!`,
    tag: 'review-submitted'
  })
}
