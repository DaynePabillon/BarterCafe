import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { CheckCircle, XCircle, Info, AlertCircle } from 'lucide-react'

const Toast = ({ message, type, onClose, duration }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose()
    }, duration)

    return () => clearTimeout(timer)
  }, [duration, onClose])

  const icons = {
    success: <CheckCircle size={20} />,
    error: <XCircle size={20} />,
    info: <Info size={20} />,
    warning: <AlertCircle size={20} />
  }

  const colors = {
    success: '#10b981',
    error: '#ef4444',
    info: '#3b82f6',
    warning: '#f59e0b'
  }

  return (
    <div
      style={{
        position: 'fixed',
        top: '100px',
        right: '20px',
        background: 'white',
        padding: '1rem 1.5rem',
        borderRadius: '10px',
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        zIndex: 10000,
        animation: 'slideIn 0.3s ease-out',
        minWidth: '300px',
        border: `2px solid ${colors[type]}`
      }}
    >
      <div style={{ color: colors[type], display: 'flex', alignItems: 'center' }}>
        {icons[type]}
      </div>
      <span style={{ color: '#2C1810', fontWeight: '500', flex: 1 }}>
        {message}
      </span>
      <button
        onClick={onClose}
        style={{
          background: 'none',
          border: 'none',
          color: '#666',
          cursor: 'pointer',
          fontSize: '1.2rem',
          padding: '0',
          lineHeight: '1'
        }}
      >
        ×
      </button>
      <style>{`
        @keyframes slideIn {
          from {
            transform: translateX(400px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  )
}

Toast.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['success', 'error', 'info', 'warning']),
  onClose: PropTypes.func.isRequired,
  duration: PropTypes.number
}

Toast.defaultProps = {
  type: 'success',
  duration: 3000
}

export default Toast
