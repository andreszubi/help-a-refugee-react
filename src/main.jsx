import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { MantineProvider} from '@mantine/core';
import { BrowserRouter as Router } from 'react-router-dom'



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MantineProvider>
      <Router>
    <App />
    </Router>
    </MantineProvider>
  </React.StrictMode>
)
