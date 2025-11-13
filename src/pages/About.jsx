import React from 'react'
import { Coffee, Heart, Award } from 'lucide-react'

const About = () => {
  return (
    <div className="page">
      <div className="page-container">
        <h1 className="page-title">About BarterCafe</h1>
        
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ marginBottom: '2rem' }}>
            <Coffee size={80} color="#654321" style={{ display: 'inline-block' }} />
          </div>
          
          <div style={{ 
            background: 'rgba(255, 255, 255, 0.9)', 
            padding: '2.5rem', 
            borderRadius: '15px',
            marginBottom: '2rem',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            border: '2px solid #8B4513'
          }}>
            <h2 style={{ color: '#2C1810', marginBottom: '1.5rem', fontSize: '2rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
              <Heart size={28} color="#8B4513" />
              Our Story
            </h2>
            <p style={{ color: '#2C1810', fontSize: '1.15rem', lineHeight: '1.9', marginBottom: '1.5rem', fontWeight: '500' }}>
              BarterCafe was born from a passion for exceptional coffee and community connection. 
              We believe that every cup tells a story, and every visit should be an experience to remember.
            </p>
            <p style={{ color: '#2C1810', fontSize: '1.15rem', lineHeight: '1.9', fontWeight: '500' }}>
              Our carefully curated selection of premium coffee beans, sourced from the finest 
              coffee-growing regions around the world, ensures that every sip delivers the perfect 
              balance of flavor, aroma, and satisfaction.
            </p>
          </div>
          
          <div style={{ 
            background: 'rgba(255, 255, 255, 0.9)', 
            padding: '2.5rem', 
            borderRadius: '15px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            border: '2px solid #8B4513'
          }}>
            <h2 style={{ color: '#2C1810', marginBottom: '1.5rem', fontSize: '2rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
              <Award size={28} color="#8B4513" />
              Our Mission
            </h2>
            <p style={{ color: '#2C1810', fontSize: '1.15rem', lineHeight: '1.9', fontWeight: '500' }}>
              To create a welcoming space where coffee lovers can discover new flavors, 
              connect with friends, and enjoy moments of pure coffee bliss. We're committed 
              to sustainability, quality, and bringing you the finest coffee experience possible.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
