import React, { useState } from 'react'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    alert('Thank you for your message! We\'ll get back to you soon.')
    setFormData({ name: '', email: '', subject: '', message: '' })
  }

  return (
    <div className="page">
      <div className="page-container">
        <h1 className="page-title">Contact Us</h1>
        
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
            gap: '2rem',
            marginBottom: '3rem'
          }}>
            <div style={{ 
              background: 'rgba(101, 67, 33, 0.8)', 
              padding: '2rem', 
              borderRadius: '15px',
              border: '2px solid #8B4513',
              color: '#F5DEB3'
            }}>
              <h3 style={{ marginBottom: '1rem', color: '#F5DEB3' }}>Get in Touch</h3>
              <div style={{ marginBottom: '1rem', display: 'flex', alignItems: 'start', gap: '0.5rem' }}>
                <MapPin size={20} />
                <div>
                  <strong>Address:</strong><br />
                123 Coffee Street<br />
                Bean City, BC 12345
                </div>
              </div>
              <div style={{ marginBottom: '1rem', display: 'flex', alignItems: 'start', gap: '0.5rem' }}>
                <Phone size={20} />
                <div>
                  <strong>Phone:</strong><br />
                (555) 123-CAFE
                </div>
              </div>
              <div style={{ marginBottom: '1rem', display: 'flex', alignItems: 'start', gap: '0.5rem' }}>
                <Mail size={20} />
                <div>
                  <strong>Email:</strong><br />
                hello@bartercafe.com
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'start', gap: '0.5rem' }}>
                <Clock size={20} />
                <div>
                  <strong>Hours:</strong><br />
                Mon-Fri: 6:00 AM - 9:00 PM<br />
                Sat-Sun: 7:00 AM - 10:00 PM<br />
                </div>
              </div>
            </div>
            
            <div style={{ 
              background: 'rgba(101, 67, 33, 0.8)', 
              padding: '2rem', 
              borderRadius: '15px',
              border: '2px solid #8B4513'
            }}>
              <h3 style={{ marginBottom: '1rem', color: '#F5DEB3' }}>Send us a Message</h3>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Your email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="subject">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    placeholder="Message subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    placeholder="Your message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows="4"
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid #8B4513',
                      borderRadius: '5px',
                      background: 'rgba(245, 222, 179, 0.1)',
                      color: '#F5DEB3',
                      fontSize: '1rem',
                      resize: 'vertical'
                    }}
                    required
                  />
                </div>
                
                <button type="submit" className="submit-btn">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
