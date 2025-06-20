import React from 'react';
import ReactDOM from 'react-dom/client';
import { configure } from 'mobx';
import App from './app.tsx';
import './index.css';
import './config/axios';
import { GoogleOAuthProvider } from '@react-oauth/google';

// Configure MobX to enforce actions
configure({
  enforceActions: 'always',
  computedRequiresReaction: true,
  reactionRequiresObservable: true,
  observableRequiresReaction: true,
  disableErrorBoundaries: false,
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID!}>
      <App />
    </GoogleOAuthProvider>
  </React.StrictMode>
);
