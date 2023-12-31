import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Places from './components/Places.jsx'
import './index.css'
import AuthProvider from './AuthProvider';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom'
import Home from './components/Home.jsx'
import Modal from 'react-modal';

// Define the root element that should be hidden from screen readers
Modal.setAppElement('#root'); 


const router = createBrowserRouter(
  [
    { path: '/', Component: App },
    { path: '/places', Component: Places },
      
  ]
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router}/>
    </AuthProvider>
  </React.StrictMode>,
)
