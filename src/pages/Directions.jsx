import React from 'react'
import { MapPin, Car, Bus, Navigation } from 'lucide-react'

const Directions = () => {
  return (
    <div className="page">
      <div className="page-container">
        <h1 className="page-title">Directions</h1>
        
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ 
            background: 'rgba(101, 67, 33, 0.1)', 
            padding: '2rem', 
            borderRadius: '15px',
            marginBottom: '2rem',
            textAlign: 'center'
          }}>
            <div style={{ marginBottom: '1rem' }}>
              <MapPin size={64} color="#654321" style={{ display: 'inline-block' }} />
            </div>
            <h2 style={{ color: '#2C1810', marginBottom: '1rem', fontWeight: 'bold' }}>Find Us</h2>
            <p style={{ color: '#2C1810', fontSize: '1.2rem', marginBottom: '1rem', fontWeight: '500' }}>
              <strong>123 Coffee Street, Bean City, BC 12345</strong>
            </p>
            <p style={{ color: '#2C1810', fontSize: '1rem', fontWeight: '500' }}>
              Located in the heart of downtown, just two blocks from Central Park
            </p>
          </div>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
            gap: '2rem'
          }}>
            <div style={{ 
              background: 'rgba(101, 67, 33, 0.8)', 
              padding: '2rem', 
              borderRadius: '15px',
              border: '2px solid #8B4513',
              color: '#F5DEB3'
            }}>
              <h3 style={{ marginBottom: '1rem', color: '#F5DEB3', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Car size={24} />
                By Car
              </h3>
              <p style={{ marginBottom: '1rem' }}>
                Take Highway 101 to Exit 15 (Downtown). Turn left on Main Street, 
                then right on Coffee Street. We're on the left side.
              </p>
              <p><strong>Parking:</strong> Free street parking and paid garage across the street.</p>
            </div>
            
            <div style={{ 
              background: 'rgba(101, 67, 33, 0.8)', 
              padding: '2rem', 
              borderRadius: '15px',
              border: '2px solid #8B4513',
              color: '#F5DEB3'
            }}>
              <h3 style={{ marginBottom: '1rem', color: '#F5DEB3', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Bus size={24} />
                Public Transit
              </h3>
              <p style={{ marginBottom: '1rem' }}>
                Take Bus Route 42 or 56 to the "Downtown Central" stop. 
                We're just a 2-minute walk from the bus stop.
              </p>
              <p><strong>Metro:</strong> Blue Line to Downtown Station (5-minute walk)</p>
            </div>
            
            <div style={{ 
              background: 'rgba(101, 67, 33, 0.8)', 
              padding: '2rem', 
              borderRadius: '15px',
              border: '2px solid #8B4513',
              color: '#F5DEB3'
            }}>
              <h3 style={{ marginBottom: '1rem', color: '#F5DEB3', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Navigation size={24} />
                Walking
              </h3>
              <p style={{ marginBottom: '1rem' }}>
                From Central Park: Head east on Park Avenue, turn right on Coffee Street. 
                We're in the brown building with the coffee sign.
              </p>
              <p><strong>Landmarks:</strong> Next to BookWorld, across from City Bank</p>
            </div>
          </div>
          
          <div style={{ 
            background: 'rgba(101, 67, 33, 0.1)', 
            padding: '2rem', 
            borderRadius: '15px',
            marginTop: '2rem',
            textAlign: 'center'
          }}>
            <h3 style={{ color: '#2C1810', marginBottom: '1rem', fontWeight: 'bold' }}>Need Help Finding Us?</h3>
            <p style={{ color: '#2C1810', marginBottom: '1rem', fontWeight: '500' }}>
              Call us at <strong>(555) 123-CAFE</strong> and we'll guide you here!
            </p>
            <p style={{ color: '#2C1810', fontWeight: '500' }}>
              Look for our signature coffee cup sign and the aroma of freshly brewed coffee ☕
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Directions
