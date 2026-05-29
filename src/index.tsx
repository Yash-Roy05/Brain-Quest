import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import reportWebVitals from './reportWebVitals';

import { UserProvider } from "./context/UserContext.tsx";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>

    <UserProvider>
      <App />
    </UserProvider>

  </React.StrictMode>
);

reportWebVitals();