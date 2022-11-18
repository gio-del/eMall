import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <div className="text-gray-900 bg-white dark:bg-dark-secondary">
      <App />
    </div>
  </React.StrictMode>,
)
