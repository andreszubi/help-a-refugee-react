import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { MantineProvider} from '@mantine/core';
import { BrowserRouter as Router } from 'react-router-dom'
import SessionContextHostProvider from './contexts/SessionContextHost';
import SessionContextUserProvider from './contexts/SessionContextUser';



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MantineProvider>
      <SessionContextHostProvider>
        <SessionContextUserProvider>
      <Router>
    <App />
    </Router>
    </SessionContextUserProvider>
    </SessionContextHostProvider>
    </MantineProvider>
  </React.StrictMode>
)
