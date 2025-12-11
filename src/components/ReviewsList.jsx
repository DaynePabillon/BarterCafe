import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Star, ThumbsUp, User } from 'lucide-react'

const ReviewsList = ({ drinkId, reviews }) => {
  const [helpfulVotes, setHelpfulVotes] = useState({})

  const drinkReviews = reviews.filter(r => r.drinkId === drinkId)

  const handleHelpful = (reviewIndex) => {
    setHelpfulVotes(prev => ({
      ...prev,
      [reviewIndex]: (prev[reviewIndex] || 0) + 1
    }))
  }

  if (drinkReviews.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem', color: '#F5DEB3' }}>
        <p>No reviews yet. Be the first to review this drink!</p>
      </div>
    )
  }

  return (
    <div style={{ marginTop: '2rem' }}>
      <h3 style={{ color: '#F5DEB3', marginBottom: '1.5rem', fontSize: '1.3rem' }}>
        Customer Reviews ({drinkReviews.length})
      </h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {drinkReviews.map((review, index) => (
          <div
            key={index}
            style={{
              background: 'rgba(245, 222, 179, 0.1)',
              padding: '1.5rem',
              borderRadius: '10px',
              border: '1px solid #8B4513'
            }}
          >
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: '#8B4513',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <User size={20} color="#F5DEB3" />
                </div>
                <div>
                  <div style={{ color: '#F5DEB3', fontWeight: 'bold' }}>{review.reviewer}</div>
                  <div style={{ color: 'rgba(245, 222, 179, 0.6)', fontSize: '0.85rem' }}>
                    {new Date(review.date).toLocaleDateString()}
                  </div>
                </div>
              </div>

              {/* Rating */}
              <div style={{ display: 'flex', gap: '0.25rem' }}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={16}
                    fill={star <= review.rating ? '#f59e0b' : 'none'}
                    color={star <= review.rating ? '#f59e0b' : '#8B4513'}
                  />
                ))}
              </div>
            </div>

            {/* Review Text */}
            <p style={{ color: '#F5DEB3', lineHeight: '1.6', marginBottom: '1rem' }}>
              {review.text}
            </p>

            {/* Photo */}
            {review.photo && (
              <div style={{ marginBottom: '1rem' }}>
                <img
                  src={review.photo}
                  alt="Review"
                  style={{
                    maxWidth: '200px',
                    borderRadius: '10px',
                    border: '2px solid #8B4513'
                  }}
                />
              </div>
            )}

            {/* Helpful Button */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <button
                onClick={() => handleHelpful(index)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.5rem 1rem',
                  background: 'rgba(245, 222, 179, 0.1)',
                  border: '1px solid #8B4513',
                  borderRadius: '20px',
                  color: '#F5DEB3',
                  cursor: 'pointer',
                  fontSize: '0.85rem',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={(e) => {
                  e.target.style.background = 'rgba(245, 222, 179, 0.2)'
                  e.target.style.borderColor = '#F5DEB3'
                }}
                onMouseOut={(e) => {
                  e.target.style.background = 'rgba(245, 222, 179, 0.1)'
                  e.target.style.borderColor = '#8B4513'
                }}
              >
                <ThumbsUp size={14} />
                Helpful ({(helpfulVotes[index] || 0) + (review.helpful || 0)})
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

ReviewsList.propTypes = {
  drinkId: PropTypes.number.isRequired,
  reviews: PropTypes.arrayOf(PropTypes.shape({
    drinkId: PropTypes.number.isRequired,
    drinkName: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    reviewer: PropTypes.string.isRequired,
    photo: PropTypes.string,
    date: PropTypes.string.isRequired,
    helpful: PropTypes.number
  })).isRequired
}

export default ReviewsList
