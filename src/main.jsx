import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { KindeProvider } from '@kinde-oss/kinde-auth-react'

createRoot(document.getElementById('root')).render(
  <StrictMode>
		<App />
  </StrictMode>,
)
