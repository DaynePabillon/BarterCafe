import React, { useState } from 'react'
import { X, Star, Upload, User } from 'lucide-react'

const ReviewsModal = ({ drink, onClose, onSubmitReview }) => {
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [reviewText, setReviewText] = useState('')
  const [reviewerName, setReviewerName] = useState('')
  const [photo, setPhoto] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    
    const review = {
      drinkId: drink.id,
      drinkName: drink.name,
      rating,
      text: reviewText,
      reviewer: reviewerName,
      photo: photo,
      date: new Date().toISOString(),
      helpful: 0
    }

    onSubmitReview(review)
    onClose()
  }

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPhoto(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal-content" style={{ maxWidth: '600px' }}>
        <button className="modal-close" onClick={onClose}>×</button>
        
        <h2 className="modal-title">Review {drink.name}</h2>

        <form onSubmit={handleSubmit}>
          {/* Star Rating */}
          <div style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
            <label style={{ display: 'block', color: '#F5DEB3', marginBottom: '1rem', fontSize: '1.1rem' }}>
              Your Rating
            </label>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem' }}>
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={40}
                  fill={star <= (hoverRating || rating) ? '#f59e0b' : 'none'}
                  color={star <= (hoverRating || rating) ? '#f59e0b' : '#8B4513'}
                  style={{ cursor: 'pointer', transition: 'all 0.2s ease' }}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                />
              ))}
            </div>
            {rating > 0 && (
              <p style={{ color: '#F5DEB3', marginTop: '0.5rem' }}>
                {rating === 5 ? 'Excellent!' : rating === 4 ? 'Great!' : rating === 3 ? 'Good' : rating === 2 ? 'Fair' : 'Poor'}
              </p>
            )}
          </div>

          {/* Reviewer Name */}
          <div className="form-group">
            <label htmlFor="reviewerName" style={{ color: '#F5DEB3' }}>Your Name</label>
            <input
              type="text"
              id="reviewerName"
              value={reviewerName}
              onChange={(e) => setReviewerName(e.target.value)}
              placeholder="Enter your name"
              required
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #8B4513',
                borderRadius: '5px',
                background: 'rgba(245, 222, 179, 0.1)',
                color: '#F5DEB3'
              }}
            />
          </div>

          {/* Review Text */}
          <div className="form-group">
            <label htmlFor="reviewText" style={{ color: '#F5DEB3' }}>Your Review</label>
            <textarea
              id="reviewText"
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="Share your experience with this drink..."
              rows="4"
              required
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #8B4513',
                borderRadius: '5px',
                background: 'rgba(245, 222, 179, 0.1)',
                color: '#F5DEB3',
                resize: 'vertical'
              }}
            />
          </div>

          {/* Photo Upload */}
          <div className="form-group">
            <label style={{ color: '#F5DEB3', marginBottom: '0.5rem', display: 'block' }}>
              Add Photo (Optional)
            </label>
            <div style={{
              border: '2px dashed #8B4513',
              borderRadius: '10px',
              padding: '2rem',
              textAlign: 'center',
              cursor: 'pointer',
              background: 'rgba(245, 222, 179, 0.05)'
            }}>
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                style={{ display: 'none' }}
                id="photoUpload"
              />
              <label htmlFor="photoUpload" style={{ cursor: 'pointer' }}>
                {photo ? (
                  <div>
                    <img src={photo} alt="Review" style={{ maxWidth: '200px', borderRadius: '10px', marginBottom: '1rem' }} />
                    <p style={{ color: '#F5DEB3', fontSize: '0.9rem' }}>Click to change photo</p>
                  </div>
                ) : (
                  <div>
                    <Upload size={40} color="#8B4513" style={{ marginBottom: '0.5rem' }} />
                    <p style={{ color: '#F5DEB3' }}>Click to upload a photo</p>
                    <p style={{ color: 'rgba(245, 222, 179, 0.6)', fontSize: '0.85rem' }}>JPG, PNG up to 5MB</p>
                  </div>
                )}
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="submit-btn"
            disabled={rating === 0}
            style={{
              opacity: rating === 0 ? 0.5 : 1,
              cursor: rating === 0 ? 'not-allowed' : 'pointer'
            }}
          >
            Submit Review
          </button>
        </form>
      </div>
    </div>
  )
}

export default ReviewsModal
