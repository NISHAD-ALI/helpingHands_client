import { GoogleOAuthProvider } from '@react-oauth/google';
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Provider } from 'react-redux'
import Store from './Redux/Store.ts'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={Store}>
    <React.StrictMode>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_CLIENT_ID}>
        <App />
      </GoogleOAuthProvider>
    </React.StrictMode>
  </Provider>
)
