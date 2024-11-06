import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import { WhislistProvider } from './contexts/whislistContext';

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <CartProvider>
        <WhislistProvider>
          <App />
        </WhislistProvider>
      </CartProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
