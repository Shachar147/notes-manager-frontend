import React from 'react';
import ReactDOM from 'react-dom/client';
import { configure } from 'mobx';
import App from './App';
import './index.css';

// Configure MobX to enforce actions
configure({
  enforceActions: 'always',
  computedRequiresReaction: true,
  reactionRequiresObservable: true,
  observableRequiresReaction: true,
  disableErrorBoundaries: false
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);