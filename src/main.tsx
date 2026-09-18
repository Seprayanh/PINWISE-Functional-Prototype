import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './styles/design-tokens.css'
import './index.css'
import './v3-overrides.css'
import './v3_1-overrides.css'
import './styles/image-enhancement-v4.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode><App /></StrictMode>,
)
