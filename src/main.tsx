import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ClerkProvider } from '@clerk/clerk-react'

// Import your Publishable Key
const PUBLISHABLEKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLEKey) {
  throw new Error("Missing Publishable Key")
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLEKey} afterSignOutUrl="/">
      <App />
    </ClerkProvider>
  </React.StrictMode>,
)