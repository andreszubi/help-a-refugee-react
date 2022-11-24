import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { MantineProvider} from '@mantine/core';
import { BrowserRouter as Router } from 'react-router-dom'
import SessionContextProvider from './contexts/SessionContext';



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MantineProvider>
      <SessionContextProvider>
      <Router>
    <App />
    </Router>
    </SessionContextProvider>
    </MantineProvider>
  </React.StrictMode>
)
