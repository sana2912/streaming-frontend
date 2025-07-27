import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { TrackProvide } from './context/track_context.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <TrackProvide>
        <App />
      </TrackProvide>
    </BrowserRouter>
  </StrictMode>,
)
