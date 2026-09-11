import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'
import './v3-overrides.css'
import './v3_1-overrides.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode><App /></StrictMode>,
)
