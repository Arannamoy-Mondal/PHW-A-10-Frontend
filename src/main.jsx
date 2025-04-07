import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Root from './Root.jsx'
import Authprovider from './Authprovider.jsx'
import Error from './Error.jsx'
import Home from './Home.jsx'
import Login from './Login.jsx'
import Signup from './Signup.jsx'
const router=createBrowserRouter(
  [
    {
      path:"/",
      element: <Root></Root>,
      errorElement: <Error></Error>,
      children:
        [
          {
            path:"/",
            element: <Home></Home>
          },
          {
            path:"/login",
            element: <Login></Login>
          },
          {
            path:"/signup",
            element: <Signup></Signup>
          }
        ]
    }
  ]
)
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Authprovider>
    <RouterProvider router={router} />
    </Authprovider>
  </StrictMode>,
)
