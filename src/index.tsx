import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider } from "./context/ThemeContext.tsx";

import { UserProvider } from "./context/UserContext.tsx";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>

    <ThemeProvider>

      <UserProvider>
        <App />
      </UserProvider>

    </ThemeProvider>

  </React.StrictMode>
);

reportWebVitals();