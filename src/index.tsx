import React from 'react';
import App from './App';
import { createRoot } from 'react-dom/client';

const container = document.getElementById('root');

// `container`가 null일 가능성을 처리
if (!container) {
  throw new Error('Root container missing in index.html');
}

const root = createRoot(container);
root.render(<App />);

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then(
        (registration) => {
          console.log(
            'Service Worker registered:',
            registration
          );
        },
        (error) => {
          console.error(
            'Service Worker registration failed:',
            error
          );
        }
      );
  });
}
